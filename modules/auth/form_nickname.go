package auth

import (
	"github.com/alubame001/egame2015/modules/models"
	"github.com/alubame001/egame2015/modules/utils"
	"github.com/alubame001/egame2015/setting"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/validation"
	"github.com/beego/i18n"
	"time"
	//	"github.com/alubame001/egame2015/setting"
	//"strings"
)

// Change password form
type NicknameForm struct {
	NickName string       `valid:"Required;MinSize(5);MaxSize(30)"`
	User     *models.User `form:"-"`
	Locale   i18n.Locale  `form:"-"`
}

func (form *NicknameForm) Valid(v *validation.Validation) {
	beego.Trace("NicknameForm form.NickName:", form.NickName)
	beego.Trace("NicknameForm form.Locale:", form.Locale)
	/*
		if form.NickName != "ray2015" {
			v.SetError("NickName", "auth.repassword_not_match")
			return
		}
	*/
	if form.NickName == "" {
		beego.Trace("NicknameForm User NickName:", "empty")
		v.SetError("NickName", "valid.can_not_be_empty")
	}

	if form.User.UserName == form.NickName {
		v.SetError("NickName", "auth.nickname_euqal_username")
	}
	e1, e2, _ := NicknameCanRegistered(form.NickName, form.NickName)

	if !e1 {
		v.SetError("NickName", "auth.nickname_already_taken")
	}

	if !e2 {
		v.SetError("NickName", "auth.nickname_already_taken")
	}
	if NicknameEnabledToChange(form.User) == false {
		var errstr = form.Locale.Tr("valid.update_limit_minute", setting.UpdateFrequencyLimitMinute)
		v.SetError("NickName", errstr)
	}
	/*
		// Check if passwords of two times are same.
		if form.Password != form.PasswordRe {
			v.SetError("PasswordRe", "auth.repassword_not_match")
			return
		}

		if VerifyPassword(form.PasswordOld, form.User.Password) == false {
			v.SetError("PasswordOld", "auth.old_password_wrong")
		}
	*/
}

func (form *NicknameForm) Labels() map[string]string {

	return map[string]string{
		"NickName": "model.user_nickname",
	}

}

func (form *NicknameForm) Placeholders() map[string]string {

	return map[string]string{
		//	"NickName": form.Locale.Tr("valid.update_limit_minute", setting.UpdateFrequencyLimitMinute),
		"NickName": form.Locale.Tr("valid.min_length_is", 5),
	}

}

func (form *NicknameForm) SetFromUser(user *models.User) {
	utils.SetFormValues(user, form)
}

func (form *NicknameForm) SaveUserProfile(user *models.User) error {
	//修改nickname保存时，会自动新增一笔key

	if err := InsertKey(user); err != nil {
		beego.Info("err:", err)
	} else {
		beego.Info("InsertKey:", "Sucess")

	}

	user.LastNickNameUpdated = time.Now()
	return user.Update()
	/*
		changes := utils.FormChanges(user, form)

		if len(changes) > 0 {
			changes = append(changes, "LastNickNameUpdated")
			user.LastNickNameUpdated = time.Now()



			utils.SetFormValues(form, user)
			return user.Update(changes...)
		}
		return nil
	*/
}
