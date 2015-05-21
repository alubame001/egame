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

package auth

import (
	"github.com/astaxie/beego"

	"github.com/alubame001/egame2015/modules/auth"
	"github.com/alubame001/egame2015/routers/base"
)

// SettingsRouter serves user settings.
type SettingsRouter struct {
	base.BaseRouter
}

/* added by Ray */
func (this *SettingsRouter) Nickname() {
	this.TplNames = "settings/nickname/home.html"
	//this.Data["Profile"] = true
	//this.Data["ResetPassword"] = false
	// need login
	if this.CheckLoginRedirect() {
		return
	}

	form := auth.NicknameForm{Locale: this.Locale}
	form.SetFromUser(&this.User)
	this.SetFormSets(&form)
	this.Data["Form"] = form
	//beego.Trace("SettingsRouter.Nickname.SetFromUser:", form.User)
}

/*----------- */
/* added by Ray */
func (this *SettingsRouter) ActiveEmail() {
	this.TplNames = "settings/email/home.html"
	// need login
	if this.CheckLoginRedirect() {
		return
	}

	action := this.GetString("action")

	form := auth.EmailForm{Locale: this.Locale}
	form.SetFromUser(&this.User)
	this.SetFormSets(&form)
	this.Data["Form"] = form

	if auth.EnableToSendActiveEmail(&this.User) {
		if this.IsAjax() {
			switch action {
			case "send-verify-email":
				if this.User.IsActiveEmail {
					this.Data["json"] = false
				} else {

					auth.SendActiveMail(this.Locale, &this.User)
					auth.UpdateUserLastActiveEmailUpdated(&this.User)
					this.Data["json"] = true
				}

				this.ServeJson()
				return
			}
			return
		}
	}

	/*	if this.ValidFormSets(&form) {
			beego.Trace(" form ValidFormSets Sucess!")


				if err := form.SaveUserProfile(&this.User); err != nil {
					beego.Error("form: save-profile", err)
				}

			this.FlashRedirect("/settings/profile/email", 302, "ProfileSave")
			return
		} else {
			beego.Trace(" form ValidFormSets Not Sucess!")

			return
		}
	*/
}

// Profile implemented user profile settings page.
func (this *SettingsRouter) Profile() {
	this.TplNames = "settings/profile.html"
	this.Data["Profile"] = true
	this.Data["ResetPassword"] = false
	// need login
	if this.CheckLoginRedirect() {
		return
	}

	form := auth.ProfileForm{Locale: this.Locale}
	form.SetFromUser(&this.User)
	this.SetFormSets(&form)

	formPwd := auth.PasswordForm{}
	this.SetFormSets(&formPwd)
}

// ProfileSave implemented save user profile.

func (this *SettingsRouter) ProfileSave() {
	this.Data["Profile"] = true
	this.Data["ResetPassword"] = false
	this.TplNames = "settings/profile.html"

	if this.CheckLoginRedirect() {
		return
	}

	action := this.GetString("action")

	if this.IsAjax() {
		switch action {
		case "send-verify-email":
			if this.User.IsActiveEmail { /* modified by Ray*/
				this.Data["json"] = false
			} else {
				auth.SendActiveMail(this.Locale, &this.User)
				this.Data["json"] = true
			}

			this.ServeJson()
			return
		}
		return
	}

	profileForm := auth.ProfileForm{Locale: this.Locale}
	profileForm.SetFromUser(&this.User)
	profileForm.User = &this.User
	pwdForm := auth.PasswordForm{User: &this.User}

	this.Data["Form"] = profileForm

	switch action {
	case "save-profile":
		beego.Trace("Begin to ValidFormSets")
		beego.Trace("profileForm", &profileForm)
		if this.ValidFormSets(&profileForm) {
			beego.Trace(" profileForm ValidFormSets Sucess!")
			if err := profileForm.SaveUserProfile(&this.User); err != nil {
				beego.Error("ProfileSave: save-profile", err)
			}
			this.FlashRedirect("/settings/profile", 302, "ProfileSave")
			return
		} else {
			beego.Trace(" profileForm ValidFormSets Not Sucess!")

			return
		}

	case "change-password":
		if this.ValidFormSets(&pwdForm) {
			// verify success and save new password
			if err := auth.SaveNewPassword(&this.User, pwdForm.Password); err == nil {
				this.FlashRedirect("/settings/profile", 302, "PasswordSave")
				return
			} else {
				beego.Error("ProfileSave: change-password", err)
			}
		}

	default:
		this.Redirect("/settings/profile", 302)
		return
	}

	if action != "save-profile" {
		this.SetFormSets(&profileForm)
	}
	if action != "change-password" {
		this.SetFormSets(&pwdForm)
	}
}
func (this *SettingsRouter) RestPassword() {
	this.ProfileSave()
}

func (this *SettingsRouter) NicknameSave() {
	beego.Trace(" NicknameSave Begin")
	this.TplNames = "settings/nickname/home.html"

	if this.CheckLoginRedirect() {
		return
	}

	action := this.GetString("action")

	if this.IsAjax() {
		switch action {
		case "send-verify-email":
			if this.User.IsActiveEmail {
				this.Data["json"] = false
			} else {
				auth.SendActiveMail(this.Locale, &this.User)
				this.Data["json"] = true
			}

			this.ServeJson()
			return
		}
		return
	}

	nicknameForm := auth.NicknameForm{Locale: this.Locale}
	//beego.Trace("NicknameSave NicknameForm.SetFromUser:", &this.User)
	//nicknameForm.User =.SetFromUser(&this.User)
	nicknameForm.User = &this.User
	//beego.Trace("NicknameSave NicknameForm.SetFromUser:", nicknameForm.User)
	this.Data["Form"] = nicknameForm

	switch action {
	case "save-profile":
		beego.Trace("Begin to ValidFormSets")
		//beego.Trace("profileForm", &profileForm)
		if this.ValidFormSets(&nicknameForm) {
			beego.Trace(" nicknameForm ValidFormSets Sucess!")
			if err := nicknameForm.SaveUserProfile(&this.User); err != nil {
				beego.Error("ProfileSave: save-profile", err)
			}
			this.FlashRedirect("/settings/profile/nickname", 302, "ProfileSave")
			return
		} else {
			beego.Trace(" nicknameForm ValidFormSets Not Sucess!")

			return
		}

	default:
		this.Redirect("/settings/profile/nickname", 302)
		return
	}

	if action != "save-profile" {
		this.SetFormSets(&nicknameForm)
	}

}
