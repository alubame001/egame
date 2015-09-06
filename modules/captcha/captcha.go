// Copyright 2014 beego Author. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// an example for use captcha
//
// ```
// package controllers
//
// import (
// 	"github.com/astaxie/beego"
// 	"github.com/astaxie/beego/cache"
// 	"github.com/astaxie/beego/utils/captcha"
// )
//
// var cpt *captcha.Captcha
//
// func init() {
// 	// use beego cache system store the captcha data
// 	store := cache.NewMemoryCache()
// 	cpt = captcha.NewWithFilter("/captcha/", store)
// }
//
// type MainController struct {
// 	beego.Controller
// }
//
// func (this *MainController) Get() {
// 	this.TplNames = "index.tpl"
// }
//
// func (this *MainController) Post() {
// 	this.TplNames = "index.tpl"
//
// 	this.Data["Success"] = cpt.VerifyReq(this.Ctx.Request)
// }
// ```
//
// template usage
//
// ```
// {{.Success}}
// <form action="/" method="post">
// 	{{create_captcha}}
// 	<input name="captcha" type="text">
// </form>
// ```
package captcha

import (
	"fmt"
	"html/template"
	"net/http"
	"path"
	"strings"
	"strconv"

	"github.com/astaxie/beego"
	"github.com/astaxie/beego/cache"
	"github.com/astaxie/beego/context"
	"github.com/astaxie/beego/utils"

	//"bytes"
   // "encoding/binary"  	
    //"math/big"
    "image/png"	
    "image/jpeg"	
    "image"	
"image/draw"
    "os"

   // "path/filepath"

      "time"
   // "math/rand"
)

var (
	defaultChars = []byte{0, 1, 2, 3, 4, 5, 6, 7, 8, 9,10}
	originChars = []byte{0, 1, 2, 3, 4, 5, 6, 7, 8, 9}
)

const (
	// default captcha attributes
	challengeNums    = 3
	expiration       = 600
	fieldIdName      = "captcha_id"
	fieldCaptchaName = "captcha"
	cachePrefix      = "captcha_"
	defaultURLPrefix = "/captcha/"
)

// Captcha struct
type Captcha struct {
	// beego cache store
	store cache.Cache

	// url prefix for captcha image
	URLPrefix string

	// specify captcha id input field name
	FieldIdName string
	// specify captcha result input field name
	FieldCaptchaName string

	// captcha image width and height
	StdWidth  int
	StdHeight int

	// captcha chars nums
	ChallengeNums int

	// captcha expiration seconds
	Expiration int64

	// cache key prefix
	CachePrefix string
}

// generate key string
func (c *Captcha) key(id string) string {
	return c.CachePrefix + id
}

// generate rand chars with default chars
func (c *Captcha) genRandChars() []byte {
	/*
	r := rand.New(rand.NewSource(time.Now().UnixNano()))
	var result int 
	result = r.Intn(2)
	beego.Info("result:",result) 
*/ 
	 r := randInt(3, 6)
	
	//return utils.RandomCreateBytes(challengeNums, originChars...)
	return utils.RandomCreateBytes(r, originChars...)
}
/*
func (c *Captcha) CreateNumbers()  {
	for i := 100; i < 101; i++ {
		var chars = CreateBytes(i)

		img := NewImage(chars, c.StdWidth, c.StdHeight)	

	    beego.Info(chars)
	    m2 := img.Paletted
	 
	    //生成新图片new.jpg，并设置图片质量..
	     var filename = "./static_source/image/captcha/new.jpg" 
	    imgw, _ := os.Create(filename)
	    jpeg.Encode(imgw, m2, &jpeg.Options{100})
	}
	
}
*/

// beego filter handler for serve captcha image
func (c *Captcha) Handler(ctx *context.Context) {
	var chars []byte

	id := path.Base(ctx.Request.RequestURI)
	if i := strings.Index(id, "."); i != -1 {
		id = id[:i]
	}

	key := c.key(id)

	if v, ok := c.store.Get(key).([]byte); ok {
		chars = v
	} else {
		ctx.Output.SetStatus(404)
		ctx.WriteString("captcha not found")
		return
	}
	// reload captcha
	if len(ctx.Input.Query("reload")) > 0 {
		time.Sleep(1*time.Second);
		chars = c.genRandChars()
		if err := c.store.Put(key, chars, c.Expiration); err != nil {
			ctx.Output.SetStatus(500)
			ctx.WriteString("captcha reload error")
			beego.Error("Reload Create Captcha Error:", err)
			return
		}
	}	

	/*

	//chars = byte[10]
	var answerA []byte
	var answerB []byte
	//var answerC []byte
	answerA = c.genRandChars()
	answerB = c.genRandChars()
 
	yyy := big.NewInt(int64(len(answerA)))
    fmt.Println("yyy:", yyy)  
	a0 := big.NewInt(int64(answerA[0])) 
	b0 := big.NewInt(int64(answerB[0])) 
	a1 := big.NewInt(int64(answerA[1])) 
	b1 := big.NewInt(int64(answerB[1])) 
	a2 := big.NewInt(int64(answerA[2])) 
	b2 := big.NewInt(int64(answerB[2])) 

	y1 :=  big.NewInt(int64(100)) 
	y2 :=  big.NewInt(int64(10)) 

	z := new(big.Int)	
	a0.Mul(a0, y1)

	b0.Mul(b0, y1)
	a1.Mul(a1, y2)
	b1.Mul(b1, y2)
	z.Add(z,a0).Add(z,a1).Add(z,a2).Add(z,b0).Add(z,b1).Add(z,b2)
	//z.Add(z,a0).Add(z,a1)
	beego.Info("z:",z)
	beego.Info("a0:",a0)
	beego.Info("a1:",a1)
	beego.Info("a2:",a2)
	beego.Info("b0:",b0)
	beego.Info("b1:",b1)
	beego.Info("b2:",b2)

		


		fmt.Println("z:", z)  
		   
	answerC := []byte{0, 0, 0, 0, 0, 0}
	//answerC := [6]byte{}
	

	answerC[0] = answerA[0]
	answerC[1] = answerA[1]
	answerC[2] = answerA[2]
	answerC[3] = answerB[0]
	answerC[4] = answerB[1]
	answerC[5] = answerB[2]
	
   // test()
   */
	/*
	 //chars = chars+ []byte{10}
	//for i := 100; i < 101; i++ {
		var numbers = CreateBytes(100)

		img2 := NewImage(numbers, c.StdWidth, c.StdHeight)	

	    beego.Info(numbers)
	    m2 := img2.Paletted
	 
	    //生成新图片new.jpg，并设置图片质量..
	     var filename = "./static_source/image/captcha/new.jpg" 
	    imgw, _ := os.Create(filename)
	    jpeg.Encode(imgw, m2, &jpeg.Options{100})
	//}
	*/
	    var r = randInt(999,10000)
     
	img := NewImage(chars, c.StdWidth, c.StdHeight)	




		var filename = "./static_source/image/captcha/"+ToString(r)+".png" 
	    imgw, _ := os.Create(filename)
	    png.Encode(imgw, img)

	var newRBGAImage = new(RGBAImage)
	 newRBGAImage = Watermark(img)


	beego.Info("NewImage",chars,img)
		if _, err := newRBGAImage.RGBAWriteTo(ctx.ResponseWriter); err != nil {
		beego.Error("Write Captcha Image Error:", err)
	}
	/*
	if _, err := img.WriteTo(ctx.ResponseWriter); err != nil {
		beego.Error("Write Captcha Image Error:", err)
	}
	*/
}

// tempalte func for output html
func (c *Captcha) CreateCaptchaHtml() template.HTML {
	value, err := c.CreateCaptcha()
	if err != nil {
		beego.Error("Create Captcha Error:", err)
		return ""
	}

	// create html
	return template.HTML(fmt.Sprintf(`<input type="hidden" name="%s" value="%s">`+
		`<a class="captcha" href="javascript:">`+
		`<img onclick="this.src=('%s%s.png?reload='+(new Date()).getTime())" class="captcha-img" src="%s%s.png">`+
		`</a>`, c.FieldIdName, value, c.URLPrefix, value, c.URLPrefix, value))
}

// create a new captcha id
func (c *Captcha) CreateCaptcha() (string, error) {
	// generate captcha id
	id := string(utils.RandomCreateBytes(15))

	// get the captcha chars
	chars := c.genRandChars()

	// save to store
	if err := c.store.Put(c.key(id), chars, c.Expiration); err != nil {
		return "", err
	}

	return id, nil
}

// verify from a request
func (c *Captcha) VerifyReq(req *http.Request) bool {
	req.ParseForm()
	return c.Verify(req.Form.Get(c.FieldIdName), req.Form.Get(c.FieldCaptchaName))
}

// direct verify id and challenge string
func (c *Captcha) Verify(id string, challenge string) (success bool) {
	if len(challenge) == 0 || len(id) == 0 {
		return
	}

	var chars []byte

	key := c.key(id)

	if v, ok := c.store.Get(key).([]byte); ok {
		chars = v
	} else {
		return
	}

	defer func() {
		// finally remove it
		c.store.Delete(key)
	}()

	if len(chars) != len(challenge) {
		return
	}
	// verify challenge
	for i, c := range chars {
		if c != challenge[i]-48 {
			return
		}
	}

	return true
}

// create a new captcha.Captcha
func NewCaptcha(urlPrefix string, store cache.Cache) *Captcha {
	cpt := &Captcha{}
	cpt.store = store
	cpt.FieldIdName = fieldIdName
	cpt.FieldCaptchaName = fieldCaptchaName
	cpt.ChallengeNums = challengeNums
	cpt.Expiration = expiration
	cpt.CachePrefix = cachePrefix
	cpt.StdWidth = stdWidth
	cpt.StdHeight = stdHeight

	if len(urlPrefix) == 0 {
		urlPrefix = defaultURLPrefix
	}

	if urlPrefix[len(urlPrefix)-1] != '/' {
		urlPrefix += "/"
	}

	cpt.URLPrefix = urlPrefix

	return cpt
}

// create a new captcha.Captcha and auto AddFilter for serve captacha image
// and add a tempalte func for output html
func NewWithFilter(urlPrefix string, store cache.Cache) *Captcha {
	cpt := NewCaptcha(urlPrefix, store)

	// create filter for serve captcha image
	beego.InsertFilter(cpt.URLPrefix+"*", beego.BeforeRouter, cpt.Handler)

	// add to template func map
	beego.AddFuncMap("create_captcha", cpt.CreateCaptchaHtml)

	return cpt
}



func ToString(args ...interface{}) string {
	 result :=""
	 for _, arg := range args {
	 switch val := arg.(type) {
	 case int:
	 result += strconv.Itoa(val)
	 case string:
	 result += val
	}
	}
 return result
}


func Watermark(m *Image) *RGBAImage{
	//var path =GetCurrPath()
	
	//fmt.Println(path)   
	//fmt.Println(path+"sam.jpg")  
	x := randInt(0, 9)
	var filename = "./static_source/image/captcha/b"+ToString(x) + ".jpg" 
	imgb, err := os.Open(filename)
    if err != nil && os.IsNotExist(err) {

         fmt.Println(imgb, "文件不存在") //为什么打印nil 是这样的如果file不存在 返回f文件的指针是nil的 所以我们不能使用defer f.Close()会报错的

     }
	img, _ := jpeg.Decode(imgb)
	defer imgb.Close()

	/*
	filename = "./static_source/image/captcha/"+"text" + ".png" 
	wmb, err := os.Open(filename)
	if err != nil {
	fmt.Println(os.IsNotExist(err)) //true  证明文件已经存在
	fmt.Println(err)               //open widuu.go: no such file or directory
	}
*/
    //var wmb = m
  //  watermark, _ := png.Decode(wmb)
    watermark:= m
    //defer wmb.Close()
 
    //把水印写到右下角，并向0坐标各偏移10个像素
    var rx =randInt(20,30)
    var ry =randInt(10,200)
    offset := image.Pt(img.Bounds().Dx()-watermark.Bounds().Dx()+rx, img.Bounds().Dy()-watermark.Bounds().Dy()-ry)
    b := img.Bounds()
    //m2 := image.NewNRGBA(b)
    m2 := new(RGBAImage)
    m2.RGBA = image.NewRGBA(b)
 
    draw.Draw(m2, b, img, image.ZP, draw.Src)
    draw.Draw(m2, watermark.Bounds().Add(offset), watermark, image.ZP, draw.Over)
 
    //生成新图片new.jpg，并设置图片质量..
     filename = "./static_source/image/captcha/new.jpg" 
    imgw, _ := os.Create(filename)
    jpeg.Encode(imgw, m2, &jpeg.Options{100})
 
    defer imgw.Close()
   
    //fmt.Println("水印添加结束,请查看new.jpg图片...")
    var image = new(RGBAImage)
    image.RGBA=m2.RGBA 
     return image
}