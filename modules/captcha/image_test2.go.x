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

package captcha

import (

	"bytes"
	"image"
	"image/color"
	"image/png"
	"io"
	//"math"
	"fmt"
"image/draw"
    "image/jpeg"
	
    "os"
    "path/filepath"
     "os/exec"
     "strings"
     "time"
     "bufio"
    "log"

    "strconv"

)

const (
	fontWidth  = 11
	fontHeight = 18
	blackChar  = 1

	// Standard width and height of a captcha image.
	stdWidth  = 240
	stdHeight = 80
	// Maximum absolute skew factor of a single digit.
	maxSkew = 0.7
	// Number of background circles.
	circleCount = 50
)

var font = [][]byte{
	{ // 0
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1,
		1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1,
		0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
		0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0,
		0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0,
		0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0,
		0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0,
		1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1,
		0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	},
	{ // 1
		0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
		0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
		0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
		0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	},
	{ // 2
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	},
	{ // 3
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
		0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	},
	
	
	{ // 4
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0,
		0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0,
		0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0,
		0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0,
		0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0,
		0, 1, 0, 1, 0, 0, 0, 1, 0, 1, 0,
		0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
		0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
		0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
		0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	},	
	{ // 5
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
		0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0,
		0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
		0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
		0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
		0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	},
	{ // 6
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0,
		0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0,
		0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0,
		0, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	},
	{ // 7
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 0, 1, 1, 1,
		0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
		1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1,
		0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1,
		0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	},
	{ // 8
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0,
		0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0,
		0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0,
		0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 1, 0, 0, 0, 0, 0, 0, 1, 0,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 0,
		0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
	},
	{ // 9
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
		0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0,
		0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0,
		0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0,
		0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0,
		0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0,		
		0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0,
		0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
		0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
		0, 0, 1, 1, 0, 0, 1, 1, 0, 0, 1,
		1, 1, 1, 0, 0, 0, 1, 1, 1, 1, 1,
		1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,

	},
	{ // 10
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
	},	
}


var font2 = [][]byte{
	{ // 0
		0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0,
		0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0,
		1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1,
		0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
	},
	{ // 1
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	},
	{ // 2
		0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0,
		0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	},
	{ // 3
		0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
		1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
	},
	
	
	{ // 4
		0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0,
		0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
		0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0,
		0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0,
		0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0,
		1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
	},	
	{ // 5
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
	},
	{ // 6
		0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0,
		0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0,
		1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0,
		1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0,
		1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1,
		0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
	},
	{ // 7
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
		0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
	},
	{ // 8
		0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
		0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0,
		0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0,
		1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
	},
	{ // 9
		0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0,
		1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1,
		0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
		0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1,
		0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
	},
	{ // 10
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
	},	
}


var font3 = [][]byte{
	{ // 0
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
	},
	{ // 1
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 1, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	},
	{ // 2
		0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0,
		0, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
	},
	{ // 3
		0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
		1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
	},
	
	
	{ // 4
		0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0,
		0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 1, 1, 0, 0, 1, 1, 0, 0,
		0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0,
		0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0,
		0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0,
		1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
	},	
	{ // 5
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0,
	},
	{ // 6
		0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 0,
		0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0,
		0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0,
		1, 1, 0, 0, 1, 1, 1, 1, 0, 0, 0,
		1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0,
		1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0,
		1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1,
		0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
	},
	{ // 7
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0,
		0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
		0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0,
		0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0,
		0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0,
	},
	{ // 8
		0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0,
		0, 0, 1, 1, 1, 0, 1, 1, 1, 0, 0,
		0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0,
		1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0,
		0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
	},
	{ // 9
		0, 0, 0, 1, 1, 1, 1, 1, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0,
		0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0,
		1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1,
		0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1,
		0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1,
		0, 0, 0, 1, 1, 1, 1, 0, 0, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0,
		0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0,
		0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0,
		0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0,
	},
	{ // 10
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
		0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0,
	},	
}


type Image struct {
	//*image.Paletted
	*image.RGBA
	numWidth  int
	numHeight int
	dotSize   int
}
type Image2 struct {
	*image.Paletted
	numWidth  int
	numHeight int
	dotSize   int
}
var prng = &siprng{}

// randIntn returns a pseudorandom non-negative int in range [0, n).
func randIntn(n int) int {
	return prng.Intn(n)
}

// randInt returns a pseudorandom int in range [from, to].
func randInt(from, to int) int {
	return prng.Intn(to+1-from) + from
}

// randFloat returns a pseudorandom float64 in range [from, to].
func randFloat(from, to float64) float64 {
	return (to-from)*prng.Float64() + from
}

func randomPalette() color.Palette {
	p := make([]color.Color, circleCount+1)
	// Transparent color.
	p[0] = color.RGBA{0xFF, 0xFF, 0xFF, 0x00}
	// Primary color.
	prim := color.RGBA{
		uint8(randIntn(129)),
		uint8(randIntn(129)),
		uint8(randIntn(129)),
		0xFF,
	}
	p[1] = prim
	// Circle colors.
	for i := 2; i <= circleCount; i++ {
		p[i] = randomBrightness(prim, 255)
	}
	return p
}
/*获取当前文件执行的路径*/
func GetCurrPath() string {
    file, _ := exec.LookPath(os.Args[0])
    path, _ := filepath.Abs(file)
    splitstring := strings.Split(path, "\\")
    size := len(splitstring)
    splitstring = strings.Split(path, splitstring[size-1])
    ret := strings.Replace(splitstring[0], "\\", "/", size-1)
    return ret
}

func WriteLog() {
	t := time.Now()
    filepath := "./static_source/image/captcha/log_" + strings.Replace(t.String()[:19], ":", "_", 3) + ".txt"
    file, err := os.OpenFile(filepath, os.O_CREATE, 0666)
    if err != nil {
        log.Fatal("create log file failed!")
    }
    fmt.Println(filepath)
    defer file.Close()
    wFile := bufio.NewWriter(file)
    //获取当前程序执行的绝对路径
    wFile.WriteString(GetCurrPath()) 
    wFile.Flush()
}
func WriteImage(){
	//var path =GetCurrPath()
	
	//fmt.Println(path)   
	//fmt.Println(path+"sam.jpg")  
	var filename = "./static_source/image/captcha/"+"sam" + ".jpg" 
	imgb, err := os.Open(filename)
    if err != nil && os.IsNotExist(err) {

         fmt.Println(imgb, "文件不存在") //为什么打印nil 是这样的如果file不存在 返回f文件的指针是nil的 所以我们不能使用defer f.Close()会报错的

     }

	img, _ := jpeg.Decode(imgb)
	defer imgb.Close()
	filename = "./static_source/image/captcha/"+"text" + ".png" 
	wmb, err := os.Open(filename)
	if err != nil {

	fmt.Println(os.IsNotExist(err)) //true  证明文件已经存在

	fmt.Println(err)                //open widuu.go: no such file or directory

	}
    watermark, _ := png.Decode(wmb)
    defer wmb.Close()
 
    //把水印写到右下角，并向0坐标各偏移10个像素
    offset := image.Pt(img.Bounds().Dx()-watermark.Bounds().Dx()-10, img.Bounds().Dy()-watermark.Bounds().Dy()-10)
    b := img.Bounds()
    m2 := image.NewNRGBA(b)
 
    draw.Draw(m2, b, img, image.ZP, draw.Src)
    draw.Draw(m2, watermark.Bounds().Add(offset), watermark, image.ZP, draw.Over)
 
    //生成新图片new.jpg，并设置图片质量..
     filename = "./static_source/image/captcha/new.jpg" 
    imgw, _ := os.Create(filename)
    jpeg.Encode(imgw, m2, &jpeg.Options{100})
 
    defer imgw.Close()
 
    fmt.Println("水印添加结束,请查看new.jpg图片...")
}

func Watermark() *Image{
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
	filename = "./static_source/image/captcha/"+"text" + ".png" 
	wmb, err := os.Open(filename)
	if err != nil {

	fmt.Println(os.IsNotExist(err)) //true  证明文件已经存在

	fmt.Println(err)                //open widuu.go: no such file or directory

	}
    watermark, _ := png.Decode(wmb)
    defer wmb.Close()
 
    //把水印写到右下角，并向0坐标各偏移10个像素
    offset := image.Pt(img.Bounds().Dx()-watermark.Bounds().Dx()-10, img.Bounds().Dy()-watermark.Bounds().Dy()-10)
    b := img.Bounds()
    //m2 := image.NewNRGBA(b)
    m2 := new(Image)
    m2.RGBA = image.NewRGBA(b)
 
    draw.Draw(m2, b, img, image.ZP, draw.Src)
    draw.Draw(m2, watermark.Bounds().Add(offset), watermark, image.ZP, draw.Over)
 
    //生成新图片new.jpg，并设置图片质量..
     filename = "./static_source/image/captcha/new.jpg" 
    imgw, _ := os.Create(filename)
    jpeg.Encode(imgw, m2, &jpeg.Options{100})
 
    defer imgw.Close()
   
    fmt.Println("水印添加结束,请查看new.jpg图片...")
     return m2
}
// NewImage returns a new captcha image of the given width and height with the
// given digits, where each digit must be in range 0-9.
func NewImage(digits []byte, width, height int) *Image {
	WriteLog()
	//return Watermark()

	m := new(Image2)
	m.Paletted = image.NewPaletted(image.Rect(0, 0, width, height), randomPalette())
	m.calculateSizes(width, height, len(digits))
	// Randomly position captcha inside the image.
	maxx := width - (m.numWidth+m.dotSize)*len(digits) - m.dotSize
	maxy := height - m.numHeight - m.dotSize*2
	var border int
	if width > height {
		border = height / 5
	} else {
		border = width / 5
	}
	x := randInt(border, maxx-border)
	y := randInt(border, maxy-border)
	// Draw digits.
	var result int 
	fmt.Println(digits)
	for _, n := range digits {

   	
   		result = randIntn(100)
   		
   		if result <50{
			m.drawDigit(font[n], x, y)

		} else  {
			m.drawDigit(font2[n], x, y)
		}
		

		
		x += m.numWidth + m.dotSize
	}

	// Draw strike-through line.
	m.strikeThrough()
	// Apply wave distortion.
	m.distort(randFloat(15, 10), randFloat(100, 200))
	// Fill image with random circles.
	m.fillWithCircles(circleCount, m.dotSize)
	return m
	
}

// encodedPNG encodes an image to PNG and returns
// the result as a byte slice.
func (m *Image) encodedPNG() []byte {
	var buf bytes.Buffer
	if err := png.Encode(&buf, m.RGBA); err != nil {
		panic(err.Error())
	}
	return buf.Bytes()
}

// WriteTo writes captcha image in PNG format into the given writer.
func (m *Image) WriteTo(w io.Writer) (int64, error) {

	n, err := w.Write(m.encodedPNG())
	return int64(n), err
}

func (m *Image) calculateSizes(width, height, ncount int) {
	// Goal: fit all digits inside the image.
	var border int
	if width > height {
		border = height / 4
	} else {
		border = width / 4
	}
	// Convert everything to floats for calculations.
	w := float64(width - border*2)
	h := float64(height - border*2)
	// fw takes into account 1-dot spacing between digits.
	fw := float64(fontWidth + 1)
	fh := float64(fontHeight)
	nc := float64(ncount)
	// Calculate the width of a single digit taking into account only the
	// width of the image.
	nw := w / nc
	// Calculate the height of a digit from this width.
	nh := nw * fh / fw
	// Digit too high?
	if nh > h {
		// Fit digits based on height.
		nh = h
		nw = fw / fh * nh
	}
	// Calculate dot size.
	m.dotSize = int(nh / fh)
	// Save everything, making the actual width smaller by 1 dot to account
	// for spacing between digits.
	m.numWidth = int(nw) - m.dotSize
	m.numHeight = int(nh)
}

func (m *Image) drawHorizLine(fromX, toX, y int, colorIdx uint8) {
	
	for x := fromX; x <= toX; x++ {
		m.SetColorIndex(x, y, colorIdx)
	}
	
}

func (m *Image) drawCircle(x, y, radius int, colorIdx uint8) {
	
	f := 1 - radius
	dfx := 1
	dfy := -2 * radius
	xo := 0
	yo := radius

	m.SetColorIndex(x, y+radius, colorIdx)
	m.SetColorIndex(x, y-radius, colorIdx)
	m.drawHorizLine(x-radius, x+radius, y, colorIdx)

	for xo < yo {
		if f >= 0 {
			yo--
			dfy += 2
			f += dfy
		}
		xo++
		dfx += 2
		f += dfx
		m.drawHorizLine(x-xo, x+xo, y+yo, colorIdx)
		m.drawHorizLine(x-xo, x+xo, y-yo, colorIdx)
		m.drawHorizLine(x-yo, x+yo, y+xo, colorIdx)
		m.drawHorizLine(x-yo, x+yo, y-xo, colorIdx)
	}
	
}

func (m *Image) fillWithCircles(n, maxradius int) {
	
	maxx := m.Bounds().Max.X
	maxy := m.Bounds().Max.Y
	for i := 0; i < n; i++ {
		colorIdx := uint8(randInt(1, circleCount-1))
		r := randInt(1, maxradius)
		m.drawCircle(randInt(r, maxx-r), randInt(r, maxy-r), r, colorIdx)
	}
	
}

func (m *Image) strikeThrough() {
	
	maxx := m.Bounds().Max.X
	maxy := m.Bounds().Max.Y
	y := randInt(maxy/3, maxy-maxy/3)
	amplitude := randFloat(5, 20)
	period := randFloat(80, 180)
	dx := 2.0 * math.Pi / period
	yx := 4.0 * math.Pi / period
	for x := 0; x < maxx; x++ {
		xo := amplitude * math.Cos(float64(y)*dx)
		yo := amplitude * math.Sin(float64(x)*dx)
		for yn := 0; yn < m.dotSize; yn++ {
			r := randInt(0, m.dotSize)
			m.drawCircle(x+int(xo), y+int(yo)+(yn*m.dotSize), r/4, 1)
		}	
	}
	for x := 0; x < maxx; x++ {
		xo := amplitude * math.Cos(float64(y)*yx)
		yo := amplitude * math.Sin(float64(x)*yx)
		for yn := 0; yn < m.dotSize; yn++ {
			r := randInt(0, m.dotSize)
			m.drawCircle(x+int(xo), y+int(yo)+(yn*m.dotSize), r/4, 1)
		}	
	}	
	
}

func (m *Image) drawDigit(digit []byte, x, y int) {
	
	skf := randFloat(-maxSkew, maxSkew)
	xs := float64(x)
	r := m.dotSize / 2
	y += randInt(-r, r)
	for yo := 0; yo < fontHeight; yo++ {
		for xo := 0; xo < fontWidth; xo++ {
			if digit[yo*fontWidth+xo] != blackChar {
				continue
			}
			m.drawCircle(x+xo*m.dotSize, y+yo*m.dotSize, r, 1)
		}
		xs += skf
		x = int(xs)
	}
	
}

func (m *Image) distort(amplude float64, period float64) {
	
	w := m.Bounds().Max.X
	h := m.Bounds().Max.Y

	oldm := m.Paletted
	newm := image.NewPaletted(image.Rect(0, 0, w, h), oldm.Palette)

	dx := 2.0 * math.Pi / period
	for x := 0; x < w; x++ {
		for y := 0; y < h; y++ {
			xo := amplude * math.Sin(float64(y)*dx)
			yo := amplude * math.Cos(float64(x)*dx)
			newm.SetColorIndex(x, y, oldm.ColorIndexAt(x+int(xo), y+int(yo)))
		}
	}
	m.Paletted = newm
	
}

func randomBrightness(c color.RGBA, max uint8) color.RGBA {
	
	minc := min3(c.R, c.G, c.B)
	maxc := max3(c.R, c.G, c.B)
	if maxc > max {
		return c
	}
	n := randIntn(int(max-maxc)) - int(minc)
	return color.RGBA{
		uint8(int(c.R) + n),
		uint8(int(c.G) + n),
		uint8(int(c.B) + n),
		uint8(c.A),
	}
	
}

func min3(x, y, z uint8) (m uint8) {
	m = x
	if y < m {
		m = y
	}
	if z < m {
		m = z
	}
	return
}

func max3(x, y, z uint8) (m uint8) {
	m = x
	if y > m {
		m = y
	}
	if z > m {
		m = z
	}
	return
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