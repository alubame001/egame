package auth

import (
	"github.com/alubame001/egame2015/modules/models"
	"github.com/alubame001/egame2015/modules/utils"
	"github.com/astaxie/beego"
	"github.com/astaxie/beego/validation"
	"github.com/beego/i18n"

	//"time"
	"github.com/alubame001/egame2015/setting"
	//"strings"
)

// Change password form
type EmailForm struct {
	Email  string       `valid:"Required;MinSize(5);MaxSize(30)"`
	User   *models.User `form:"-"`
	Locale i18n.Locale  `form:"-"`
}

func (form *EmailForm) Valid(v *validation.Validation) {
	/*
		beego.Trace("NicknameForm form.NickName:", form.NickName)
		beego.Trace("NicknameForm form.Locale:", form.Locale)
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

	*/
	beego.Trace("EmailForm valid:", form.Email)
	if EnableToSendActiveEmail(form.User) {
		var errstr = form.Locale.Tr("valid.update_limit_minute", setting.UpdateFrequencyLimitMinute)
		v.SetError("Email", errstr)
	}

}

func (form *EmailForm) Labels() map[string]string {

	return map[string]string{
		"Email": "model.email",
	}

}

func (form *EmailForm) Placeholders() map[string]string {

	return map[string]string{
		//	"NickName": form.Locale.Tr("valid.update_limit_minute", setting.UpdateFrequencyLimitMinute),
		"Email": form.Locale.Tr("valid.min_length_is", 5),
	}

}

func (form *EmailForm) SetFromUser(user *models.User) {
	utils.SetFormValues(user, form)
}

func (form *EmailForm) SaveUserProfile(user *models.User) error {

	changes := utils.FormChanges(user, form)

	if len(changes) > 0 {
		//changes = append(changes, "LastNickNameUpdated")
		//user.LastNickNameUpdated = time.Now()

		/*
			// if email changed then need re-active
			if user.Email != form.Email {
				user.IsActiveEmail = false
				changes = append(changes, "IsActive")
			}
		*/

		utils.SetFormValues(form, user)
		return user.Update(changes...)
	}
	return nil
}
