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
    //"image/png"	
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
	challengeNums    = 6
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
	// r := randInt(3, 6)
	
	return utils.RandomCreateBytes(challengeNums, originChars...)
	//return utils.RandomCreateBytes(r, originChars...)
}

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

	
	 
     
	img := NewImage(chars, c.StdWidth, c.StdHeight)	

	var newRBGAImage = new(RGBAImage)
	 newRBGAImage = Watermark(c,img)

	 //CutImage(c)


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


func Watermark(c *Captcha,m *Image) *RGBAImage{
		
	watermark:= m

	var rx =randInt(100,400)
	var ry =randInt(100,300)

	b := watermark.Bounds()
	fmt.Println(b)

	m2 := CutImage(c,rx,ry)
	offset := image.Pt(rx,ry)
	fmt.Println("offset",offset)
	fmt.Println("b",b)
	b.Add(offset)
	fmt.Println("b",b)
	// draw.Draw(m2, b, img, image.ZP, draw.Src)//画 底图
	draw.Draw(m2, b.Add(offset), watermark, image.ZP, draw.Over) //画 验证码


	var image = new(RGBAImage)
	image.RGBA=m2.RGBA 
	return image
}




func CutImage(c *Captcha ,rx int ,ry int) *RGBAImage{
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
    //var rx =randInt(20,50)
    //var ry =randInt(20,50)    
    //var rx = x
    //var ry =y
	b := img.Bounds()
    m3 := image.NewRGBA(image.Rect(rx, ry, c.StdWidth+rx, c.StdHeight+ry))
    draw.Draw(m3, b, img, image.ZP, draw.Src) 
    /*
     filename = "./static_source/image/captcha/new.jpg" 
    imgw, _ := os.Create(filename)
    jpeg.Encode(imgw, m3, &jpeg.Options{100})     
    defer imgw.Close()
*/
 	var image = new(RGBAImage)
    image.RGBA=m3 
    return image


}
