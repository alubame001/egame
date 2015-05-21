// Copyright 2013 wetalk authors
//
// Licensed under the Apache License, Version 2.0 (the "License"): you may
// not use this file except in compliance with the License. You may obtain
// a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
// WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
// License for the specific language governing permissions and limitations
// under the License.

package utils

import (
	"bytes"
	"crypto/hmac"
	"crypto/md5"
	"crypto/rand"
	"crypto/sha1"
	"crypto/sha256"
	"crypto/sha512"
	"encoding/hex"
	"fmt"
	"hash"
	"math"

	"math/big"
	"net/url"
	"reflect"
	"strconv"
	"time"

	"github.com/astaxie/beego"

	"github.com/alubame001/egame/setting"
	"strings"
)

func NumberEncode(number string, alphabet []byte) string {
	token := make([]byte, 0, 12)
	x, ok := new(big.Int).SetString(number, 10)
	if !ok {
		return ""
	}
	y := big.NewInt(int64(len(alphabet)))
	m := new(big.Int)
	for x.Sign() > 0 {
		x, m = x.DivMod(x, y, m)
		token = append(token, alphabet[int(m.Int64())])
	}
	return string(token)
}

func NumberDecode(token string, alphabet []byte) string {
	x := new(big.Int)
	y := big.NewInt(int64(len(alphabet)))
	z := new(big.Int)
	for i := len(token) - 1; i >= 0; i-- {
		v := bytes.IndexByte(alphabet, token[i])
		z.SetInt64(int64(v))
		x.Mul(x, y)
		x.Add(x, z)
	}
	return x.String()
}

// Random generate string
func GetRandomString(n int) string {
	const alphanum = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
	var bytes = make([]byte, n)
	rand.Read(bytes)
	for i, b := range bytes {
		bytes[i] = alphanum[b%byte(len(alphanum))]
	}
	return string(bytes)
}

// http://code.google.com/p/go/source/browse/pbkdf2/pbkdf2.go?repo=crypto
func PBKDF2(password, salt []byte, iter, keyLen int, h func() hash.Hash) []byte {
	prf := hmac.New(h, password)
	hashLen := prf.Size()
	numBlocks := (keyLen + hashLen - 1) / hashLen

	var buf [4]byte
	dk := make([]byte, 0, numBlocks*hashLen)
	U := make([]byte, hashLen)
	for block := 1; block <= numBlocks; block++ {
		// N.B.: || means concatenation, ^ means XOR
		// for each block T_i = U_1 ^ U_2 ^ ... ^ U_iter
		// U_1 = PRF(password, salt || uint(i))
		prf.Reset()
		prf.Write(salt)
		buf[0] = byte(block >> 24)
		buf[1] = byte(block >> 16)
		buf[2] = byte(block >> 8)
		buf[3] = byte(block)
		prf.Write(buf[:4])
		dk = prf.Sum(dk)
		T := dk[len(dk)-hashLen:]
		copy(U, T)

		// U_n = PRF(password, U_(n-1))
		for n := 2; n <= iter; n++ {
			prf.Reset()
			prf.Write(U)
			U = U[:0]
			U = prf.Sum(U)
			for x := range U {
				T[x] ^= U[x]
			}
		}
	}
	return dk[:keyLen]
}

// verify time limit code
func VerifyTimeLimitCode(data string, minutes int, code string) bool {
	if len(code) <= 18 {
		return false
	}

	// split code
	start := code[:12]
	lives := code[12:18]
	if d, err := StrTo(lives).Int(); err == nil {
		minutes = d
	}

	// right active code
	retCode := CreateTimeLimitCode(data, minutes, start)
	if retCode == code && minutes > 0 {
		// check time is expired or not
		before, _ := beego.DateParse(start, "YmdHi")
		now := time.Now()
		if before.Add(time.Minute*time.Duration(minutes)).Unix() > now.Unix() {
			return true
		}
	}
	return false
}

const TimeLimitCodeLength = 12 + 6 + 40

// create a time limit code
// code format: 12 length date time string + 6 minutes string + 40 sha1 encoded string
func CreateTimeLimitCode(data string, minutes int, startInf interface{}) string {
	format := "YmdHi"

	var start, end time.Time
	var startStr, endStr string

	if startInf == nil {
		// Use now time create code
		start = time.Now()
		startStr = beego.Date(start, format)
	} else {
		// use start string create code
		startStr = startInf.(string)
		start, _ = beego.DateParse(startStr, format)
		startStr = beego.Date(start, format)
	}

	end = start.Add(time.Minute * time.Duration(minutes))
	endStr = beego.Date(end, format)

	// create sha1 encode string
	sh := sha1.New()
	sh.Write([]byte(data + setting.SecretKey + startStr + endStr + ToStr(minutes)))
	encoded := hex.EncodeToString(sh.Sum(nil))

	code := fmt.Sprintf("%s%06d%s", startStr, minutes, encoded)
	return code
}

// Encode string to md5 hex value
func EncodeMd5(str string) string {
	m := md5.New()
	m.Write([]byte(str))
	return hex.EncodeToString(m.Sum(nil))
}

// use pbkdf2 encode password
func EncodePassword(rawPwd string, salt string) string {
	pwd := PBKDF2([]byte(rawPwd), []byte(salt), 10000, 50, sha256.New)
	return hex.EncodeToString(pwd)
}

func EncodeHmac(secret, value string, params ...func() hash.Hash) string {
	var h func() hash.Hash
	if len(params) > 0 {
		h = params[0]
	} else {
		h = sha1.New
	}

	hm := hmac.New(h, []byte(secret))
	hm.Write([]byte(value))

	return hex.EncodeToString(hm.Sum(nil))
}

func TimesReachedTest(key string, times int) (int, bool) {
	var retries int
	if v := setting.Cache.Get(key); v != nil {
		if d, ok := v.(int); ok {
			if d > times {
				return d, true
			}
			retries = d
		}
	}
	return retries, false
}

func TimesReachedSet(key string, times int, reloadMinutes int) {
	setting.Cache.Put(key, times+1, int64(reloadMinutes)*60)
}

// convert string to specify type

type StrTo string

func (f *StrTo) Set(v string) {
	if v != "" {
		*f = StrTo(v)
	} else {
		f.Clear()
	}
}

func (f *StrTo) Clear() {
	*f = StrTo(0x1E)
}

func (f StrTo) Exist() bool {
	return string(f) != string(0x1E)
}

func (f StrTo) Bool() (bool, error) {
	if f == "on" {
		return true, nil
	}
	return strconv.ParseBool(f.String())
}

func (f StrTo) Float32() (float32, error) {
	v, err := strconv.ParseFloat(f.String(), 32)
	return float32(v), err
}

func (f StrTo) Float64() (float64, error) {
	return strconv.ParseFloat(f.String(), 64)
}

func (f StrTo) Int() (int, error) {
	v, err := strconv.ParseInt(f.String(), 10, 32)
	return int(v), err
}

func (f StrTo) Int8() (int8, error) {
	v, err := strconv.ParseInt(f.String(), 10, 8)
	return int8(v), err
}

func (f StrTo) Int16() (int16, error) {
	v, err := strconv.ParseInt(f.String(), 10, 16)
	return int16(v), err
}

func (f StrTo) Int32() (int32, error) {
	v, err := strconv.ParseInt(f.String(), 10, 32)
	return int32(v), err
}

func (f StrTo) Int64() (int64, error) {
	v, err := strconv.ParseInt(f.String(), 10, 64)
	return int64(v), err
}

func (f StrTo) Uint() (uint, error) {
	v, err := strconv.ParseUint(f.String(), 10, 32)
	return uint(v), err
}

func (f StrTo) Uint8() (uint8, error) {
	v, err := strconv.ParseUint(f.String(), 10, 8)
	return uint8(v), err
}

func (f StrTo) Uint16() (uint16, error) {
	v, err := strconv.ParseUint(f.String(), 10, 16)
	return uint16(v), err
}

func (f StrTo) Uint32() (uint32, error) {
	v, err := strconv.ParseUint(f.String(), 10, 32)
	return uint32(v), err
}

func (f StrTo) Uint64() (uint64, error) {
	v, err := strconv.ParseUint(f.String(), 10, 64)
	return uint64(v), err
}

func (f StrTo) String() string {
	if f.Exist() {
		return string(f)
	}
	return ""
}

// convert any type to string
func ToStr(value interface{}, args ...int) (s string) {
	switch v := value.(type) {
	case bool:
		s = strconv.FormatBool(v)
	case float32:
		s = strconv.FormatFloat(float64(v), 'f', argInt(args).Get(0, -1), argInt(args).Get(1, 32))
	case float64:
		s = strconv.FormatFloat(v, 'f', argInt(args).Get(0, -1), argInt(args).Get(1, 64))
	case int:
		s = strconv.FormatInt(int64(v), argInt(args).Get(0, 10))
	case int8:
		s = strconv.FormatInt(int64(v), argInt(args).Get(0, 10))
	case int16:
		s = strconv.FormatInt(int64(v), argInt(args).Get(0, 10))
	case int32:
		s = strconv.FormatInt(int64(v), argInt(args).Get(0, 10))
	case int64:
		s = strconv.FormatInt(v, argInt(args).Get(0, 10))
	case uint:
		s = strconv.FormatUint(uint64(v), argInt(args).Get(0, 10))
	case uint8:
		s = strconv.FormatUint(uint64(v), argInt(args).Get(0, 10))
	case uint16:
		s = strconv.FormatUint(uint64(v), argInt(args).Get(0, 10))
	case uint32:
		s = strconv.FormatUint(uint64(v), argInt(args).Get(0, 10))
	case uint64:
		s = strconv.FormatUint(v, argInt(args).Get(0, 10))
	case string:
		s = v
	case []byte:
		s = string(v)
	default:
		s = fmt.Sprintf("%v", v)
	}
	return s
}

// convert any numeric value to int64
func ToInt64(value interface{}) (d int64, err error) {
	val := reflect.ValueOf(value)
	switch value.(type) {
	case int, int8, int16, int32, int64:
		d = val.Int()
	case uint, uint8, uint16, uint32, uint64:
		d = int64(val.Uint())
	default:
		err = fmt.Errorf("ToInt64 need numeric not `%T`", value)
	}
	return
}

type argString []string

func (a argString) Get(i int, args ...string) (r string) {
	if i >= 0 && i < len(a) {
		r = a[i]
	} else if len(args) > 0 {
		r = args[0]
	}
	return
}

type argInt []int

func (a argInt) Get(i int, args ...int) (r int) {
	if i >= 0 && i < len(a) {
		r = a[i]
	}
	if len(args) > 0 {
		r = args[0]
	}
	return
}

type argAny []interface{}

func (a argAny) Get(i int, args ...interface{}) (r interface{}) {
	if i >= 0 && i < len(a) {
		r = a[i]
	}
	if len(args) > 0 {
		r = args[0]
	}
	return
}

func IsMatchHost(uri string) bool {
	if len(uri) == 0 {
		return false
	}

	u, err := url.ParseRequestURI(uri)
	if err != nil {
		return false
	}

	if u.Host != setting.AppHost {
		return false
	}

	return true
}
func SubString(str string, begin, length int) (substr string) {
	// 将字符串的转换成[]rune
	rs := []rune(str)
	lth := len(rs)

	// 简单的越界判断
	if begin < 0 {
		begin = 0
	}
	if begin >= lth {
		begin = lth
	}
	end := begin + length
	if end > lth {
		end = lth
	}

	// 返回子串
	return string(rs[begin:end])
}

func DecodeSeed(serverseed string, client string, nonce string) string {
	//pwd := PBKDF2([]byte(serverseed), []byte(client), 10000, 50, sha512.New)

	var data = []byte(serverseed + ":" + client + ":" + nonce)

	hash := sha512.New()
	hash.Write(data)
	md := hash.Sum(nil)
	mdStr := hex.EncodeToString(md)

	return (mdStr)

}

func EncodeSeed(serverseed string, client string, nonce string) string {
	//pwd := PBKDF2([]byte(serverseed), []byte(client), 10000, 50, sha512.New)
	h := hmac.New(sha512.New, []byte(serverseed))
	var data = []byte(client + ":" + nonce)
	h.Write(data)
	md := h.Sum(nil)
	mdStr := hex.EncodeToString(md)
	return (mdStr)
}

func EncodeSha256(soruce string) string {
	//pwd := PBKDF2([]byte(serverseed), []byte(client), 10000, 50, sha512.New)
	h := sha256.New()
	var data = []byte(soruce)
	h.Write(data)
	md := h.Sum(nil)
	mdStr := hex.EncodeToString(md)
	return (mdStr)
}

func RemoveAlpha(shash string) (string, error) {
	var alphas = []string{"a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"}
	replacer := shash
	for _, value := range alphas {
		replacer = strings.Replace(replacer, string(value), "", -1)
	}
	return replacer, nil

}

/*待完成，少个while loop 直到取值正确，目前不用*/
func GetLuckyFromString(shash string, begin, length int) (string, error) {
	if shash, err := RemoveAlpha(shash); err == nil {
		var result = ""
		//for i, r := range shash {}
		result = SubString(shash, begin, length)
		return result, nil
	} else {
		return "", err
	}
}

//←以jd的计算方式
func GetLuckyFromShash(shash string) (string, error) {
	var i = 0
	var result = ""
	beego.Info("GetLuckyFromShash", shash)
	for {

		if i == 25 {
			var l3 = SubString(shash, 125, 3)
			i, err := strconv.ParseInt(l3, 16, 32)
			if err != nil {

				panic(err)
				return result, err
			}
			beego.Info("l3", i)
			result = ToStr(i)
			break
		} else {

			var f5 = SubString(shash, 5*i, 5)
			//beego.Info(f5)
			f5p, err := strconv.ParseInt(f5, 16, 32)
			if err != nil {

				panic(err)
				return result, err
			}
			if f5p < 1000000 {
				//var roll = f5p / 10000

				result = ToStr(f5p)
				if f5p < 100000 {
					result = "0" + result
				}
				if f5p < 10000 {
					result = "0" + result
				}
				beego.Info("result", f5p)

				break
			}
			i += 1

		}

	}

	return result, nil
}

func Round(f float64, n int) float64 {
	pow10_n := math.Pow10(n)
	return math.Trunc((f+0.5/pow10_n)*pow10_n) / pow10_n
}

func CalcProfit(_rate, _stake, _odd float64) (float64, error) {
	rate := new(big.Rat)
	stake := new(big.Rat)
	profit := new(big.Rat)
	//result := new(big.Rat)
	odd := new(big.Rat)
	odd_org := new(big.Rat)
	rate.SetFloat64(_rate)
	stake.SetFloat64(_stake)
	odd.SetFloat64(_odd)
	odd_org.SetFloat64(1)

	odd.Sub(odd, odd_org)
	profit.Mul(stake, odd)
	profit.Mul(profit, rate)
	//params.Pick[j].Profit, _ = strconv.ParseFloat(profit.FloatString(8), 64)

	return strconv.ParseFloat(profit.FloatString(8), 64)
}

func Float64Add(_a, _b float64, position int) (float64, error) {
	a := new(big.Rat)
	b := new(big.Rat)
	result := new(big.Rat)

	a.SetFloat64(_a)
	b.SetFloat64(_b)
	result.SetFloat64(0)

	a.Add(a, b)
	//params.Pick[j].Profit, _ = strconv.ParseFloat(profit.FloatString(8), 64)

	return strconv.ParseFloat(a.FloatString(position), 64)
}

func Float64Sub(_a, _b float64, position int) (float64, error) {
	a := new(big.Rat)
	b := new(big.Rat)
	result := new(big.Rat)

	a.SetFloat64(_a)
	b.SetFloat64(_b)
	result.SetFloat64(0)

	a.Sub(a, b)
	//params.Pick[j].Profit, _ = strconv.ParseFloat(profit.FloatString(8), 64)

	return strconv.ParseFloat(a.FloatString(position), 64)
}

/*
i = 0;
        roll = -1;
        while (roll == -1) { // Non-reference implementation derived from the 'Fair?' description.
            if (i == 25) {
                l3 = hash.substring(125, 128);
                l3p = l3.parseInt(l3, 16);
                println('last 3: ' + l3 + ' as int: ' + l3p); // kept on because it's cool to get this far
                roll = l3p / 10000;
            } else {
                f5 = hash.substring(5 * i, 5 + 5 * i);
                f5p = parseInt(f5, 16);
                //println(f5 + ' as int: ' + f5p);
                if (f5p < 1000000) {
                    roll = f5p / 10000;
                }
                i++;
            }
        }
        println(j + ': ' + roll);

*/
