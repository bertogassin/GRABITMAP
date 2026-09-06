/* eslint-disable */
import { getLocale, experimentalStaticLocale } from "../runtime.js"

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Chat_All_ReadInputs */
/** @typedef {{}} Chat_CopyInputs */
/** @typedef {{}} Chat_DeleteInputs */
/** @typedef {{}} Chat_DialogsInputs */
/** @typedef {{}} Chat_EditInputs */
/** @typedef {{}} Chat_EmptyInputs */
/** @typedef {{}} Chat_ForwardInputs */
/** @typedef {{}} Chat_GroupInputs */
/** @typedef {{}} Chat_LeadInputs */
/** @typedef {{}} Chat_LeaveInputs */
/** @typedef {{}} Chat_MembersInputs */
/** @typedef {{}} Chat_New_GroupInputs */
/** @typedef {{}} Chat_OnlineInputs */
/** @typedef {{}} Chat_PhotoInputs */
/** @typedef {{}} Chat_ReplyInputs */
/** @typedef {{}} Chat_TitleInputs */
/** @typedef {{}} Chat_TypingInputs */
/** @typedef {{}} Common_Account_NeededInputs */
/** @typedef {{ feature: NonNullable<unknown> }} Common_Account_Needed_BodyInputs */
/** @typedef {{}} Common_BackInputs */
/** @typedef {{}} Common_Create_AccountInputs */
/** @typedef {{}} Common_Guest_CopyInputs */
/** @typedef {{}} Common_Guest_ModeInputs */
/** @typedef {{}} Common_LoginInputs */
/** @typedef {{}} Common_Login_PasswordInputs */
/** @typedef {{}} Common_Open_ProfileInputs */
/** @typedef {{}} Common_PrivacyInputs */
/** @typedef {{}} Common_ProfileInputs */
/** @typedef {{}} Common_RegisterInputs */
/** @typedef {{}} Common_RulesInputs */
/** @typedef {{}} Common_To_MapInputs */
/** @typedef {{}} Footer_AriaInputs */
/** @typedef {{}} Lang_ArInputs */
/** @typedef {{}} Lang_BnInputs */
/** @typedef {{}} Lang_CsInputs */
/** @typedef {{}} Lang_DeInputs */
/** @typedef {{}} Lang_ElInputs */
/** @typedef {{}} Lang_EnInputs */
/** @typedef {{}} Lang_EsInputs */
/** @typedef {{}} Lang_FaInputs */
/** @typedef {{}} Lang_FrInputs */
/** @typedef {{}} Lang_HeInputs */
/** @typedef {{}} Lang_HiInputs */
/** @typedef {{}} Lang_HuInputs */
/** @typedef {{}} Lang_IdInputs */
/** @typedef {{}} Lang_ItInputs */
/** @typedef {{}} Lang_JaInputs */
/** @typedef {{}} Lang_KoInputs */
/** @typedef {{}} Lang_MsInputs */
/** @typedef {{}} Lang_NlInputs */
/** @typedef {{}} Lang_PaInputs */
/** @typedef {{}} Lang_PlInputs */
/** @typedef {{}} Lang_PtInputs */
/** @typedef {{}} Lang_RoInputs */
/** @typedef {{}} Lang_RuInputs */
/** @typedef {{}} Lang_SvInputs */
/** @typedef {{}} Lang_SwInputs */
/** @typedef {{}} Lang_ThInputs */
/** @typedef {{}} Lang_TrInputs */
/** @typedef {{}} Lang_UkInputs */
/** @typedef {{}} Lang_UrInputs */
/** @typedef {{}} Lang_ViInputs */
/** @typedef {{}} Lang_ZhInputs */
/** @typedef {{}} Lang_Zh_Tw2Inputs */
/** @typedef {{}} Legal_PrivacyInputs */
/** @typedef {{}} Legal_RulesInputs */
/** @typedef {{}} Menu_Add_CardInputs */
/** @typedef {{}} Menu_Add_MetaInputs */
/** @typedef {{}} Menu_AppInputs */
/** @typedef {{}} Menu_DownloadInputs */
/** @typedef {{}} Menu_HapticsInputs */
/** @typedef {{}} Menu_Haptics_OffInputs */
/** @typedef {{}} Menu_Haptics_OnInputs */
/** @typedef {{}} Menu_Install_HintInputs */
/** @typedef {{}} Menu_LanguageInputs */
/** @typedef {{}} Menu_Language_HintInputs */
/** @typedef {{}} Menu_LeadInputs */
/** @typedef {{}} Menu_Profile_CardInputs */
/** @typedef {{}} Menu_Profile_MetaInputs */
/** @typedef {{}} Menu_Save_LanguageInputs */
/** @typedef {{}} Menu_Section_CaptionInputs */
/** @typedef {{}} Menu_SoundInputs */
/** @typedef {{}} Menu_Sound_OffInputs */
/** @typedef {{}} Menu_Sound_OnInputs */
/** @typedef {{}} Menu_Sound_TestInputs */
/** @typedef {{}} Menu_Sound_Test_HintInputs */
/** @typedef {{}} Menu_Steps_CardInputs */
/** @typedef {{}} Menu_Steps_MetaInputs */
/** @typedef {{}} Menu_ThemeInputs */
/** @typedef {{}} Menu_Theme_DarkInputs */
/** @typedef {{}} Menu_Theme_LightInputs */
/** @typedef {{}} Menu_TitleInputs */
/** @typedef {{}} Nav_ChatsInputs */
/** @typedef {{}} Nav_CitiesInputs */
/** @typedef {{}} Nav_MenuInputs */
/** @typedef {{}} Nav_SearchInputs */
/** @typedef {{}} Notifications_TitleInputs */
/** @typedef {{}} Profile_SettingsInputs */
/** @typedef {{}} Profile_Settings_SoundInputs */
/** @typedef {{}} Profile_TitleInputs */
/** @typedef {{}} Pwa_InstalledInputs */
/** @typedef {{}} Search_TitleInputs */
/** @typedef {{}} Steps_InstallInputs */
/** @typedef {{}} Steps_LeadInputs */
/** @typedef {{}} Steps_TitleInputs */
import * as __ru from "./ru.js"
import * as __en from "./en.js"
import * as __fr from "./fr.js"
import * as __es from "./es.js"
import * as __zh from "./zh.js"
import * as __zh_tw2 from "./zh-TW.js"
import * as __hi from "./hi.js"
import * as __ar from "./ar.js"
import * as __pt from "./pt.js"
import * as __de from "./de.js"
import * as __ja from "./ja.js"
import * as __ko from "./ko.js"
import * as __it from "./it.js"
import * as __tr from "./tr.js"
import * as __pl from "./pl.js"
import * as __uk from "./uk.js"
import * as __nl from "./nl.js"
import * as __vi from "./vi.js"
import * as __id from "./id.js"
import * as __ms from "./ms.js"
import * as __th from "./th.js"
import * as __fa from "./fa.js"
import * as __ur from "./ur.js"
import * as __bn from "./bn.js"
import * as __pa from "./pa.js"
import * as __sw from "./sw.js"
import * as __el from "./el.js"
import * as __cs from "./cs.js"
import * as __ro from "./ro.js"
import * as __hu from "./hu.js"
import * as __sv from "./sv.js"
import * as __he from "./he.js"
/**
* | output |
* | --- |
* | "All read" |
*
* @param {Chat_All_ReadInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_all_read = /** @type {((inputs?: Chat_All_ReadInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_All_ReadInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_all_read(inputs)
	if (locale === "fr") return __fr.chat_all_read(inputs)
	if (locale === "es") return __es.chat_all_read(inputs)
	if (locale === "zh") return __zh.chat_all_read(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_all_read(inputs)
	if (locale === "hi") return __hi.chat_all_read(inputs)
	if (locale === "ar") return __ar.chat_all_read(inputs)
	if (locale === "pt") return __pt.chat_all_read(inputs)
	if (locale === "de") return __de.chat_all_read(inputs)
	if (locale === "ja") return __ja.chat_all_read(inputs)
	if (locale === "ko") return __ko.chat_all_read(inputs)
	if (locale === "it") return __it.chat_all_read(inputs)
	if (locale === "tr") return __tr.chat_all_read(inputs)
	if (locale === "pl") return __pl.chat_all_read(inputs)
	if (locale === "uk") return __uk.chat_all_read(inputs)
	if (locale === "nl") return __nl.chat_all_read(inputs)
	if (locale === "vi") return __vi.chat_all_read(inputs)
	if (locale === "id") return __id.chat_all_read(inputs)
	if (locale === "ms") return __ms.chat_all_read(inputs)
	if (locale === "th") return __th.chat_all_read(inputs)
	if (locale === "fa") return __fa.chat_all_read(inputs)
	if (locale === "ur") return __ur.chat_all_read(inputs)
	if (locale === "bn") return __bn.chat_all_read(inputs)
	if (locale === "pa") return __pa.chat_all_read(inputs)
	if (locale === "sw") return __sw.chat_all_read(inputs)
	if (locale === "el") return __el.chat_all_read(inputs)
	if (locale === "cs") return __cs.chat_all_read(inputs)
	if (locale === "ro") return __ro.chat_all_read(inputs)
	if (locale === "hu") return __hu.chat_all_read(inputs)
	if (locale === "sv") return __sv.chat_all_read(inputs)
	if (locale === "he") return __he.chat_all_read(inputs)
	return __ru.chat_all_read(inputs)
});
/**
* | output |
* | --- |
* | "Copy" |
*
* @param {Chat_CopyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_copy = /** @type {((inputs?: Chat_CopyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_CopyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_copy(inputs)
	if (locale === "fr") return __fr.chat_copy(inputs)
	if (locale === "es") return __es.chat_copy(inputs)
	if (locale === "zh") return __zh.chat_copy(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_copy(inputs)
	if (locale === "hi") return __hi.chat_copy(inputs)
	if (locale === "ar") return __ar.chat_copy(inputs)
	if (locale === "pt") return __pt.chat_copy(inputs)
	if (locale === "de") return __de.chat_copy(inputs)
	if (locale === "ja") return __ja.chat_copy(inputs)
	if (locale === "ko") return __ko.chat_copy(inputs)
	if (locale === "it") return __it.chat_copy(inputs)
	if (locale === "tr") return __tr.chat_copy(inputs)
	if (locale === "pl") return __pl.chat_copy(inputs)
	if (locale === "uk") return __uk.chat_copy(inputs)
	if (locale === "nl") return __nl.chat_copy(inputs)
	if (locale === "vi") return __vi.chat_copy(inputs)
	if (locale === "id") return __id.chat_copy(inputs)
	if (locale === "ms") return __ms.chat_copy(inputs)
	if (locale === "th") return __th.chat_copy(inputs)
	if (locale === "fa") return __fa.chat_copy(inputs)
	if (locale === "ur") return __ur.chat_copy(inputs)
	if (locale === "bn") return __bn.chat_copy(inputs)
	if (locale === "pa") return __pa.chat_copy(inputs)
	if (locale === "sw") return __sw.chat_copy(inputs)
	if (locale === "el") return __el.chat_copy(inputs)
	if (locale === "cs") return __cs.chat_copy(inputs)
	if (locale === "ro") return __ro.chat_copy(inputs)
	if (locale === "hu") return __hu.chat_copy(inputs)
	if (locale === "sv") return __sv.chat_copy(inputs)
	if (locale === "he") return __he.chat_copy(inputs)
	return __ru.chat_copy(inputs)
});
/**
* | output |
* | --- |
* | "Delete" |
*
* @param {Chat_DeleteInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_delete = /** @type {((inputs?: Chat_DeleteInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_DeleteInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_delete(inputs)
	if (locale === "fr") return __fr.chat_delete(inputs)
	if (locale === "es") return __es.chat_delete(inputs)
	if (locale === "zh") return __zh.chat_delete(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_delete(inputs)
	if (locale === "hi") return __hi.chat_delete(inputs)
	if (locale === "ar") return __ar.chat_delete(inputs)
	if (locale === "pt") return __pt.chat_delete(inputs)
	if (locale === "de") return __de.chat_delete(inputs)
	if (locale === "ja") return __ja.chat_delete(inputs)
	if (locale === "ko") return __ko.chat_delete(inputs)
	if (locale === "it") return __it.chat_delete(inputs)
	if (locale === "tr") return __tr.chat_delete(inputs)
	if (locale === "pl") return __pl.chat_delete(inputs)
	if (locale === "uk") return __uk.chat_delete(inputs)
	if (locale === "nl") return __nl.chat_delete(inputs)
	if (locale === "vi") return __vi.chat_delete(inputs)
	if (locale === "id") return __id.chat_delete(inputs)
	if (locale === "ms") return __ms.chat_delete(inputs)
	if (locale === "th") return __th.chat_delete(inputs)
	if (locale === "fa") return __fa.chat_delete(inputs)
	if (locale === "ur") return __ur.chat_delete(inputs)
	if (locale === "bn") return __bn.chat_delete(inputs)
	if (locale === "pa") return __pa.chat_delete(inputs)
	if (locale === "sw") return __sw.chat_delete(inputs)
	if (locale === "el") return __el.chat_delete(inputs)
	if (locale === "cs") return __cs.chat_delete(inputs)
	if (locale === "ro") return __ro.chat_delete(inputs)
	if (locale === "hu") return __hu.chat_delete(inputs)
	if (locale === "sv") return __sv.chat_delete(inputs)
	if (locale === "he") return __he.chat_delete(inputs)
	return __ru.chat_delete(inputs)
});
/**
* | output |
* | --- |
* | "Conversations" |
*
* @param {Chat_DialogsInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_dialogs = /** @type {((inputs?: Chat_DialogsInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_DialogsInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_dialogs(inputs)
	if (locale === "fr") return __fr.chat_dialogs(inputs)
	if (locale === "es") return __es.chat_dialogs(inputs)
	if (locale === "zh") return __zh.chat_dialogs(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_dialogs(inputs)
	if (locale === "hi") return __hi.chat_dialogs(inputs)
	if (locale === "ar") return __ar.chat_dialogs(inputs)
	if (locale === "pt") return __pt.chat_dialogs(inputs)
	if (locale === "de") return __de.chat_dialogs(inputs)
	if (locale === "ja") return __ja.chat_dialogs(inputs)
	if (locale === "ko") return __ko.chat_dialogs(inputs)
	if (locale === "it") return __it.chat_dialogs(inputs)
	if (locale === "tr") return __tr.chat_dialogs(inputs)
	if (locale === "pl") return __pl.chat_dialogs(inputs)
	if (locale === "uk") return __uk.chat_dialogs(inputs)
	if (locale === "nl") return __nl.chat_dialogs(inputs)
	if (locale === "vi") return __vi.chat_dialogs(inputs)
	if (locale === "id") return __id.chat_dialogs(inputs)
	if (locale === "ms") return __ms.chat_dialogs(inputs)
	if (locale === "th") return __th.chat_dialogs(inputs)
	if (locale === "fa") return __fa.chat_dialogs(inputs)
	if (locale === "ur") return __ur.chat_dialogs(inputs)
	if (locale === "bn") return __bn.chat_dialogs(inputs)
	if (locale === "pa") return __pa.chat_dialogs(inputs)
	if (locale === "sw") return __sw.chat_dialogs(inputs)
	if (locale === "el") return __el.chat_dialogs(inputs)
	if (locale === "cs") return __cs.chat_dialogs(inputs)
	if (locale === "ro") return __ro.chat_dialogs(inputs)
	if (locale === "hu") return __hu.chat_dialogs(inputs)
	if (locale === "sv") return __sv.chat_dialogs(inputs)
	if (locale === "he") return __he.chat_dialogs(inputs)
	return __ru.chat_dialogs(inputs)
});
/**
* | output |
* | --- |
* | "Edit" |
*
* @param {Chat_EditInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_edit = /** @type {((inputs?: Chat_EditInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_EditInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_edit(inputs)
	if (locale === "fr") return __fr.chat_edit(inputs)
	if (locale === "es") return __es.chat_edit(inputs)
	if (locale === "zh") return __zh.chat_edit(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_edit(inputs)
	if (locale === "hi") return __hi.chat_edit(inputs)
	if (locale === "ar") return __ar.chat_edit(inputs)
	if (locale === "pt") return __pt.chat_edit(inputs)
	if (locale === "de") return __de.chat_edit(inputs)
	if (locale === "ja") return __ja.chat_edit(inputs)
	if (locale === "ko") return __ko.chat_edit(inputs)
	if (locale === "it") return __it.chat_edit(inputs)
	if (locale === "tr") return __tr.chat_edit(inputs)
	if (locale === "pl") return __pl.chat_edit(inputs)
	if (locale === "uk") return __uk.chat_edit(inputs)
	if (locale === "nl") return __nl.chat_edit(inputs)
	if (locale === "vi") return __vi.chat_edit(inputs)
	if (locale === "id") return __id.chat_edit(inputs)
	if (locale === "ms") return __ms.chat_edit(inputs)
	if (locale === "th") return __th.chat_edit(inputs)
	if (locale === "fa") return __fa.chat_edit(inputs)
	if (locale === "ur") return __ur.chat_edit(inputs)
	if (locale === "bn") return __bn.chat_edit(inputs)
	if (locale === "pa") return __pa.chat_edit(inputs)
	if (locale === "sw") return __sw.chat_edit(inputs)
	if (locale === "el") return __el.chat_edit(inputs)
	if (locale === "cs") return __cs.chat_edit(inputs)
	if (locale === "ro") return __ro.chat_edit(inputs)
	if (locale === "hu") return __hu.chat_edit(inputs)
	if (locale === "sv") return __sv.chat_edit(inputs)
	if (locale === "he") return __he.chat_edit(inputs)
	return __ru.chat_edit(inputs)
});
/**
* | output |
* | --- |
* | "No conversations" |
*
* @param {Chat_EmptyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_empty = /** @type {((inputs?: Chat_EmptyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_EmptyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_empty(inputs)
	if (locale === "fr") return __fr.chat_empty(inputs)
	if (locale === "es") return __es.chat_empty(inputs)
	if (locale === "zh") return __zh.chat_empty(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_empty(inputs)
	if (locale === "hi") return __hi.chat_empty(inputs)
	if (locale === "ar") return __ar.chat_empty(inputs)
	if (locale === "pt") return __pt.chat_empty(inputs)
	if (locale === "de") return __de.chat_empty(inputs)
	if (locale === "ja") return __ja.chat_empty(inputs)
	if (locale === "ko") return __ko.chat_empty(inputs)
	if (locale === "it") return __it.chat_empty(inputs)
	if (locale === "tr") return __tr.chat_empty(inputs)
	if (locale === "pl") return __pl.chat_empty(inputs)
	if (locale === "uk") return __uk.chat_empty(inputs)
	if (locale === "nl") return __nl.chat_empty(inputs)
	if (locale === "vi") return __vi.chat_empty(inputs)
	if (locale === "id") return __id.chat_empty(inputs)
	if (locale === "ms") return __ms.chat_empty(inputs)
	if (locale === "th") return __th.chat_empty(inputs)
	if (locale === "fa") return __fa.chat_empty(inputs)
	if (locale === "ur") return __ur.chat_empty(inputs)
	if (locale === "bn") return __bn.chat_empty(inputs)
	if (locale === "pa") return __pa.chat_empty(inputs)
	if (locale === "sw") return __sw.chat_empty(inputs)
	if (locale === "el") return __el.chat_empty(inputs)
	if (locale === "cs") return __cs.chat_empty(inputs)
	if (locale === "ro") return __ro.chat_empty(inputs)
	if (locale === "hu") return __hu.chat_empty(inputs)
	if (locale === "sv") return __sv.chat_empty(inputs)
	if (locale === "he") return __he.chat_empty(inputs)
	return __ru.chat_empty(inputs)
});
/**
* | output |
* | --- |
* | "Forward" |
*
* @param {Chat_ForwardInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_forward = /** @type {((inputs?: Chat_ForwardInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_ForwardInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_forward(inputs)
	if (locale === "fr") return __fr.chat_forward(inputs)
	if (locale === "es") return __es.chat_forward(inputs)
	if (locale === "zh") return __zh.chat_forward(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_forward(inputs)
	if (locale === "hi") return __hi.chat_forward(inputs)
	if (locale === "ar") return __ar.chat_forward(inputs)
	if (locale === "pt") return __pt.chat_forward(inputs)
	if (locale === "de") return __de.chat_forward(inputs)
	if (locale === "ja") return __ja.chat_forward(inputs)
	if (locale === "ko") return __ko.chat_forward(inputs)
	if (locale === "it") return __it.chat_forward(inputs)
	if (locale === "tr") return __tr.chat_forward(inputs)
	if (locale === "pl") return __pl.chat_forward(inputs)
	if (locale === "uk") return __uk.chat_forward(inputs)
	if (locale === "nl") return __nl.chat_forward(inputs)
	if (locale === "vi") return __vi.chat_forward(inputs)
	if (locale === "id") return __id.chat_forward(inputs)
	if (locale === "ms") return __ms.chat_forward(inputs)
	if (locale === "th") return __th.chat_forward(inputs)
	if (locale === "fa") return __fa.chat_forward(inputs)
	if (locale === "ur") return __ur.chat_forward(inputs)
	if (locale === "bn") return __bn.chat_forward(inputs)
	if (locale === "pa") return __pa.chat_forward(inputs)
	if (locale === "sw") return __sw.chat_forward(inputs)
	if (locale === "el") return __el.chat_forward(inputs)
	if (locale === "cs") return __cs.chat_forward(inputs)
	if (locale === "ro") return __ro.chat_forward(inputs)
	if (locale === "hu") return __hu.chat_forward(inputs)
	if (locale === "sv") return __sv.chat_forward(inputs)
	if (locale === "he") return __he.chat_forward(inputs)
	return __ru.chat_forward(inputs)
});
/**
* | output |
* | --- |
* | "Group" |
*
* @param {Chat_GroupInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_group = /** @type {((inputs?: Chat_GroupInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_GroupInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_group(inputs)
	if (locale === "fr") return __fr.chat_group(inputs)
	if (locale === "es") return __es.chat_group(inputs)
	if (locale === "zh") return __zh.chat_group(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_group(inputs)
	if (locale === "hi") return __hi.chat_group(inputs)
	if (locale === "ar") return __ar.chat_group(inputs)
	if (locale === "pt") return __pt.chat_group(inputs)
	if (locale === "de") return __de.chat_group(inputs)
	if (locale === "ja") return __ja.chat_group(inputs)
	if (locale === "ko") return __ko.chat_group(inputs)
	if (locale === "it") return __it.chat_group(inputs)
	if (locale === "tr") return __tr.chat_group(inputs)
	if (locale === "pl") return __pl.chat_group(inputs)
	if (locale === "uk") return __uk.chat_group(inputs)
	if (locale === "nl") return __nl.chat_group(inputs)
	if (locale === "vi") return __vi.chat_group(inputs)
	if (locale === "id") return __id.chat_group(inputs)
	if (locale === "ms") return __ms.chat_group(inputs)
	if (locale === "th") return __th.chat_group(inputs)
	if (locale === "fa") return __fa.chat_group(inputs)
	if (locale === "ur") return __ur.chat_group(inputs)
	if (locale === "bn") return __bn.chat_group(inputs)
	if (locale === "pa") return __pa.chat_group(inputs)
	if (locale === "sw") return __sw.chat_group(inputs)
	if (locale === "el") return __el.chat_group(inputs)
	if (locale === "cs") return __cs.chat_group(inputs)
	if (locale === "ro") return __ro.chat_group(inputs)
	if (locale === "hu") return __hu.chat_group(inputs)
	if (locale === "sv") return __sv.chat_group(inputs)
	if (locale === "he") return __he.chat_group(inputs)
	return __ru.chat_group(inputs)
});
/**
* | output |
* | --- |
* | "Direct messages and groups." |
*
* @param {Chat_LeadInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_lead = /** @type {((inputs?: Chat_LeadInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_LeadInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_lead(inputs)
	if (locale === "fr") return __fr.chat_lead(inputs)
	if (locale === "es") return __es.chat_lead(inputs)
	if (locale === "zh") return __zh.chat_lead(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_lead(inputs)
	if (locale === "hi") return __hi.chat_lead(inputs)
	if (locale === "ar") return __ar.chat_lead(inputs)
	if (locale === "pt") return __pt.chat_lead(inputs)
	if (locale === "de") return __de.chat_lead(inputs)
	if (locale === "ja") return __ja.chat_lead(inputs)
	if (locale === "ko") return __ko.chat_lead(inputs)
	if (locale === "it") return __it.chat_lead(inputs)
	if (locale === "tr") return __tr.chat_lead(inputs)
	if (locale === "pl") return __pl.chat_lead(inputs)
	if (locale === "uk") return __uk.chat_lead(inputs)
	if (locale === "nl") return __nl.chat_lead(inputs)
	if (locale === "vi") return __vi.chat_lead(inputs)
	if (locale === "id") return __id.chat_lead(inputs)
	if (locale === "ms") return __ms.chat_lead(inputs)
	if (locale === "th") return __th.chat_lead(inputs)
	if (locale === "fa") return __fa.chat_lead(inputs)
	if (locale === "ur") return __ur.chat_lead(inputs)
	if (locale === "bn") return __bn.chat_lead(inputs)
	if (locale === "pa") return __pa.chat_lead(inputs)
	if (locale === "sw") return __sw.chat_lead(inputs)
	if (locale === "el") return __el.chat_lead(inputs)
	if (locale === "cs") return __cs.chat_lead(inputs)
	if (locale === "ro") return __ro.chat_lead(inputs)
	if (locale === "hu") return __hu.chat_lead(inputs)
	if (locale === "sv") return __sv.chat_lead(inputs)
	if (locale === "he") return __he.chat_lead(inputs)
	return __ru.chat_lead(inputs)
});
/**
* | output |
* | --- |
* | "Leave" |
*
* @param {Chat_LeaveInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_leave = /** @type {((inputs?: Chat_LeaveInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_LeaveInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_leave(inputs)
	if (locale === "fr") return __fr.chat_leave(inputs)
	if (locale === "es") return __es.chat_leave(inputs)
	if (locale === "zh") return __zh.chat_leave(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_leave(inputs)
	if (locale === "hi") return __hi.chat_leave(inputs)
	if (locale === "ar") return __ar.chat_leave(inputs)
	if (locale === "pt") return __pt.chat_leave(inputs)
	if (locale === "de") return __de.chat_leave(inputs)
	if (locale === "ja") return __ja.chat_leave(inputs)
	if (locale === "ko") return __ko.chat_leave(inputs)
	if (locale === "it") return __it.chat_leave(inputs)
	if (locale === "tr") return __tr.chat_leave(inputs)
	if (locale === "pl") return __pl.chat_leave(inputs)
	if (locale === "uk") return __uk.chat_leave(inputs)
	if (locale === "nl") return __nl.chat_leave(inputs)
	if (locale === "vi") return __vi.chat_leave(inputs)
	if (locale === "id") return __id.chat_leave(inputs)
	if (locale === "ms") return __ms.chat_leave(inputs)
	if (locale === "th") return __th.chat_leave(inputs)
	if (locale === "fa") return __fa.chat_leave(inputs)
	if (locale === "ur") return __ur.chat_leave(inputs)
	if (locale === "bn") return __bn.chat_leave(inputs)
	if (locale === "pa") return __pa.chat_leave(inputs)
	if (locale === "sw") return __sw.chat_leave(inputs)
	if (locale === "el") return __el.chat_leave(inputs)
	if (locale === "cs") return __cs.chat_leave(inputs)
	if (locale === "ro") return __ro.chat_leave(inputs)
	if (locale === "hu") return __hu.chat_leave(inputs)
	if (locale === "sv") return __sv.chat_leave(inputs)
	if (locale === "he") return __he.chat_leave(inputs)
	return __ru.chat_leave(inputs)
});
/**
* | output |
* | --- |
* | "Members" |
*
* @param {Chat_MembersInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_members = /** @type {((inputs?: Chat_MembersInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_MembersInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_members(inputs)
	if (locale === "fr") return __fr.chat_members(inputs)
	if (locale === "es") return __es.chat_members(inputs)
	if (locale === "zh") return __zh.chat_members(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_members(inputs)
	if (locale === "hi") return __hi.chat_members(inputs)
	if (locale === "ar") return __ar.chat_members(inputs)
	if (locale === "pt") return __pt.chat_members(inputs)
	if (locale === "de") return __de.chat_members(inputs)
	if (locale === "ja") return __ja.chat_members(inputs)
	if (locale === "ko") return __ko.chat_members(inputs)
	if (locale === "it") return __it.chat_members(inputs)
	if (locale === "tr") return __tr.chat_members(inputs)
	if (locale === "pl") return __pl.chat_members(inputs)
	if (locale === "uk") return __uk.chat_members(inputs)
	if (locale === "nl") return __nl.chat_members(inputs)
	if (locale === "vi") return __vi.chat_members(inputs)
	if (locale === "id") return __id.chat_members(inputs)
	if (locale === "ms") return __ms.chat_members(inputs)
	if (locale === "th") return __th.chat_members(inputs)
	if (locale === "fa") return __fa.chat_members(inputs)
	if (locale === "ur") return __ur.chat_members(inputs)
	if (locale === "bn") return __bn.chat_members(inputs)
	if (locale === "pa") return __pa.chat_members(inputs)
	if (locale === "sw") return __sw.chat_members(inputs)
	if (locale === "el") return __el.chat_members(inputs)
	if (locale === "cs") return __cs.chat_members(inputs)
	if (locale === "ro") return __ro.chat_members(inputs)
	if (locale === "hu") return __hu.chat_members(inputs)
	if (locale === "sv") return __sv.chat_members(inputs)
	if (locale === "he") return __he.chat_members(inputs)
	return __ru.chat_members(inputs)
});
/**
* | output |
* | --- |
* | "Create group" |
*
* @param {Chat_New_GroupInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_new_group = /** @type {((inputs?: Chat_New_GroupInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_New_GroupInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_new_group(inputs)
	if (locale === "fr") return __fr.chat_new_group(inputs)
	if (locale === "es") return __es.chat_new_group(inputs)
	if (locale === "zh") return __zh.chat_new_group(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_new_group(inputs)
	if (locale === "hi") return __hi.chat_new_group(inputs)
	if (locale === "ar") return __ar.chat_new_group(inputs)
	if (locale === "pt") return __pt.chat_new_group(inputs)
	if (locale === "de") return __de.chat_new_group(inputs)
	if (locale === "ja") return __ja.chat_new_group(inputs)
	if (locale === "ko") return __ko.chat_new_group(inputs)
	if (locale === "it") return __it.chat_new_group(inputs)
	if (locale === "tr") return __tr.chat_new_group(inputs)
	if (locale === "pl") return __pl.chat_new_group(inputs)
	if (locale === "uk") return __uk.chat_new_group(inputs)
	if (locale === "nl") return __nl.chat_new_group(inputs)
	if (locale === "vi") return __vi.chat_new_group(inputs)
	if (locale === "id") return __id.chat_new_group(inputs)
	if (locale === "ms") return __ms.chat_new_group(inputs)
	if (locale === "th") return __th.chat_new_group(inputs)
	if (locale === "fa") return __fa.chat_new_group(inputs)
	if (locale === "ur") return __ur.chat_new_group(inputs)
	if (locale === "bn") return __bn.chat_new_group(inputs)
	if (locale === "pa") return __pa.chat_new_group(inputs)
	if (locale === "sw") return __sw.chat_new_group(inputs)
	if (locale === "el") return __el.chat_new_group(inputs)
	if (locale === "cs") return __cs.chat_new_group(inputs)
	if (locale === "ro") return __ro.chat_new_group(inputs)
	if (locale === "hu") return __hu.chat_new_group(inputs)
	if (locale === "sv") return __sv.chat_new_group(inputs)
	if (locale === "he") return __he.chat_new_group(inputs)
	return __ru.chat_new_group(inputs)
});
/**
* | output |
* | --- |
* | "online" |
*
* @param {Chat_OnlineInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_online = /** @type {((inputs?: Chat_OnlineInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_OnlineInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_online(inputs)
	if (locale === "fr") return __fr.chat_online(inputs)
	if (locale === "es") return __es.chat_online(inputs)
	if (locale === "zh") return __zh.chat_online(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_online(inputs)
	if (locale === "hi") return __hi.chat_online(inputs)
	if (locale === "ar") return __ar.chat_online(inputs)
	if (locale === "pt") return __pt.chat_online(inputs)
	if (locale === "de") return __de.chat_online(inputs)
	if (locale === "ja") return __ja.chat_online(inputs)
	if (locale === "ko") return __ko.chat_online(inputs)
	if (locale === "it") return __it.chat_online(inputs)
	if (locale === "tr") return __tr.chat_online(inputs)
	if (locale === "pl") return __pl.chat_online(inputs)
	if (locale === "uk") return __uk.chat_online(inputs)
	if (locale === "nl") return __nl.chat_online(inputs)
	if (locale === "vi") return __vi.chat_online(inputs)
	if (locale === "id") return __id.chat_online(inputs)
	if (locale === "ms") return __ms.chat_online(inputs)
	if (locale === "th") return __th.chat_online(inputs)
	if (locale === "fa") return __fa.chat_online(inputs)
	if (locale === "ur") return __ur.chat_online(inputs)
	if (locale === "bn") return __bn.chat_online(inputs)
	if (locale === "pa") return __pa.chat_online(inputs)
	if (locale === "sw") return __sw.chat_online(inputs)
	if (locale === "el") return __el.chat_online(inputs)
	if (locale === "cs") return __cs.chat_online(inputs)
	if (locale === "ro") return __ro.chat_online(inputs)
	if (locale === "hu") return __hu.chat_online(inputs)
	if (locale === "sv") return __sv.chat_online(inputs)
	if (locale === "he") return __he.chat_online(inputs)
	return __ru.chat_online(inputs)
});
/**
* | output |
* | --- |
* | "Photo" |
*
* @param {Chat_PhotoInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_photo = /** @type {((inputs?: Chat_PhotoInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_PhotoInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_photo(inputs)
	if (locale === "fr") return __fr.chat_photo(inputs)
	if (locale === "es") return __es.chat_photo(inputs)
	if (locale === "zh") return __zh.chat_photo(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_photo(inputs)
	if (locale === "hi") return __hi.chat_photo(inputs)
	if (locale === "ar") return __ar.chat_photo(inputs)
	if (locale === "pt") return __pt.chat_photo(inputs)
	if (locale === "de") return __de.chat_photo(inputs)
	if (locale === "ja") return __ja.chat_photo(inputs)
	if (locale === "ko") return __ko.chat_photo(inputs)
	if (locale === "it") return __it.chat_photo(inputs)
	if (locale === "tr") return __tr.chat_photo(inputs)
	if (locale === "pl") return __pl.chat_photo(inputs)
	if (locale === "uk") return __uk.chat_photo(inputs)
	if (locale === "nl") return __nl.chat_photo(inputs)
	if (locale === "vi") return __vi.chat_photo(inputs)
	if (locale === "id") return __id.chat_photo(inputs)
	if (locale === "ms") return __ms.chat_photo(inputs)
	if (locale === "th") return __th.chat_photo(inputs)
	if (locale === "fa") return __fa.chat_photo(inputs)
	if (locale === "ur") return __ur.chat_photo(inputs)
	if (locale === "bn") return __bn.chat_photo(inputs)
	if (locale === "pa") return __pa.chat_photo(inputs)
	if (locale === "sw") return __sw.chat_photo(inputs)
	if (locale === "el") return __el.chat_photo(inputs)
	if (locale === "cs") return __cs.chat_photo(inputs)
	if (locale === "ro") return __ro.chat_photo(inputs)
	if (locale === "hu") return __hu.chat_photo(inputs)
	if (locale === "sv") return __sv.chat_photo(inputs)
	if (locale === "he") return __he.chat_photo(inputs)
	return __ru.chat_photo(inputs)
});
/**
* | output |
* | --- |
* | "Reply" |
*
* @param {Chat_ReplyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_reply = /** @type {((inputs?: Chat_ReplyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_ReplyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_reply(inputs)
	if (locale === "fr") return __fr.chat_reply(inputs)
	if (locale === "es") return __es.chat_reply(inputs)
	if (locale === "zh") return __zh.chat_reply(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_reply(inputs)
	if (locale === "hi") return __hi.chat_reply(inputs)
	if (locale === "ar") return __ar.chat_reply(inputs)
	if (locale === "pt") return __pt.chat_reply(inputs)
	if (locale === "de") return __de.chat_reply(inputs)
	if (locale === "ja") return __ja.chat_reply(inputs)
	if (locale === "ko") return __ko.chat_reply(inputs)
	if (locale === "it") return __it.chat_reply(inputs)
	if (locale === "tr") return __tr.chat_reply(inputs)
	if (locale === "pl") return __pl.chat_reply(inputs)
	if (locale === "uk") return __uk.chat_reply(inputs)
	if (locale === "nl") return __nl.chat_reply(inputs)
	if (locale === "vi") return __vi.chat_reply(inputs)
	if (locale === "id") return __id.chat_reply(inputs)
	if (locale === "ms") return __ms.chat_reply(inputs)
	if (locale === "th") return __th.chat_reply(inputs)
	if (locale === "fa") return __fa.chat_reply(inputs)
	if (locale === "ur") return __ur.chat_reply(inputs)
	if (locale === "bn") return __bn.chat_reply(inputs)
	if (locale === "pa") return __pa.chat_reply(inputs)
	if (locale === "sw") return __sw.chat_reply(inputs)
	if (locale === "el") return __el.chat_reply(inputs)
	if (locale === "cs") return __cs.chat_reply(inputs)
	if (locale === "ro") return __ro.chat_reply(inputs)
	if (locale === "hu") return __hu.chat_reply(inputs)
	if (locale === "sv") return __sv.chat_reply(inputs)
	if (locale === "he") return __he.chat_reply(inputs)
	return __ru.chat_reply(inputs)
});
/**
* | output |
* | --- |
* | "Chats" |
*
* @param {Chat_TitleInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_title = /** @type {((inputs?: Chat_TitleInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_TitleInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_title(inputs)
	if (locale === "fr") return __fr.chat_title(inputs)
	if (locale === "es") return __es.chat_title(inputs)
	if (locale === "zh") return __zh.chat_title(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_title(inputs)
	if (locale === "hi") return __hi.chat_title(inputs)
	if (locale === "ar") return __ar.chat_title(inputs)
	if (locale === "pt") return __pt.chat_title(inputs)
	if (locale === "de") return __de.chat_title(inputs)
	if (locale === "ja") return __ja.chat_title(inputs)
	if (locale === "ko") return __ko.chat_title(inputs)
	if (locale === "it") return __it.chat_title(inputs)
	if (locale === "tr") return __tr.chat_title(inputs)
	if (locale === "pl") return __pl.chat_title(inputs)
	if (locale === "uk") return __uk.chat_title(inputs)
	if (locale === "nl") return __nl.chat_title(inputs)
	if (locale === "vi") return __vi.chat_title(inputs)
	if (locale === "id") return __id.chat_title(inputs)
	if (locale === "ms") return __ms.chat_title(inputs)
	if (locale === "th") return __th.chat_title(inputs)
	if (locale === "fa") return __fa.chat_title(inputs)
	if (locale === "ur") return __ur.chat_title(inputs)
	if (locale === "bn") return __bn.chat_title(inputs)
	if (locale === "pa") return __pa.chat_title(inputs)
	if (locale === "sw") return __sw.chat_title(inputs)
	if (locale === "el") return __el.chat_title(inputs)
	if (locale === "cs") return __cs.chat_title(inputs)
	if (locale === "ro") return __ro.chat_title(inputs)
	if (locale === "hu") return __hu.chat_title(inputs)
	if (locale === "sv") return __sv.chat_title(inputs)
	if (locale === "he") return __he.chat_title(inputs)
	return __ru.chat_title(inputs)
});
/**
* | output |
* | --- |
* | "typing…" |
*
* @param {Chat_TypingInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_typing = /** @type {((inputs?: Chat_TypingInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_TypingInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_typing(inputs)
	if (locale === "fr") return __fr.chat_typing(inputs)
	if (locale === "es") return __es.chat_typing(inputs)
	if (locale === "zh") return __zh.chat_typing(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_typing(inputs)
	if (locale === "hi") return __hi.chat_typing(inputs)
	if (locale === "ar") return __ar.chat_typing(inputs)
	if (locale === "pt") return __pt.chat_typing(inputs)
	if (locale === "de") return __de.chat_typing(inputs)
	if (locale === "ja") return __ja.chat_typing(inputs)
	if (locale === "ko") return __ko.chat_typing(inputs)
	if (locale === "it") return __it.chat_typing(inputs)
	if (locale === "tr") return __tr.chat_typing(inputs)
	if (locale === "pl") return __pl.chat_typing(inputs)
	if (locale === "uk") return __uk.chat_typing(inputs)
	if (locale === "nl") return __nl.chat_typing(inputs)
	if (locale === "vi") return __vi.chat_typing(inputs)
	if (locale === "id") return __id.chat_typing(inputs)
	if (locale === "ms") return __ms.chat_typing(inputs)
	if (locale === "th") return __th.chat_typing(inputs)
	if (locale === "fa") return __fa.chat_typing(inputs)
	if (locale === "ur") return __ur.chat_typing(inputs)
	if (locale === "bn") return __bn.chat_typing(inputs)
	if (locale === "pa") return __pa.chat_typing(inputs)
	if (locale === "sw") return __sw.chat_typing(inputs)
	if (locale === "el") return __el.chat_typing(inputs)
	if (locale === "cs") return __cs.chat_typing(inputs)
	if (locale === "ro") return __ro.chat_typing(inputs)
	if (locale === "hu") return __hu.chat_typing(inputs)
	if (locale === "sv") return __sv.chat_typing(inputs)
	if (locale === "he") return __he.chat_typing(inputs)
	return __ru.chat_typing(inputs)
});
/**
* | output |
* | --- |
* | "Account required" |
*
* @param {Common_Account_NeededInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_account_needed = /** @type {((inputs?: Common_Account_NeededInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Account_NeededInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_account_needed(inputs)
	if (locale === "fr") return __fr.common_account_needed(inputs)
	if (locale === "es") return __es.common_account_needed(inputs)
	if (locale === "zh") return __zh.common_account_needed(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_account_needed(inputs)
	if (locale === "hi") return __hi.common_account_needed(inputs)
	if (locale === "ar") return __ar.common_account_needed(inputs)
	if (locale === "pt") return __pt.common_account_needed(inputs)
	if (locale === "de") return __de.common_account_needed(inputs)
	if (locale === "ja") return __ja.common_account_needed(inputs)
	if (locale === "ko") return __ko.common_account_needed(inputs)
	if (locale === "it") return __it.common_account_needed(inputs)
	if (locale === "tr") return __tr.common_account_needed(inputs)
	if (locale === "pl") return __pl.common_account_needed(inputs)
	if (locale === "uk") return __uk.common_account_needed(inputs)
	if (locale === "nl") return __nl.common_account_needed(inputs)
	if (locale === "vi") return __vi.common_account_needed(inputs)
	if (locale === "id") return __id.common_account_needed(inputs)
	if (locale === "ms") return __ms.common_account_needed(inputs)
	if (locale === "th") return __th.common_account_needed(inputs)
	if (locale === "fa") return __fa.common_account_needed(inputs)
	if (locale === "ur") return __ur.common_account_needed(inputs)
	if (locale === "bn") return __bn.common_account_needed(inputs)
	if (locale === "pa") return __pa.common_account_needed(inputs)
	if (locale === "sw") return __sw.common_account_needed(inputs)
	if (locale === "el") return __el.common_account_needed(inputs)
	if (locale === "cs") return __cs.common_account_needed(inputs)
	if (locale === "ro") return __ro.common_account_needed(inputs)
	if (locale === "hu") return __hu.common_account_needed(inputs)
	if (locale === "sv") return __sv.common_account_needed(inputs)
	if (locale === "he") return __he.common_account_needed(inputs)
	return __ru.common_account_needed(inputs)
});
/**
* | output |
* | --- |
* | "“{feature}” is available after login. Cities and search work without an account." |
*
* @param {Common_Account_Needed_BodyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_account_needed_body = /** @type {((inputs: Common_Account_Needed_BodyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Account_Needed_BodyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_account_needed_body(inputs)
	if (locale === "fr") return __fr.common_account_needed_body(inputs)
	if (locale === "es") return __es.common_account_needed_body(inputs)
	if (locale === "zh") return __zh.common_account_needed_body(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_account_needed_body(inputs)
	if (locale === "hi") return __hi.common_account_needed_body(inputs)
	if (locale === "ar") return __ar.common_account_needed_body(inputs)
	if (locale === "pt") return __pt.common_account_needed_body(inputs)
	if (locale === "de") return __de.common_account_needed_body(inputs)
	if (locale === "ja") return __ja.common_account_needed_body(inputs)
	if (locale === "ko") return __ko.common_account_needed_body(inputs)
	if (locale === "it") return __it.common_account_needed_body(inputs)
	if (locale === "tr") return __tr.common_account_needed_body(inputs)
	if (locale === "pl") return __pl.common_account_needed_body(inputs)
	if (locale === "uk") return __uk.common_account_needed_body(inputs)
	if (locale === "nl") return __nl.common_account_needed_body(inputs)
	if (locale === "vi") return __vi.common_account_needed_body(inputs)
	if (locale === "id") return __id.common_account_needed_body(inputs)
	if (locale === "ms") return __ms.common_account_needed_body(inputs)
	if (locale === "th") return __th.common_account_needed_body(inputs)
	if (locale === "fa") return __fa.common_account_needed_body(inputs)
	if (locale === "ur") return __ur.common_account_needed_body(inputs)
	if (locale === "bn") return __bn.common_account_needed_body(inputs)
	if (locale === "pa") return __pa.common_account_needed_body(inputs)
	if (locale === "sw") return __sw.common_account_needed_body(inputs)
	if (locale === "el") return __el.common_account_needed_body(inputs)
	if (locale === "cs") return __cs.common_account_needed_body(inputs)
	if (locale === "ro") return __ro.common_account_needed_body(inputs)
	if (locale === "hu") return __hu.common_account_needed_body(inputs)
	if (locale === "sv") return __sv.common_account_needed_body(inputs)
	if (locale === "he") return __he.common_account_needed_body(inputs)
	return __ru.common_account_needed_body(inputs)
});
/**
* | output |
* | --- |
* | "Back" |
*
* @param {Common_BackInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_back = /** @type {((inputs?: Common_BackInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_BackInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_back(inputs)
	if (locale === "fr") return __fr.common_back(inputs)
	if (locale === "es") return __es.common_back(inputs)
	if (locale === "zh") return __zh.common_back(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_back(inputs)
	if (locale === "hi") return __hi.common_back(inputs)
	if (locale === "ar") return __ar.common_back(inputs)
	if (locale === "pt") return __pt.common_back(inputs)
	if (locale === "de") return __de.common_back(inputs)
	if (locale === "ja") return __ja.common_back(inputs)
	if (locale === "ko") return __ko.common_back(inputs)
	if (locale === "it") return __it.common_back(inputs)
	if (locale === "tr") return __tr.common_back(inputs)
	if (locale === "pl") return __pl.common_back(inputs)
	if (locale === "uk") return __uk.common_back(inputs)
	if (locale === "nl") return __nl.common_back(inputs)
	if (locale === "vi") return __vi.common_back(inputs)
	if (locale === "id") return __id.common_back(inputs)
	if (locale === "ms") return __ms.common_back(inputs)
	if (locale === "th") return __th.common_back(inputs)
	if (locale === "fa") return __fa.common_back(inputs)
	if (locale === "ur") return __ur.common_back(inputs)
	if (locale === "bn") return __bn.common_back(inputs)
	if (locale === "pa") return __pa.common_back(inputs)
	if (locale === "sw") return __sw.common_back(inputs)
	if (locale === "el") return __el.common_back(inputs)
	if (locale === "cs") return __cs.common_back(inputs)
	if (locale === "ro") return __ro.common_back(inputs)
	if (locale === "hu") return __hu.common_back(inputs)
	if (locale === "sv") return __sv.common_back(inputs)
	if (locale === "he") return __he.common_back(inputs)
	return __ru.common_back(inputs)
});
/**
* | output |
* | --- |
* | "Create an account" |
*
* @param {Common_Create_AccountInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_create_account = /** @type {((inputs?: Common_Create_AccountInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Create_AccountInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_create_account(inputs)
	if (locale === "fr") return __fr.common_create_account(inputs)
	if (locale === "es") return __es.common_create_account(inputs)
	if (locale === "zh") return __zh.common_create_account(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_create_account(inputs)
	if (locale === "hi") return __hi.common_create_account(inputs)
	if (locale === "ar") return __ar.common_create_account(inputs)
	if (locale === "pt") return __pt.common_create_account(inputs)
	if (locale === "de") return __de.common_create_account(inputs)
	if (locale === "ja") return __ja.common_create_account(inputs)
	if (locale === "ko") return __ko.common_create_account(inputs)
	if (locale === "it") return __it.common_create_account(inputs)
	if (locale === "tr") return __tr.common_create_account(inputs)
	if (locale === "pl") return __pl.common_create_account(inputs)
	if (locale === "uk") return __uk.common_create_account(inputs)
	if (locale === "nl") return __nl.common_create_account(inputs)
	if (locale === "vi") return __vi.common_create_account(inputs)
	if (locale === "id") return __id.common_create_account(inputs)
	if (locale === "ms") return __ms.common_create_account(inputs)
	if (locale === "th") return __th.common_create_account(inputs)
	if (locale === "fa") return __fa.common_create_account(inputs)
	if (locale === "ur") return __ur.common_create_account(inputs)
	if (locale === "bn") return __bn.common_create_account(inputs)
	if (locale === "pa") return __pa.common_create_account(inputs)
	if (locale === "sw") return __sw.common_create_account(inputs)
	if (locale === "el") return __el.common_create_account(inputs)
	if (locale === "cs") return __cs.common_create_account(inputs)
	if (locale === "ro") return __ro.common_create_account(inputs)
	if (locale === "hu") return __hu.common_create_account(inputs)
	if (locale === "sv") return __sv.common_create_account(inputs)
	if (locale === "he") return __he.common_create_account(inputs)
	return __ru.common_create_account(inputs)
});
/**
* | output |
* | --- |
* | "Browse the map and listings without signing up. Log in for messages, favorites and posts." |
*
* @param {Common_Guest_CopyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_guest_copy = /** @type {((inputs?: Common_Guest_CopyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Guest_CopyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_guest_copy(inputs)
	if (locale === "fr") return __fr.common_guest_copy(inputs)
	if (locale === "es") return __es.common_guest_copy(inputs)
	if (locale === "zh") return __zh.common_guest_copy(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_guest_copy(inputs)
	if (locale === "hi") return __hi.common_guest_copy(inputs)
	if (locale === "ar") return __ar.common_guest_copy(inputs)
	if (locale === "pt") return __pt.common_guest_copy(inputs)
	if (locale === "de") return __de.common_guest_copy(inputs)
	if (locale === "ja") return __ja.common_guest_copy(inputs)
	if (locale === "ko") return __ko.common_guest_copy(inputs)
	if (locale === "it") return __it.common_guest_copy(inputs)
	if (locale === "tr") return __tr.common_guest_copy(inputs)
	if (locale === "pl") return __pl.common_guest_copy(inputs)
	if (locale === "uk") return __uk.common_guest_copy(inputs)
	if (locale === "nl") return __nl.common_guest_copy(inputs)
	if (locale === "vi") return __vi.common_guest_copy(inputs)
	if (locale === "id") return __id.common_guest_copy(inputs)
	if (locale === "ms") return __ms.common_guest_copy(inputs)
	if (locale === "th") return __th.common_guest_copy(inputs)
	if (locale === "fa") return __fa.common_guest_copy(inputs)
	if (locale === "ur") return __ur.common_guest_copy(inputs)
	if (locale === "bn") return __bn.common_guest_copy(inputs)
	if (locale === "pa") return __pa.common_guest_copy(inputs)
	if (locale === "sw") return __sw.common_guest_copy(inputs)
	if (locale === "el") return __el.common_guest_copy(inputs)
	if (locale === "cs") return __cs.common_guest_copy(inputs)
	if (locale === "ro") return __ro.common_guest_copy(inputs)
	if (locale === "hu") return __hu.common_guest_copy(inputs)
	if (locale === "sv") return __sv.common_guest_copy(inputs)
	if (locale === "he") return __he.common_guest_copy(inputs)
	return __ru.common_guest_copy(inputs)
});
/**
* | output |
* | --- |
* | "You are browsing as a guest" |
*
* @param {Common_Guest_ModeInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_guest_mode = /** @type {((inputs?: Common_Guest_ModeInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Guest_ModeInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_guest_mode(inputs)
	if (locale === "fr") return __fr.common_guest_mode(inputs)
	if (locale === "es") return __es.common_guest_mode(inputs)
	if (locale === "zh") return __zh.common_guest_mode(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_guest_mode(inputs)
	if (locale === "hi") return __hi.common_guest_mode(inputs)
	if (locale === "ar") return __ar.common_guest_mode(inputs)
	if (locale === "pt") return __pt.common_guest_mode(inputs)
	if (locale === "de") return __de.common_guest_mode(inputs)
	if (locale === "ja") return __ja.common_guest_mode(inputs)
	if (locale === "ko") return __ko.common_guest_mode(inputs)
	if (locale === "it") return __it.common_guest_mode(inputs)
	if (locale === "tr") return __tr.common_guest_mode(inputs)
	if (locale === "pl") return __pl.common_guest_mode(inputs)
	if (locale === "uk") return __uk.common_guest_mode(inputs)
	if (locale === "nl") return __nl.common_guest_mode(inputs)
	if (locale === "vi") return __vi.common_guest_mode(inputs)
	if (locale === "id") return __id.common_guest_mode(inputs)
	if (locale === "ms") return __ms.common_guest_mode(inputs)
	if (locale === "th") return __th.common_guest_mode(inputs)
	if (locale === "fa") return __fa.common_guest_mode(inputs)
	if (locale === "ur") return __ur.common_guest_mode(inputs)
	if (locale === "bn") return __bn.common_guest_mode(inputs)
	if (locale === "pa") return __pa.common_guest_mode(inputs)
	if (locale === "sw") return __sw.common_guest_mode(inputs)
	if (locale === "el") return __el.common_guest_mode(inputs)
	if (locale === "cs") return __cs.common_guest_mode(inputs)
	if (locale === "ro") return __ro.common_guest_mode(inputs)
	if (locale === "hu") return __hu.common_guest_mode(inputs)
	if (locale === "sv") return __sv.common_guest_mode(inputs)
	if (locale === "he") return __he.common_guest_mode(inputs)
	return __ru.common_guest_mode(inputs)
});
/**
* | output |
* | --- |
* | "Log in" |
*
* @param {Common_LoginInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_login = /** @type {((inputs?: Common_LoginInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_LoginInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_login(inputs)
	if (locale === "fr") return __fr.common_login(inputs)
	if (locale === "es") return __es.common_login(inputs)
	if (locale === "zh") return __zh.common_login(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_login(inputs)
	if (locale === "hi") return __hi.common_login(inputs)
	if (locale === "ar") return __ar.common_login(inputs)
	if (locale === "pt") return __pt.common_login(inputs)
	if (locale === "de") return __de.common_login(inputs)
	if (locale === "ja") return __ja.common_login(inputs)
	if (locale === "ko") return __ko.common_login(inputs)
	if (locale === "it") return __it.common_login(inputs)
	if (locale === "tr") return __tr.common_login(inputs)
	if (locale === "pl") return __pl.common_login(inputs)
	if (locale === "uk") return __uk.common_login(inputs)
	if (locale === "nl") return __nl.common_login(inputs)
	if (locale === "vi") return __vi.common_login(inputs)
	if (locale === "id") return __id.common_login(inputs)
	if (locale === "ms") return __ms.common_login(inputs)
	if (locale === "th") return __th.common_login(inputs)
	if (locale === "fa") return __fa.common_login(inputs)
	if (locale === "ur") return __ur.common_login(inputs)
	if (locale === "bn") return __bn.common_login(inputs)
	if (locale === "pa") return __pa.common_login(inputs)
	if (locale === "sw") return __sw.common_login(inputs)
	if (locale === "el") return __el.common_login(inputs)
	if (locale === "cs") return __cs.common_login(inputs)
	if (locale === "ro") return __ro.common_login(inputs)
	if (locale === "hu") return __hu.common_login(inputs)
	if (locale === "sv") return __sv.common_login(inputs)
	if (locale === "he") return __he.common_login(inputs)
	return __ru.common_login(inputs)
});
/**
* | output |
* | --- |
* | "Email and password" |
*
* @param {Common_Login_PasswordInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_login_password = /** @type {((inputs?: Common_Login_PasswordInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Login_PasswordInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_login_password(inputs)
	if (locale === "fr") return __fr.common_login_password(inputs)
	if (locale === "es") return __es.common_login_password(inputs)
	if (locale === "zh") return __zh.common_login_password(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_login_password(inputs)
	if (locale === "hi") return __hi.common_login_password(inputs)
	if (locale === "ar") return __ar.common_login_password(inputs)
	if (locale === "pt") return __pt.common_login_password(inputs)
	if (locale === "de") return __de.common_login_password(inputs)
	if (locale === "ja") return __ja.common_login_password(inputs)
	if (locale === "ko") return __ko.common_login_password(inputs)
	if (locale === "it") return __it.common_login_password(inputs)
	if (locale === "tr") return __tr.common_login_password(inputs)
	if (locale === "pl") return __pl.common_login_password(inputs)
	if (locale === "uk") return __uk.common_login_password(inputs)
	if (locale === "nl") return __nl.common_login_password(inputs)
	if (locale === "vi") return __vi.common_login_password(inputs)
	if (locale === "id") return __id.common_login_password(inputs)
	if (locale === "ms") return __ms.common_login_password(inputs)
	if (locale === "th") return __th.common_login_password(inputs)
	if (locale === "fa") return __fa.common_login_password(inputs)
	if (locale === "ur") return __ur.common_login_password(inputs)
	if (locale === "bn") return __bn.common_login_password(inputs)
	if (locale === "pa") return __pa.common_login_password(inputs)
	if (locale === "sw") return __sw.common_login_password(inputs)
	if (locale === "el") return __el.common_login_password(inputs)
	if (locale === "cs") return __cs.common_login_password(inputs)
	if (locale === "ro") return __ro.common_login_password(inputs)
	if (locale === "hu") return __hu.common_login_password(inputs)
	if (locale === "sv") return __sv.common_login_password(inputs)
	if (locale === "he") return __he.common_login_password(inputs)
	return __ru.common_login_password(inputs)
});
/**
* | output |
* | --- |
* | "Open profile" |
*
* @param {Common_Open_ProfileInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_open_profile = /** @type {((inputs?: Common_Open_ProfileInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Open_ProfileInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_open_profile(inputs)
	if (locale === "fr") return __fr.common_open_profile(inputs)
	if (locale === "es") return __es.common_open_profile(inputs)
	if (locale === "zh") return __zh.common_open_profile(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_open_profile(inputs)
	if (locale === "hi") return __hi.common_open_profile(inputs)
	if (locale === "ar") return __ar.common_open_profile(inputs)
	if (locale === "pt") return __pt.common_open_profile(inputs)
	if (locale === "de") return __de.common_open_profile(inputs)
	if (locale === "ja") return __ja.common_open_profile(inputs)
	if (locale === "ko") return __ko.common_open_profile(inputs)
	if (locale === "it") return __it.common_open_profile(inputs)
	if (locale === "tr") return __tr.common_open_profile(inputs)
	if (locale === "pl") return __pl.common_open_profile(inputs)
	if (locale === "uk") return __uk.common_open_profile(inputs)
	if (locale === "nl") return __nl.common_open_profile(inputs)
	if (locale === "vi") return __vi.common_open_profile(inputs)
	if (locale === "id") return __id.common_open_profile(inputs)
	if (locale === "ms") return __ms.common_open_profile(inputs)
	if (locale === "th") return __th.common_open_profile(inputs)
	if (locale === "fa") return __fa.common_open_profile(inputs)
	if (locale === "ur") return __ur.common_open_profile(inputs)
	if (locale === "bn") return __bn.common_open_profile(inputs)
	if (locale === "pa") return __pa.common_open_profile(inputs)
	if (locale === "sw") return __sw.common_open_profile(inputs)
	if (locale === "el") return __el.common_open_profile(inputs)
	if (locale === "cs") return __cs.common_open_profile(inputs)
	if (locale === "ro") return __ro.common_open_profile(inputs)
	if (locale === "hu") return __hu.common_open_profile(inputs)
	if (locale === "sv") return __sv.common_open_profile(inputs)
	if (locale === "he") return __he.common_open_profile(inputs)
	return __ru.common_open_profile(inputs)
});
/**
* | output |
* | --- |
* | "Privacy" |
*
* @param {Common_PrivacyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_privacy = /** @type {((inputs?: Common_PrivacyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_PrivacyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_privacy(inputs)
	if (locale === "fr") return __fr.common_privacy(inputs)
	if (locale === "es") return __es.common_privacy(inputs)
	if (locale === "zh") return __zh.common_privacy(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_privacy(inputs)
	if (locale === "hi") return __hi.common_privacy(inputs)
	if (locale === "ar") return __ar.common_privacy(inputs)
	if (locale === "pt") return __pt.common_privacy(inputs)
	if (locale === "de") return __de.common_privacy(inputs)
	if (locale === "ja") return __ja.common_privacy(inputs)
	if (locale === "ko") return __ko.common_privacy(inputs)
	if (locale === "it") return __it.common_privacy(inputs)
	if (locale === "tr") return __tr.common_privacy(inputs)
	if (locale === "pl") return __pl.common_privacy(inputs)
	if (locale === "uk") return __uk.common_privacy(inputs)
	if (locale === "nl") return __nl.common_privacy(inputs)
	if (locale === "vi") return __vi.common_privacy(inputs)
	if (locale === "id") return __id.common_privacy(inputs)
	if (locale === "ms") return __ms.common_privacy(inputs)
	if (locale === "th") return __th.common_privacy(inputs)
	if (locale === "fa") return __fa.common_privacy(inputs)
	if (locale === "ur") return __ur.common_privacy(inputs)
	if (locale === "bn") return __bn.common_privacy(inputs)
	if (locale === "pa") return __pa.common_privacy(inputs)
	if (locale === "sw") return __sw.common_privacy(inputs)
	if (locale === "el") return __el.common_privacy(inputs)
	if (locale === "cs") return __cs.common_privacy(inputs)
	if (locale === "ro") return __ro.common_privacy(inputs)
	if (locale === "hu") return __hu.common_privacy(inputs)
	if (locale === "sv") return __sv.common_privacy(inputs)
	if (locale === "he") return __he.common_privacy(inputs)
	return __ru.common_privacy(inputs)
});
/**
* | output |
* | --- |
* | "Profile" |
*
* @param {Common_ProfileInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_profile = /** @type {((inputs?: Common_ProfileInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ProfileInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_profile(inputs)
	if (locale === "fr") return __fr.common_profile(inputs)
	if (locale === "es") return __es.common_profile(inputs)
	if (locale === "zh") return __zh.common_profile(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_profile(inputs)
	if (locale === "hi") return __hi.common_profile(inputs)
	if (locale === "ar") return __ar.common_profile(inputs)
	if (locale === "pt") return __pt.common_profile(inputs)
	if (locale === "de") return __de.common_profile(inputs)
	if (locale === "ja") return __ja.common_profile(inputs)
	if (locale === "ko") return __ko.common_profile(inputs)
	if (locale === "it") return __it.common_profile(inputs)
	if (locale === "tr") return __tr.common_profile(inputs)
	if (locale === "pl") return __pl.common_profile(inputs)
	if (locale === "uk") return __uk.common_profile(inputs)
	if (locale === "nl") return __nl.common_profile(inputs)
	if (locale === "vi") return __vi.common_profile(inputs)
	if (locale === "id") return __id.common_profile(inputs)
	if (locale === "ms") return __ms.common_profile(inputs)
	if (locale === "th") return __th.common_profile(inputs)
	if (locale === "fa") return __fa.common_profile(inputs)
	if (locale === "ur") return __ur.common_profile(inputs)
	if (locale === "bn") return __bn.common_profile(inputs)
	if (locale === "pa") return __pa.common_profile(inputs)
	if (locale === "sw") return __sw.common_profile(inputs)
	if (locale === "el") return __el.common_profile(inputs)
	if (locale === "cs") return __cs.common_profile(inputs)
	if (locale === "ro") return __ro.common_profile(inputs)
	if (locale === "hu") return __hu.common_profile(inputs)
	if (locale === "sv") return __sv.common_profile(inputs)
	if (locale === "he") return __he.common_profile(inputs)
	return __ru.common_profile(inputs)
});
/**
* | output |
* | --- |
* | "Sign up" |
*
* @param {Common_RegisterInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_register = /** @type {((inputs?: Common_RegisterInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_RegisterInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_register(inputs)
	if (locale === "fr") return __fr.common_register(inputs)
	if (locale === "es") return __es.common_register(inputs)
	if (locale === "zh") return __zh.common_register(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_register(inputs)
	if (locale === "hi") return __hi.common_register(inputs)
	if (locale === "ar") return __ar.common_register(inputs)
	if (locale === "pt") return __pt.common_register(inputs)
	if (locale === "de") return __de.common_register(inputs)
	if (locale === "ja") return __ja.common_register(inputs)
	if (locale === "ko") return __ko.common_register(inputs)
	if (locale === "it") return __it.common_register(inputs)
	if (locale === "tr") return __tr.common_register(inputs)
	if (locale === "pl") return __pl.common_register(inputs)
	if (locale === "uk") return __uk.common_register(inputs)
	if (locale === "nl") return __nl.common_register(inputs)
	if (locale === "vi") return __vi.common_register(inputs)
	if (locale === "id") return __id.common_register(inputs)
	if (locale === "ms") return __ms.common_register(inputs)
	if (locale === "th") return __th.common_register(inputs)
	if (locale === "fa") return __fa.common_register(inputs)
	if (locale === "ur") return __ur.common_register(inputs)
	if (locale === "bn") return __bn.common_register(inputs)
	if (locale === "pa") return __pa.common_register(inputs)
	if (locale === "sw") return __sw.common_register(inputs)
	if (locale === "el") return __el.common_register(inputs)
	if (locale === "cs") return __cs.common_register(inputs)
	if (locale === "ro") return __ro.common_register(inputs)
	if (locale === "hu") return __hu.common_register(inputs)
	if (locale === "sv") return __sv.common_register(inputs)
	if (locale === "he") return __he.common_register(inputs)
	return __ru.common_register(inputs)
});
/**
* | output |
* | --- |
* | "Rules" |
*
* @param {Common_RulesInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_rules = /** @type {((inputs?: Common_RulesInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_RulesInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_rules(inputs)
	if (locale === "fr") return __fr.common_rules(inputs)
	if (locale === "es") return __es.common_rules(inputs)
	if (locale === "zh") return __zh.common_rules(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_rules(inputs)
	if (locale === "hi") return __hi.common_rules(inputs)
	if (locale === "ar") return __ar.common_rules(inputs)
	if (locale === "pt") return __pt.common_rules(inputs)
	if (locale === "de") return __de.common_rules(inputs)
	if (locale === "ja") return __ja.common_rules(inputs)
	if (locale === "ko") return __ko.common_rules(inputs)
	if (locale === "it") return __it.common_rules(inputs)
	if (locale === "tr") return __tr.common_rules(inputs)
	if (locale === "pl") return __pl.common_rules(inputs)
	if (locale === "uk") return __uk.common_rules(inputs)
	if (locale === "nl") return __nl.common_rules(inputs)
	if (locale === "vi") return __vi.common_rules(inputs)
	if (locale === "id") return __id.common_rules(inputs)
	if (locale === "ms") return __ms.common_rules(inputs)
	if (locale === "th") return __th.common_rules(inputs)
	if (locale === "fa") return __fa.common_rules(inputs)
	if (locale === "ur") return __ur.common_rules(inputs)
	if (locale === "bn") return __bn.common_rules(inputs)
	if (locale === "pa") return __pa.common_rules(inputs)
	if (locale === "sw") return __sw.common_rules(inputs)
	if (locale === "el") return __el.common_rules(inputs)
	if (locale === "cs") return __cs.common_rules(inputs)
	if (locale === "ro") return __ro.common_rules(inputs)
	if (locale === "hu") return __hu.common_rules(inputs)
	if (locale === "sv") return __sv.common_rules(inputs)
	if (locale === "he") return __he.common_rules(inputs)
	return __ru.common_rules(inputs)
});
/**
* | output |
* | --- |
* | "To the map" |
*
* @param {Common_To_MapInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_to_map = /** @type {((inputs?: Common_To_MapInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_To_MapInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_to_map(inputs)
	if (locale === "fr") return __fr.common_to_map(inputs)
	if (locale === "es") return __es.common_to_map(inputs)
	if (locale === "zh") return __zh.common_to_map(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_to_map(inputs)
	if (locale === "hi") return __hi.common_to_map(inputs)
	if (locale === "ar") return __ar.common_to_map(inputs)
	if (locale === "pt") return __pt.common_to_map(inputs)
	if (locale === "de") return __de.common_to_map(inputs)
	if (locale === "ja") return __ja.common_to_map(inputs)
	if (locale === "ko") return __ko.common_to_map(inputs)
	if (locale === "it") return __it.common_to_map(inputs)
	if (locale === "tr") return __tr.common_to_map(inputs)
	if (locale === "pl") return __pl.common_to_map(inputs)
	if (locale === "uk") return __uk.common_to_map(inputs)
	if (locale === "nl") return __nl.common_to_map(inputs)
	if (locale === "vi") return __vi.common_to_map(inputs)
	if (locale === "id") return __id.common_to_map(inputs)
	if (locale === "ms") return __ms.common_to_map(inputs)
	if (locale === "th") return __th.common_to_map(inputs)
	if (locale === "fa") return __fa.common_to_map(inputs)
	if (locale === "ur") return __ur.common_to_map(inputs)
	if (locale === "bn") return __bn.common_to_map(inputs)
	if (locale === "pa") return __pa.common_to_map(inputs)
	if (locale === "sw") return __sw.common_to_map(inputs)
	if (locale === "el") return __el.common_to_map(inputs)
	if (locale === "cs") return __cs.common_to_map(inputs)
	if (locale === "ro") return __ro.common_to_map(inputs)
	if (locale === "hu") return __hu.common_to_map(inputs)
	if (locale === "sv") return __sv.common_to_map(inputs)
	if (locale === "he") return __he.common_to_map(inputs)
	return __ru.common_to_map(inputs)
});
/**
* | output |
* | --- |
* | "App version" |
*
* @param {Footer_AriaInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const footer_aria = /** @type {((inputs?: Footer_AriaInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Footer_AriaInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.footer_aria(inputs)
	if (locale === "fr") return __fr.footer_aria(inputs)
	if (locale === "es") return __es.footer_aria(inputs)
	if (locale === "zh") return __zh.footer_aria(inputs)
	if (locale === "zh-TW") return __zh_tw2.footer_aria(inputs)
	if (locale === "hi") return __hi.footer_aria(inputs)
	if (locale === "ar") return __ar.footer_aria(inputs)
	if (locale === "pt") return __pt.footer_aria(inputs)
	if (locale === "de") return __de.footer_aria(inputs)
	if (locale === "ja") return __ja.footer_aria(inputs)
	if (locale === "ko") return __ko.footer_aria(inputs)
	if (locale === "it") return __it.footer_aria(inputs)
	if (locale === "tr") return __tr.footer_aria(inputs)
	if (locale === "pl") return __pl.footer_aria(inputs)
	if (locale === "uk") return __uk.footer_aria(inputs)
	if (locale === "nl") return __nl.footer_aria(inputs)
	if (locale === "vi") return __vi.footer_aria(inputs)
	if (locale === "id") return __id.footer_aria(inputs)
	if (locale === "ms") return __ms.footer_aria(inputs)
	if (locale === "th") return __th.footer_aria(inputs)
	if (locale === "fa") return __fa.footer_aria(inputs)
	if (locale === "ur") return __ur.footer_aria(inputs)
	if (locale === "bn") return __bn.footer_aria(inputs)
	if (locale === "pa") return __pa.footer_aria(inputs)
	if (locale === "sw") return __sw.footer_aria(inputs)
	if (locale === "el") return __el.footer_aria(inputs)
	if (locale === "cs") return __cs.footer_aria(inputs)
	if (locale === "ro") return __ro.footer_aria(inputs)
	if (locale === "hu") return __hu.footer_aria(inputs)
	if (locale === "sv") return __sv.footer_aria(inputs)
	if (locale === "he") return __he.footer_aria(inputs)
	return __ru.footer_aria(inputs)
});
/**
* | output |
* | --- |
* | "العربية" |
*
* @param {Lang_ArInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_ar = /** @type {((inputs?: Lang_ArInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_ArInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_ar(inputs)
	if (locale === "fr") return __fr.lang_ar(inputs)
	if (locale === "es") return __es.lang_ar(inputs)
	if (locale === "zh") return __zh.lang_ar(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_ar(inputs)
	if (locale === "hi") return __hi.lang_ar(inputs)
	if (locale === "ar") return __ar.lang_ar(inputs)
	if (locale === "pt") return __pt.lang_ar(inputs)
	if (locale === "de") return __de.lang_ar(inputs)
	if (locale === "ja") return __ja.lang_ar(inputs)
	if (locale === "ko") return __ko.lang_ar(inputs)
	if (locale === "it") return __it.lang_ar(inputs)
	if (locale === "tr") return __tr.lang_ar(inputs)
	if (locale === "pl") return __pl.lang_ar(inputs)
	if (locale === "uk") return __uk.lang_ar(inputs)
	if (locale === "nl") return __nl.lang_ar(inputs)
	if (locale === "vi") return __vi.lang_ar(inputs)
	if (locale === "id") return __id.lang_ar(inputs)
	if (locale === "ms") return __ms.lang_ar(inputs)
	if (locale === "th") return __th.lang_ar(inputs)
	if (locale === "fa") return __fa.lang_ar(inputs)
	if (locale === "ur") return __ur.lang_ar(inputs)
	if (locale === "bn") return __bn.lang_ar(inputs)
	if (locale === "pa") return __pa.lang_ar(inputs)
	if (locale === "sw") return __sw.lang_ar(inputs)
	if (locale === "el") return __el.lang_ar(inputs)
	if (locale === "cs") return __cs.lang_ar(inputs)
	if (locale === "ro") return __ro.lang_ar(inputs)
	if (locale === "hu") return __hu.lang_ar(inputs)
	if (locale === "sv") return __sv.lang_ar(inputs)
	if (locale === "he") return __he.lang_ar(inputs)
	return __ru.lang_ar(inputs)
});
/**
* | output |
* | --- |
* | "বাংলা" |
*
* @param {Lang_BnInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_bn = /** @type {((inputs?: Lang_BnInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_BnInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_bn(inputs)
	if (locale === "fr") return __fr.lang_bn(inputs)
	if (locale === "es") return __es.lang_bn(inputs)
	if (locale === "zh") return __zh.lang_bn(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_bn(inputs)
	if (locale === "hi") return __hi.lang_bn(inputs)
	if (locale === "ar") return __ar.lang_bn(inputs)
	if (locale === "pt") return __pt.lang_bn(inputs)
	if (locale === "de") return __de.lang_bn(inputs)
	if (locale === "ja") return __ja.lang_bn(inputs)
	if (locale === "ko") return __ko.lang_bn(inputs)
	if (locale === "it") return __it.lang_bn(inputs)
	if (locale === "tr") return __tr.lang_bn(inputs)
	if (locale === "pl") return __pl.lang_bn(inputs)
	if (locale === "uk") return __uk.lang_bn(inputs)
	if (locale === "nl") return __nl.lang_bn(inputs)
	if (locale === "vi") return __vi.lang_bn(inputs)
	if (locale === "id") return __id.lang_bn(inputs)
	if (locale === "ms") return __ms.lang_bn(inputs)
	if (locale === "th") return __th.lang_bn(inputs)
	if (locale === "fa") return __fa.lang_bn(inputs)
	if (locale === "ur") return __ur.lang_bn(inputs)
	if (locale === "bn") return __bn.lang_bn(inputs)
	if (locale === "pa") return __pa.lang_bn(inputs)
	if (locale === "sw") return __sw.lang_bn(inputs)
	if (locale === "el") return __el.lang_bn(inputs)
	if (locale === "cs") return __cs.lang_bn(inputs)
	if (locale === "ro") return __ro.lang_bn(inputs)
	if (locale === "hu") return __hu.lang_bn(inputs)
	if (locale === "sv") return __sv.lang_bn(inputs)
	if (locale === "he") return __he.lang_bn(inputs)
	return __ru.lang_bn(inputs)
});
/**
* | output |
* | --- |
* | "Čeština" |
*
* @param {Lang_CsInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_cs = /** @type {((inputs?: Lang_CsInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_CsInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_cs(inputs)
	if (locale === "fr") return __fr.lang_cs(inputs)
	if (locale === "es") return __es.lang_cs(inputs)
	if (locale === "zh") return __zh.lang_cs(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_cs(inputs)
	if (locale === "hi") return __hi.lang_cs(inputs)
	if (locale === "ar") return __ar.lang_cs(inputs)
	if (locale === "pt") return __pt.lang_cs(inputs)
	if (locale === "de") return __de.lang_cs(inputs)
	if (locale === "ja") return __ja.lang_cs(inputs)
	if (locale === "ko") return __ko.lang_cs(inputs)
	if (locale === "it") return __it.lang_cs(inputs)
	if (locale === "tr") return __tr.lang_cs(inputs)
	if (locale === "pl") return __pl.lang_cs(inputs)
	if (locale === "uk") return __uk.lang_cs(inputs)
	if (locale === "nl") return __nl.lang_cs(inputs)
	if (locale === "vi") return __vi.lang_cs(inputs)
	if (locale === "id") return __id.lang_cs(inputs)
	if (locale === "ms") return __ms.lang_cs(inputs)
	if (locale === "th") return __th.lang_cs(inputs)
	if (locale === "fa") return __fa.lang_cs(inputs)
	if (locale === "ur") return __ur.lang_cs(inputs)
	if (locale === "bn") return __bn.lang_cs(inputs)
	if (locale === "pa") return __pa.lang_cs(inputs)
	if (locale === "sw") return __sw.lang_cs(inputs)
	if (locale === "el") return __el.lang_cs(inputs)
	if (locale === "cs") return __cs.lang_cs(inputs)
	if (locale === "ro") return __ro.lang_cs(inputs)
	if (locale === "hu") return __hu.lang_cs(inputs)
	if (locale === "sv") return __sv.lang_cs(inputs)
	if (locale === "he") return __he.lang_cs(inputs)
	return __ru.lang_cs(inputs)
});
/**
* | output |
* | --- |
* | "Deutsch" |
*
* @param {Lang_DeInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_de = /** @type {((inputs?: Lang_DeInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_DeInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_de(inputs)
	if (locale === "fr") return __fr.lang_de(inputs)
	if (locale === "es") return __es.lang_de(inputs)
	if (locale === "zh") return __zh.lang_de(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_de(inputs)
	if (locale === "hi") return __hi.lang_de(inputs)
	if (locale === "ar") return __ar.lang_de(inputs)
	if (locale === "pt") return __pt.lang_de(inputs)
	if (locale === "de") return __de.lang_de(inputs)
	if (locale === "ja") return __ja.lang_de(inputs)
	if (locale === "ko") return __ko.lang_de(inputs)
	if (locale === "it") return __it.lang_de(inputs)
	if (locale === "tr") return __tr.lang_de(inputs)
	if (locale === "pl") return __pl.lang_de(inputs)
	if (locale === "uk") return __uk.lang_de(inputs)
	if (locale === "nl") return __nl.lang_de(inputs)
	if (locale === "vi") return __vi.lang_de(inputs)
	if (locale === "id") return __id.lang_de(inputs)
	if (locale === "ms") return __ms.lang_de(inputs)
	if (locale === "th") return __th.lang_de(inputs)
	if (locale === "fa") return __fa.lang_de(inputs)
	if (locale === "ur") return __ur.lang_de(inputs)
	if (locale === "bn") return __bn.lang_de(inputs)
	if (locale === "pa") return __pa.lang_de(inputs)
	if (locale === "sw") return __sw.lang_de(inputs)
	if (locale === "el") return __el.lang_de(inputs)
	if (locale === "cs") return __cs.lang_de(inputs)
	if (locale === "ro") return __ro.lang_de(inputs)
	if (locale === "hu") return __hu.lang_de(inputs)
	if (locale === "sv") return __sv.lang_de(inputs)
	if (locale === "he") return __he.lang_de(inputs)
	return __ru.lang_de(inputs)
});
/**
* | output |
* | --- |
* | "Ελληνικά" |
*
* @param {Lang_ElInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_el = /** @type {((inputs?: Lang_ElInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_ElInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_el(inputs)
	if (locale === "fr") return __fr.lang_el(inputs)
	if (locale === "es") return __es.lang_el(inputs)
	if (locale === "zh") return __zh.lang_el(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_el(inputs)
	if (locale === "hi") return __hi.lang_el(inputs)
	if (locale === "ar") return __ar.lang_el(inputs)
	if (locale === "pt") return __pt.lang_el(inputs)
	if (locale === "de") return __de.lang_el(inputs)
	if (locale === "ja") return __ja.lang_el(inputs)
	if (locale === "ko") return __ko.lang_el(inputs)
	if (locale === "it") return __it.lang_el(inputs)
	if (locale === "tr") return __tr.lang_el(inputs)
	if (locale === "pl") return __pl.lang_el(inputs)
	if (locale === "uk") return __uk.lang_el(inputs)
	if (locale === "nl") return __nl.lang_el(inputs)
	if (locale === "vi") return __vi.lang_el(inputs)
	if (locale === "id") return __id.lang_el(inputs)
	if (locale === "ms") return __ms.lang_el(inputs)
	if (locale === "th") return __th.lang_el(inputs)
	if (locale === "fa") return __fa.lang_el(inputs)
	if (locale === "ur") return __ur.lang_el(inputs)
	if (locale === "bn") return __bn.lang_el(inputs)
	if (locale === "pa") return __pa.lang_el(inputs)
	if (locale === "sw") return __sw.lang_el(inputs)
	if (locale === "el") return __el.lang_el(inputs)
	if (locale === "cs") return __cs.lang_el(inputs)
	if (locale === "ro") return __ro.lang_el(inputs)
	if (locale === "hu") return __hu.lang_el(inputs)
	if (locale === "sv") return __sv.lang_el(inputs)
	if (locale === "he") return __he.lang_el(inputs)
	return __ru.lang_el(inputs)
});
/**
* | output |
* | --- |
* | "English" |
*
* @param {Lang_EnInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_en = /** @type {((inputs?: Lang_EnInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_EnInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_en(inputs)
	if (locale === "fr") return __fr.lang_en(inputs)
	if (locale === "es") return __es.lang_en(inputs)
	if (locale === "zh") return __zh.lang_en(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_en(inputs)
	if (locale === "hi") return __hi.lang_en(inputs)
	if (locale === "ar") return __ar.lang_en(inputs)
	if (locale === "pt") return __pt.lang_en(inputs)
	if (locale === "de") return __de.lang_en(inputs)
	if (locale === "ja") return __ja.lang_en(inputs)
	if (locale === "ko") return __ko.lang_en(inputs)
	if (locale === "it") return __it.lang_en(inputs)
	if (locale === "tr") return __tr.lang_en(inputs)
	if (locale === "pl") return __pl.lang_en(inputs)
	if (locale === "uk") return __uk.lang_en(inputs)
	if (locale === "nl") return __nl.lang_en(inputs)
	if (locale === "vi") return __vi.lang_en(inputs)
	if (locale === "id") return __id.lang_en(inputs)
	if (locale === "ms") return __ms.lang_en(inputs)
	if (locale === "th") return __th.lang_en(inputs)
	if (locale === "fa") return __fa.lang_en(inputs)
	if (locale === "ur") return __ur.lang_en(inputs)
	if (locale === "bn") return __bn.lang_en(inputs)
	if (locale === "pa") return __pa.lang_en(inputs)
	if (locale === "sw") return __sw.lang_en(inputs)
	if (locale === "el") return __el.lang_en(inputs)
	if (locale === "cs") return __cs.lang_en(inputs)
	if (locale === "ro") return __ro.lang_en(inputs)
	if (locale === "hu") return __hu.lang_en(inputs)
	if (locale === "sv") return __sv.lang_en(inputs)
	if (locale === "he") return __he.lang_en(inputs)
	return __ru.lang_en(inputs)
});
/**
* | output |
* | --- |
* | "Español" |
*
* @param {Lang_EsInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_es = /** @type {((inputs?: Lang_EsInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_EsInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_es(inputs)
	if (locale === "fr") return __fr.lang_es(inputs)
	if (locale === "es") return __es.lang_es(inputs)
	if (locale === "zh") return __zh.lang_es(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_es(inputs)
	if (locale === "hi") return __hi.lang_es(inputs)
	if (locale === "ar") return __ar.lang_es(inputs)
	if (locale === "pt") return __pt.lang_es(inputs)
	if (locale === "de") return __de.lang_es(inputs)
	if (locale === "ja") return __ja.lang_es(inputs)
	if (locale === "ko") return __ko.lang_es(inputs)
	if (locale === "it") return __it.lang_es(inputs)
	if (locale === "tr") return __tr.lang_es(inputs)
	if (locale === "pl") return __pl.lang_es(inputs)
	if (locale === "uk") return __uk.lang_es(inputs)
	if (locale === "nl") return __nl.lang_es(inputs)
	if (locale === "vi") return __vi.lang_es(inputs)
	if (locale === "id") return __id.lang_es(inputs)
	if (locale === "ms") return __ms.lang_es(inputs)
	if (locale === "th") return __th.lang_es(inputs)
	if (locale === "fa") return __fa.lang_es(inputs)
	if (locale === "ur") return __ur.lang_es(inputs)
	if (locale === "bn") return __bn.lang_es(inputs)
	if (locale === "pa") return __pa.lang_es(inputs)
	if (locale === "sw") return __sw.lang_es(inputs)
	if (locale === "el") return __el.lang_es(inputs)
	if (locale === "cs") return __cs.lang_es(inputs)
	if (locale === "ro") return __ro.lang_es(inputs)
	if (locale === "hu") return __hu.lang_es(inputs)
	if (locale === "sv") return __sv.lang_es(inputs)
	if (locale === "he") return __he.lang_es(inputs)
	return __ru.lang_es(inputs)
});
/**
* | output |
* | --- |
* | "فارسی" |
*
* @param {Lang_FaInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_fa = /** @type {((inputs?: Lang_FaInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_FaInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_fa(inputs)
	if (locale === "fr") return __fr.lang_fa(inputs)
	if (locale === "es") return __es.lang_fa(inputs)
	if (locale === "zh") return __zh.lang_fa(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_fa(inputs)
	if (locale === "hi") return __hi.lang_fa(inputs)
	if (locale === "ar") return __ar.lang_fa(inputs)
	if (locale === "pt") return __pt.lang_fa(inputs)
	if (locale === "de") return __de.lang_fa(inputs)
	if (locale === "ja") return __ja.lang_fa(inputs)
	if (locale === "ko") return __ko.lang_fa(inputs)
	if (locale === "it") return __it.lang_fa(inputs)
	if (locale === "tr") return __tr.lang_fa(inputs)
	if (locale === "pl") return __pl.lang_fa(inputs)
	if (locale === "uk") return __uk.lang_fa(inputs)
	if (locale === "nl") return __nl.lang_fa(inputs)
	if (locale === "vi") return __vi.lang_fa(inputs)
	if (locale === "id") return __id.lang_fa(inputs)
	if (locale === "ms") return __ms.lang_fa(inputs)
	if (locale === "th") return __th.lang_fa(inputs)
	if (locale === "fa") return __fa.lang_fa(inputs)
	if (locale === "ur") return __ur.lang_fa(inputs)
	if (locale === "bn") return __bn.lang_fa(inputs)
	if (locale === "pa") return __pa.lang_fa(inputs)
	if (locale === "sw") return __sw.lang_fa(inputs)
	if (locale === "el") return __el.lang_fa(inputs)
	if (locale === "cs") return __cs.lang_fa(inputs)
	if (locale === "ro") return __ro.lang_fa(inputs)
	if (locale === "hu") return __hu.lang_fa(inputs)
	if (locale === "sv") return __sv.lang_fa(inputs)
	if (locale === "he") return __he.lang_fa(inputs)
	return __ru.lang_fa(inputs)
});
/**
* | output |
* | --- |
* | "Français" |
*
* @param {Lang_FrInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_fr = /** @type {((inputs?: Lang_FrInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_FrInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_fr(inputs)
	if (locale === "fr") return __fr.lang_fr(inputs)
	if (locale === "es") return __es.lang_fr(inputs)
	if (locale === "zh") return __zh.lang_fr(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_fr(inputs)
	if (locale === "hi") return __hi.lang_fr(inputs)
	if (locale === "ar") return __ar.lang_fr(inputs)
	if (locale === "pt") return __pt.lang_fr(inputs)
	if (locale === "de") return __de.lang_fr(inputs)
	if (locale === "ja") return __ja.lang_fr(inputs)
	if (locale === "ko") return __ko.lang_fr(inputs)
	if (locale === "it") return __it.lang_fr(inputs)
	if (locale === "tr") return __tr.lang_fr(inputs)
	if (locale === "pl") return __pl.lang_fr(inputs)
	if (locale === "uk") return __uk.lang_fr(inputs)
	if (locale === "nl") return __nl.lang_fr(inputs)
	if (locale === "vi") return __vi.lang_fr(inputs)
	if (locale === "id") return __id.lang_fr(inputs)
	if (locale === "ms") return __ms.lang_fr(inputs)
	if (locale === "th") return __th.lang_fr(inputs)
	if (locale === "fa") return __fa.lang_fr(inputs)
	if (locale === "ur") return __ur.lang_fr(inputs)
	if (locale === "bn") return __bn.lang_fr(inputs)
	if (locale === "pa") return __pa.lang_fr(inputs)
	if (locale === "sw") return __sw.lang_fr(inputs)
	if (locale === "el") return __el.lang_fr(inputs)
	if (locale === "cs") return __cs.lang_fr(inputs)
	if (locale === "ro") return __ro.lang_fr(inputs)
	if (locale === "hu") return __hu.lang_fr(inputs)
	if (locale === "sv") return __sv.lang_fr(inputs)
	if (locale === "he") return __he.lang_fr(inputs)
	return __ru.lang_fr(inputs)
});
/**
* | output |
* | --- |
* | "עברית" |
*
* @param {Lang_HeInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_he = /** @type {((inputs?: Lang_HeInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_HeInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_he(inputs)
	if (locale === "fr") return __fr.lang_he(inputs)
	if (locale === "es") return __es.lang_he(inputs)
	if (locale === "zh") return __zh.lang_he(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_he(inputs)
	if (locale === "hi") return __hi.lang_he(inputs)
	if (locale === "ar") return __ar.lang_he(inputs)
	if (locale === "pt") return __pt.lang_he(inputs)
	if (locale === "de") return __de.lang_he(inputs)
	if (locale === "ja") return __ja.lang_he(inputs)
	if (locale === "ko") return __ko.lang_he(inputs)
	if (locale === "it") return __it.lang_he(inputs)
	if (locale === "tr") return __tr.lang_he(inputs)
	if (locale === "pl") return __pl.lang_he(inputs)
	if (locale === "uk") return __uk.lang_he(inputs)
	if (locale === "nl") return __nl.lang_he(inputs)
	if (locale === "vi") return __vi.lang_he(inputs)
	if (locale === "id") return __id.lang_he(inputs)
	if (locale === "ms") return __ms.lang_he(inputs)
	if (locale === "th") return __th.lang_he(inputs)
	if (locale === "fa") return __fa.lang_he(inputs)
	if (locale === "ur") return __ur.lang_he(inputs)
	if (locale === "bn") return __bn.lang_he(inputs)
	if (locale === "pa") return __pa.lang_he(inputs)
	if (locale === "sw") return __sw.lang_he(inputs)
	if (locale === "el") return __el.lang_he(inputs)
	if (locale === "cs") return __cs.lang_he(inputs)
	if (locale === "ro") return __ro.lang_he(inputs)
	if (locale === "hu") return __hu.lang_he(inputs)
	if (locale === "sv") return __sv.lang_he(inputs)
	if (locale === "he") return __he.lang_he(inputs)
	return __ru.lang_he(inputs)
});
/**
* | output |
* | --- |
* | "हिन्दी" |
*
* @param {Lang_HiInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_hi = /** @type {((inputs?: Lang_HiInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_HiInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_hi(inputs)
	if (locale === "fr") return __fr.lang_hi(inputs)
	if (locale === "es") return __es.lang_hi(inputs)
	if (locale === "zh") return __zh.lang_hi(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_hi(inputs)
	if (locale === "hi") return __hi.lang_hi(inputs)
	if (locale === "ar") return __ar.lang_hi(inputs)
	if (locale === "pt") return __pt.lang_hi(inputs)
	if (locale === "de") return __de.lang_hi(inputs)
	if (locale === "ja") return __ja.lang_hi(inputs)
	if (locale === "ko") return __ko.lang_hi(inputs)
	if (locale === "it") return __it.lang_hi(inputs)
	if (locale === "tr") return __tr.lang_hi(inputs)
	if (locale === "pl") return __pl.lang_hi(inputs)
	if (locale === "uk") return __uk.lang_hi(inputs)
	if (locale === "nl") return __nl.lang_hi(inputs)
	if (locale === "vi") return __vi.lang_hi(inputs)
	if (locale === "id") return __id.lang_hi(inputs)
	if (locale === "ms") return __ms.lang_hi(inputs)
	if (locale === "th") return __th.lang_hi(inputs)
	if (locale === "fa") return __fa.lang_hi(inputs)
	if (locale === "ur") return __ur.lang_hi(inputs)
	if (locale === "bn") return __bn.lang_hi(inputs)
	if (locale === "pa") return __pa.lang_hi(inputs)
	if (locale === "sw") return __sw.lang_hi(inputs)
	if (locale === "el") return __el.lang_hi(inputs)
	if (locale === "cs") return __cs.lang_hi(inputs)
	if (locale === "ro") return __ro.lang_hi(inputs)
	if (locale === "hu") return __hu.lang_hi(inputs)
	if (locale === "sv") return __sv.lang_hi(inputs)
	if (locale === "he") return __he.lang_hi(inputs)
	return __ru.lang_hi(inputs)
});
/**
* | output |
* | --- |
* | "Magyar" |
*
* @param {Lang_HuInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_hu = /** @type {((inputs?: Lang_HuInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_HuInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_hu(inputs)
	if (locale === "fr") return __fr.lang_hu(inputs)
	if (locale === "es") return __es.lang_hu(inputs)
	if (locale === "zh") return __zh.lang_hu(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_hu(inputs)
	if (locale === "hi") return __hi.lang_hu(inputs)
	if (locale === "ar") return __ar.lang_hu(inputs)
	if (locale === "pt") return __pt.lang_hu(inputs)
	if (locale === "de") return __de.lang_hu(inputs)
	if (locale === "ja") return __ja.lang_hu(inputs)
	if (locale === "ko") return __ko.lang_hu(inputs)
	if (locale === "it") return __it.lang_hu(inputs)
	if (locale === "tr") return __tr.lang_hu(inputs)
	if (locale === "pl") return __pl.lang_hu(inputs)
	if (locale === "uk") return __uk.lang_hu(inputs)
	if (locale === "nl") return __nl.lang_hu(inputs)
	if (locale === "vi") return __vi.lang_hu(inputs)
	if (locale === "id") return __id.lang_hu(inputs)
	if (locale === "ms") return __ms.lang_hu(inputs)
	if (locale === "th") return __th.lang_hu(inputs)
	if (locale === "fa") return __fa.lang_hu(inputs)
	if (locale === "ur") return __ur.lang_hu(inputs)
	if (locale === "bn") return __bn.lang_hu(inputs)
	if (locale === "pa") return __pa.lang_hu(inputs)
	if (locale === "sw") return __sw.lang_hu(inputs)
	if (locale === "el") return __el.lang_hu(inputs)
	if (locale === "cs") return __cs.lang_hu(inputs)
	if (locale === "ro") return __ro.lang_hu(inputs)
	if (locale === "hu") return __hu.lang_hu(inputs)
	if (locale === "sv") return __sv.lang_hu(inputs)
	if (locale === "he") return __he.lang_hu(inputs)
	return __ru.lang_hu(inputs)
});
/**
* | output |
* | --- |
* | "Bahasa Indonesia" |
*
* @param {Lang_IdInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_id = /** @type {((inputs?: Lang_IdInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_IdInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_id(inputs)
	if (locale === "fr") return __fr.lang_id(inputs)
	if (locale === "es") return __es.lang_id(inputs)
	if (locale === "zh") return __zh.lang_id(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_id(inputs)
	if (locale === "hi") return __hi.lang_id(inputs)
	if (locale === "ar") return __ar.lang_id(inputs)
	if (locale === "pt") return __pt.lang_id(inputs)
	if (locale === "de") return __de.lang_id(inputs)
	if (locale === "ja") return __ja.lang_id(inputs)
	if (locale === "ko") return __ko.lang_id(inputs)
	if (locale === "it") return __it.lang_id(inputs)
	if (locale === "tr") return __tr.lang_id(inputs)
	if (locale === "pl") return __pl.lang_id(inputs)
	if (locale === "uk") return __uk.lang_id(inputs)
	if (locale === "nl") return __nl.lang_id(inputs)
	if (locale === "vi") return __vi.lang_id(inputs)
	if (locale === "id") return __id.lang_id(inputs)
	if (locale === "ms") return __ms.lang_id(inputs)
	if (locale === "th") return __th.lang_id(inputs)
	if (locale === "fa") return __fa.lang_id(inputs)
	if (locale === "ur") return __ur.lang_id(inputs)
	if (locale === "bn") return __bn.lang_id(inputs)
	if (locale === "pa") return __pa.lang_id(inputs)
	if (locale === "sw") return __sw.lang_id(inputs)
	if (locale === "el") return __el.lang_id(inputs)
	if (locale === "cs") return __cs.lang_id(inputs)
	if (locale === "ro") return __ro.lang_id(inputs)
	if (locale === "hu") return __hu.lang_id(inputs)
	if (locale === "sv") return __sv.lang_id(inputs)
	if (locale === "he") return __he.lang_id(inputs)
	return __ru.lang_id(inputs)
});
/**
* | output |
* | --- |
* | "Italiano" |
*
* @param {Lang_ItInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_it = /** @type {((inputs?: Lang_ItInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_ItInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_it(inputs)
	if (locale === "fr") return __fr.lang_it(inputs)
	if (locale === "es") return __es.lang_it(inputs)
	if (locale === "zh") return __zh.lang_it(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_it(inputs)
	if (locale === "hi") return __hi.lang_it(inputs)
	if (locale === "ar") return __ar.lang_it(inputs)
	if (locale === "pt") return __pt.lang_it(inputs)
	if (locale === "de") return __de.lang_it(inputs)
	if (locale === "ja") return __ja.lang_it(inputs)
	if (locale === "ko") return __ko.lang_it(inputs)
	if (locale === "it") return __it.lang_it(inputs)
	if (locale === "tr") return __tr.lang_it(inputs)
	if (locale === "pl") return __pl.lang_it(inputs)
	if (locale === "uk") return __uk.lang_it(inputs)
	if (locale === "nl") return __nl.lang_it(inputs)
	if (locale === "vi") return __vi.lang_it(inputs)
	if (locale === "id") return __id.lang_it(inputs)
	if (locale === "ms") return __ms.lang_it(inputs)
	if (locale === "th") return __th.lang_it(inputs)
	if (locale === "fa") return __fa.lang_it(inputs)
	if (locale === "ur") return __ur.lang_it(inputs)
	if (locale === "bn") return __bn.lang_it(inputs)
	if (locale === "pa") return __pa.lang_it(inputs)
	if (locale === "sw") return __sw.lang_it(inputs)
	if (locale === "el") return __el.lang_it(inputs)
	if (locale === "cs") return __cs.lang_it(inputs)
	if (locale === "ro") return __ro.lang_it(inputs)
	if (locale === "hu") return __hu.lang_it(inputs)
	if (locale === "sv") return __sv.lang_it(inputs)
	if (locale === "he") return __he.lang_it(inputs)
	return __ru.lang_it(inputs)
});
/**
* | output |
* | --- |
* | "日本語" |
*
* @param {Lang_JaInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_ja = /** @type {((inputs?: Lang_JaInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_JaInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_ja(inputs)
	if (locale === "fr") return __fr.lang_ja(inputs)
	if (locale === "es") return __es.lang_ja(inputs)
	if (locale === "zh") return __zh.lang_ja(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_ja(inputs)
	if (locale === "hi") return __hi.lang_ja(inputs)
	if (locale === "ar") return __ar.lang_ja(inputs)
	if (locale === "pt") return __pt.lang_ja(inputs)
	if (locale === "de") return __de.lang_ja(inputs)
	if (locale === "ja") return __ja.lang_ja(inputs)
	if (locale === "ko") return __ko.lang_ja(inputs)
	if (locale === "it") return __it.lang_ja(inputs)
	if (locale === "tr") return __tr.lang_ja(inputs)
	if (locale === "pl") return __pl.lang_ja(inputs)
	if (locale === "uk") return __uk.lang_ja(inputs)
	if (locale === "nl") return __nl.lang_ja(inputs)
	if (locale === "vi") return __vi.lang_ja(inputs)
	if (locale === "id") return __id.lang_ja(inputs)
	if (locale === "ms") return __ms.lang_ja(inputs)
	if (locale === "th") return __th.lang_ja(inputs)
	if (locale === "fa") return __fa.lang_ja(inputs)
	if (locale === "ur") return __ur.lang_ja(inputs)
	if (locale === "bn") return __bn.lang_ja(inputs)
	if (locale === "pa") return __pa.lang_ja(inputs)
	if (locale === "sw") return __sw.lang_ja(inputs)
	if (locale === "el") return __el.lang_ja(inputs)
	if (locale === "cs") return __cs.lang_ja(inputs)
	if (locale === "ro") return __ro.lang_ja(inputs)
	if (locale === "hu") return __hu.lang_ja(inputs)
	if (locale === "sv") return __sv.lang_ja(inputs)
	if (locale === "he") return __he.lang_ja(inputs)
	return __ru.lang_ja(inputs)
});
/**
* | output |
* | --- |
* | "한국어" |
*
* @param {Lang_KoInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_ko = /** @type {((inputs?: Lang_KoInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_KoInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_ko(inputs)
	if (locale === "fr") return __fr.lang_ko(inputs)
	if (locale === "es") return __es.lang_ko(inputs)
	if (locale === "zh") return __zh.lang_ko(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_ko(inputs)
	if (locale === "hi") return __hi.lang_ko(inputs)
	if (locale === "ar") return __ar.lang_ko(inputs)
	if (locale === "pt") return __pt.lang_ko(inputs)
	if (locale === "de") return __de.lang_ko(inputs)
	if (locale === "ja") return __ja.lang_ko(inputs)
	if (locale === "ko") return __ko.lang_ko(inputs)
	if (locale === "it") return __it.lang_ko(inputs)
	if (locale === "tr") return __tr.lang_ko(inputs)
	if (locale === "pl") return __pl.lang_ko(inputs)
	if (locale === "uk") return __uk.lang_ko(inputs)
	if (locale === "nl") return __nl.lang_ko(inputs)
	if (locale === "vi") return __vi.lang_ko(inputs)
	if (locale === "id") return __id.lang_ko(inputs)
	if (locale === "ms") return __ms.lang_ko(inputs)
	if (locale === "th") return __th.lang_ko(inputs)
	if (locale === "fa") return __fa.lang_ko(inputs)
	if (locale === "ur") return __ur.lang_ko(inputs)
	if (locale === "bn") return __bn.lang_ko(inputs)
	if (locale === "pa") return __pa.lang_ko(inputs)
	if (locale === "sw") return __sw.lang_ko(inputs)
	if (locale === "el") return __el.lang_ko(inputs)
	if (locale === "cs") return __cs.lang_ko(inputs)
	if (locale === "ro") return __ro.lang_ko(inputs)
	if (locale === "hu") return __hu.lang_ko(inputs)
	if (locale === "sv") return __sv.lang_ko(inputs)
	if (locale === "he") return __he.lang_ko(inputs)
	return __ru.lang_ko(inputs)
});
/**
* | output |
* | --- |
* | "Bahasa Melayu" |
*
* @param {Lang_MsInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_ms = /** @type {((inputs?: Lang_MsInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_MsInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_ms(inputs)
	if (locale === "fr") return __fr.lang_ms(inputs)
	if (locale === "es") return __es.lang_ms(inputs)
	if (locale === "zh") return __zh.lang_ms(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_ms(inputs)
	if (locale === "hi") return __hi.lang_ms(inputs)
	if (locale === "ar") return __ar.lang_ms(inputs)
	if (locale === "pt") return __pt.lang_ms(inputs)
	if (locale === "de") return __de.lang_ms(inputs)
	if (locale === "ja") return __ja.lang_ms(inputs)
	if (locale === "ko") return __ko.lang_ms(inputs)
	if (locale === "it") return __it.lang_ms(inputs)
	if (locale === "tr") return __tr.lang_ms(inputs)
	if (locale === "pl") return __pl.lang_ms(inputs)
	if (locale === "uk") return __uk.lang_ms(inputs)
	if (locale === "nl") return __nl.lang_ms(inputs)
	if (locale === "vi") return __vi.lang_ms(inputs)
	if (locale === "id") return __id.lang_ms(inputs)
	if (locale === "ms") return __ms.lang_ms(inputs)
	if (locale === "th") return __th.lang_ms(inputs)
	if (locale === "fa") return __fa.lang_ms(inputs)
	if (locale === "ur") return __ur.lang_ms(inputs)
	if (locale === "bn") return __bn.lang_ms(inputs)
	if (locale === "pa") return __pa.lang_ms(inputs)
	if (locale === "sw") return __sw.lang_ms(inputs)
	if (locale === "el") return __el.lang_ms(inputs)
	if (locale === "cs") return __cs.lang_ms(inputs)
	if (locale === "ro") return __ro.lang_ms(inputs)
	if (locale === "hu") return __hu.lang_ms(inputs)
	if (locale === "sv") return __sv.lang_ms(inputs)
	if (locale === "he") return __he.lang_ms(inputs)
	return __ru.lang_ms(inputs)
});
/**
* | output |
* | --- |
* | "Nederlands" |
*
* @param {Lang_NlInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_nl = /** @type {((inputs?: Lang_NlInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_NlInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_nl(inputs)
	if (locale === "fr") return __fr.lang_nl(inputs)
	if (locale === "es") return __es.lang_nl(inputs)
	if (locale === "zh") return __zh.lang_nl(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_nl(inputs)
	if (locale === "hi") return __hi.lang_nl(inputs)
	if (locale === "ar") return __ar.lang_nl(inputs)
	if (locale === "pt") return __pt.lang_nl(inputs)
	if (locale === "de") return __de.lang_nl(inputs)
	if (locale === "ja") return __ja.lang_nl(inputs)
	if (locale === "ko") return __ko.lang_nl(inputs)
	if (locale === "it") return __it.lang_nl(inputs)
	if (locale === "tr") return __tr.lang_nl(inputs)
	if (locale === "pl") return __pl.lang_nl(inputs)
	if (locale === "uk") return __uk.lang_nl(inputs)
	if (locale === "nl") return __nl.lang_nl(inputs)
	if (locale === "vi") return __vi.lang_nl(inputs)
	if (locale === "id") return __id.lang_nl(inputs)
	if (locale === "ms") return __ms.lang_nl(inputs)
	if (locale === "th") return __th.lang_nl(inputs)
	if (locale === "fa") return __fa.lang_nl(inputs)
	if (locale === "ur") return __ur.lang_nl(inputs)
	if (locale === "bn") return __bn.lang_nl(inputs)
	if (locale === "pa") return __pa.lang_nl(inputs)
	if (locale === "sw") return __sw.lang_nl(inputs)
	if (locale === "el") return __el.lang_nl(inputs)
	if (locale === "cs") return __cs.lang_nl(inputs)
	if (locale === "ro") return __ro.lang_nl(inputs)
	if (locale === "hu") return __hu.lang_nl(inputs)
	if (locale === "sv") return __sv.lang_nl(inputs)
	if (locale === "he") return __he.lang_nl(inputs)
	return __ru.lang_nl(inputs)
});
/**
* | output |
* | --- |
* | "ਪੰਜਾਬੀ" |
*
* @param {Lang_PaInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_pa = /** @type {((inputs?: Lang_PaInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_PaInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_pa(inputs)
	if (locale === "fr") return __fr.lang_pa(inputs)
	if (locale === "es") return __es.lang_pa(inputs)
	if (locale === "zh") return __zh.lang_pa(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_pa(inputs)
	if (locale === "hi") return __hi.lang_pa(inputs)
	if (locale === "ar") return __ar.lang_pa(inputs)
	if (locale === "pt") return __pt.lang_pa(inputs)
	if (locale === "de") return __de.lang_pa(inputs)
	if (locale === "ja") return __ja.lang_pa(inputs)
	if (locale === "ko") return __ko.lang_pa(inputs)
	if (locale === "it") return __it.lang_pa(inputs)
	if (locale === "tr") return __tr.lang_pa(inputs)
	if (locale === "pl") return __pl.lang_pa(inputs)
	if (locale === "uk") return __uk.lang_pa(inputs)
	if (locale === "nl") return __nl.lang_pa(inputs)
	if (locale === "vi") return __vi.lang_pa(inputs)
	if (locale === "id") return __id.lang_pa(inputs)
	if (locale === "ms") return __ms.lang_pa(inputs)
	if (locale === "th") return __th.lang_pa(inputs)
	if (locale === "fa") return __fa.lang_pa(inputs)
	if (locale === "ur") return __ur.lang_pa(inputs)
	if (locale === "bn") return __bn.lang_pa(inputs)
	if (locale === "pa") return __pa.lang_pa(inputs)
	if (locale === "sw") return __sw.lang_pa(inputs)
	if (locale === "el") return __el.lang_pa(inputs)
	if (locale === "cs") return __cs.lang_pa(inputs)
	if (locale === "ro") return __ro.lang_pa(inputs)
	if (locale === "hu") return __hu.lang_pa(inputs)
	if (locale === "sv") return __sv.lang_pa(inputs)
	if (locale === "he") return __he.lang_pa(inputs)
	return __ru.lang_pa(inputs)
});
/**
* | output |
* | --- |
* | "Polski" |
*
* @param {Lang_PlInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_pl = /** @type {((inputs?: Lang_PlInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_PlInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_pl(inputs)
	if (locale === "fr") return __fr.lang_pl(inputs)
	if (locale === "es") return __es.lang_pl(inputs)
	if (locale === "zh") return __zh.lang_pl(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_pl(inputs)
	if (locale === "hi") return __hi.lang_pl(inputs)
	if (locale === "ar") return __ar.lang_pl(inputs)
	if (locale === "pt") return __pt.lang_pl(inputs)
	if (locale === "de") return __de.lang_pl(inputs)
	if (locale === "ja") return __ja.lang_pl(inputs)
	if (locale === "ko") return __ko.lang_pl(inputs)
	if (locale === "it") return __it.lang_pl(inputs)
	if (locale === "tr") return __tr.lang_pl(inputs)
	if (locale === "pl") return __pl.lang_pl(inputs)
	if (locale === "uk") return __uk.lang_pl(inputs)
	if (locale === "nl") return __nl.lang_pl(inputs)
	if (locale === "vi") return __vi.lang_pl(inputs)
	if (locale === "id") return __id.lang_pl(inputs)
	if (locale === "ms") return __ms.lang_pl(inputs)
	if (locale === "th") return __th.lang_pl(inputs)
	if (locale === "fa") return __fa.lang_pl(inputs)
	if (locale === "ur") return __ur.lang_pl(inputs)
	if (locale === "bn") return __bn.lang_pl(inputs)
	if (locale === "pa") return __pa.lang_pl(inputs)
	if (locale === "sw") return __sw.lang_pl(inputs)
	if (locale === "el") return __el.lang_pl(inputs)
	if (locale === "cs") return __cs.lang_pl(inputs)
	if (locale === "ro") return __ro.lang_pl(inputs)
	if (locale === "hu") return __hu.lang_pl(inputs)
	if (locale === "sv") return __sv.lang_pl(inputs)
	if (locale === "he") return __he.lang_pl(inputs)
	return __ru.lang_pl(inputs)
});
/**
* | output |
* | --- |
* | "Português" |
*
* @param {Lang_PtInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_pt = /** @type {((inputs?: Lang_PtInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_PtInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_pt(inputs)
	if (locale === "fr") return __fr.lang_pt(inputs)
	if (locale === "es") return __es.lang_pt(inputs)
	if (locale === "zh") return __zh.lang_pt(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_pt(inputs)
	if (locale === "hi") return __hi.lang_pt(inputs)
	if (locale === "ar") return __ar.lang_pt(inputs)
	if (locale === "pt") return __pt.lang_pt(inputs)
	if (locale === "de") return __de.lang_pt(inputs)
	if (locale === "ja") return __ja.lang_pt(inputs)
	if (locale === "ko") return __ko.lang_pt(inputs)
	if (locale === "it") return __it.lang_pt(inputs)
	if (locale === "tr") return __tr.lang_pt(inputs)
	if (locale === "pl") return __pl.lang_pt(inputs)
	if (locale === "uk") return __uk.lang_pt(inputs)
	if (locale === "nl") return __nl.lang_pt(inputs)
	if (locale === "vi") return __vi.lang_pt(inputs)
	if (locale === "id") return __id.lang_pt(inputs)
	if (locale === "ms") return __ms.lang_pt(inputs)
	if (locale === "th") return __th.lang_pt(inputs)
	if (locale === "fa") return __fa.lang_pt(inputs)
	if (locale === "ur") return __ur.lang_pt(inputs)
	if (locale === "bn") return __bn.lang_pt(inputs)
	if (locale === "pa") return __pa.lang_pt(inputs)
	if (locale === "sw") return __sw.lang_pt(inputs)
	if (locale === "el") return __el.lang_pt(inputs)
	if (locale === "cs") return __cs.lang_pt(inputs)
	if (locale === "ro") return __ro.lang_pt(inputs)
	if (locale === "hu") return __hu.lang_pt(inputs)
	if (locale === "sv") return __sv.lang_pt(inputs)
	if (locale === "he") return __he.lang_pt(inputs)
	return __ru.lang_pt(inputs)
});
/**
* | output |
* | --- |
* | "Română" |
*
* @param {Lang_RoInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_ro = /** @type {((inputs?: Lang_RoInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_RoInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_ro(inputs)
	if (locale === "fr") return __fr.lang_ro(inputs)
	if (locale === "es") return __es.lang_ro(inputs)
	if (locale === "zh") return __zh.lang_ro(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_ro(inputs)
	if (locale === "hi") return __hi.lang_ro(inputs)
	if (locale === "ar") return __ar.lang_ro(inputs)
	if (locale === "pt") return __pt.lang_ro(inputs)
	if (locale === "de") return __de.lang_ro(inputs)
	if (locale === "ja") return __ja.lang_ro(inputs)
	if (locale === "ko") return __ko.lang_ro(inputs)
	if (locale === "it") return __it.lang_ro(inputs)
	if (locale === "tr") return __tr.lang_ro(inputs)
	if (locale === "pl") return __pl.lang_ro(inputs)
	if (locale === "uk") return __uk.lang_ro(inputs)
	if (locale === "nl") return __nl.lang_ro(inputs)
	if (locale === "vi") return __vi.lang_ro(inputs)
	if (locale === "id") return __id.lang_ro(inputs)
	if (locale === "ms") return __ms.lang_ro(inputs)
	if (locale === "th") return __th.lang_ro(inputs)
	if (locale === "fa") return __fa.lang_ro(inputs)
	if (locale === "ur") return __ur.lang_ro(inputs)
	if (locale === "bn") return __bn.lang_ro(inputs)
	if (locale === "pa") return __pa.lang_ro(inputs)
	if (locale === "sw") return __sw.lang_ro(inputs)
	if (locale === "el") return __el.lang_ro(inputs)
	if (locale === "cs") return __cs.lang_ro(inputs)
	if (locale === "ro") return __ro.lang_ro(inputs)
	if (locale === "hu") return __hu.lang_ro(inputs)
	if (locale === "sv") return __sv.lang_ro(inputs)
	if (locale === "he") return __he.lang_ro(inputs)
	return __ru.lang_ro(inputs)
});
/**
* | output |
* | --- |
* | "Русский" |
*
* @param {Lang_RuInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_ru = /** @type {((inputs?: Lang_RuInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_RuInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_ru(inputs)
	if (locale === "fr") return __fr.lang_ru(inputs)
	if (locale === "es") return __es.lang_ru(inputs)
	if (locale === "zh") return __zh.lang_ru(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_ru(inputs)
	if (locale === "hi") return __hi.lang_ru(inputs)
	if (locale === "ar") return __ar.lang_ru(inputs)
	if (locale === "pt") return __pt.lang_ru(inputs)
	if (locale === "de") return __de.lang_ru(inputs)
	if (locale === "ja") return __ja.lang_ru(inputs)
	if (locale === "ko") return __ko.lang_ru(inputs)
	if (locale === "it") return __it.lang_ru(inputs)
	if (locale === "tr") return __tr.lang_ru(inputs)
	if (locale === "pl") return __pl.lang_ru(inputs)
	if (locale === "uk") return __uk.lang_ru(inputs)
	if (locale === "nl") return __nl.lang_ru(inputs)
	if (locale === "vi") return __vi.lang_ru(inputs)
	if (locale === "id") return __id.lang_ru(inputs)
	if (locale === "ms") return __ms.lang_ru(inputs)
	if (locale === "th") return __th.lang_ru(inputs)
	if (locale === "fa") return __fa.lang_ru(inputs)
	if (locale === "ur") return __ur.lang_ru(inputs)
	if (locale === "bn") return __bn.lang_ru(inputs)
	if (locale === "pa") return __pa.lang_ru(inputs)
	if (locale === "sw") return __sw.lang_ru(inputs)
	if (locale === "el") return __el.lang_ru(inputs)
	if (locale === "cs") return __cs.lang_ru(inputs)
	if (locale === "ro") return __ro.lang_ru(inputs)
	if (locale === "hu") return __hu.lang_ru(inputs)
	if (locale === "sv") return __sv.lang_ru(inputs)
	if (locale === "he") return __he.lang_ru(inputs)
	return __ru.lang_ru(inputs)
});
/**
* | output |
* | --- |
* | "Svenska" |
*
* @param {Lang_SvInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_sv = /** @type {((inputs?: Lang_SvInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_SvInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_sv(inputs)
	if (locale === "fr") return __fr.lang_sv(inputs)
	if (locale === "es") return __es.lang_sv(inputs)
	if (locale === "zh") return __zh.lang_sv(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_sv(inputs)
	if (locale === "hi") return __hi.lang_sv(inputs)
	if (locale === "ar") return __ar.lang_sv(inputs)
	if (locale === "pt") return __pt.lang_sv(inputs)
	if (locale === "de") return __de.lang_sv(inputs)
	if (locale === "ja") return __ja.lang_sv(inputs)
	if (locale === "ko") return __ko.lang_sv(inputs)
	if (locale === "it") return __it.lang_sv(inputs)
	if (locale === "tr") return __tr.lang_sv(inputs)
	if (locale === "pl") return __pl.lang_sv(inputs)
	if (locale === "uk") return __uk.lang_sv(inputs)
	if (locale === "nl") return __nl.lang_sv(inputs)
	if (locale === "vi") return __vi.lang_sv(inputs)
	if (locale === "id") return __id.lang_sv(inputs)
	if (locale === "ms") return __ms.lang_sv(inputs)
	if (locale === "th") return __th.lang_sv(inputs)
	if (locale === "fa") return __fa.lang_sv(inputs)
	if (locale === "ur") return __ur.lang_sv(inputs)
	if (locale === "bn") return __bn.lang_sv(inputs)
	if (locale === "pa") return __pa.lang_sv(inputs)
	if (locale === "sw") return __sw.lang_sv(inputs)
	if (locale === "el") return __el.lang_sv(inputs)
	if (locale === "cs") return __cs.lang_sv(inputs)
	if (locale === "ro") return __ro.lang_sv(inputs)
	if (locale === "hu") return __hu.lang_sv(inputs)
	if (locale === "sv") return __sv.lang_sv(inputs)
	if (locale === "he") return __he.lang_sv(inputs)
	return __ru.lang_sv(inputs)
});
/**
* | output |
* | --- |
* | "Kiswahili" |
*
* @param {Lang_SwInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_sw = /** @type {((inputs?: Lang_SwInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_SwInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_sw(inputs)
	if (locale === "fr") return __fr.lang_sw(inputs)
	if (locale === "es") return __es.lang_sw(inputs)
	if (locale === "zh") return __zh.lang_sw(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_sw(inputs)
	if (locale === "hi") return __hi.lang_sw(inputs)
	if (locale === "ar") return __ar.lang_sw(inputs)
	if (locale === "pt") return __pt.lang_sw(inputs)
	if (locale === "de") return __de.lang_sw(inputs)
	if (locale === "ja") return __ja.lang_sw(inputs)
	if (locale === "ko") return __ko.lang_sw(inputs)
	if (locale === "it") return __it.lang_sw(inputs)
	if (locale === "tr") return __tr.lang_sw(inputs)
	if (locale === "pl") return __pl.lang_sw(inputs)
	if (locale === "uk") return __uk.lang_sw(inputs)
	if (locale === "nl") return __nl.lang_sw(inputs)
	if (locale === "vi") return __vi.lang_sw(inputs)
	if (locale === "id") return __id.lang_sw(inputs)
	if (locale === "ms") return __ms.lang_sw(inputs)
	if (locale === "th") return __th.lang_sw(inputs)
	if (locale === "fa") return __fa.lang_sw(inputs)
	if (locale === "ur") return __ur.lang_sw(inputs)
	if (locale === "bn") return __bn.lang_sw(inputs)
	if (locale === "pa") return __pa.lang_sw(inputs)
	if (locale === "sw") return __sw.lang_sw(inputs)
	if (locale === "el") return __el.lang_sw(inputs)
	if (locale === "cs") return __cs.lang_sw(inputs)
	if (locale === "ro") return __ro.lang_sw(inputs)
	if (locale === "hu") return __hu.lang_sw(inputs)
	if (locale === "sv") return __sv.lang_sw(inputs)
	if (locale === "he") return __he.lang_sw(inputs)
	return __ru.lang_sw(inputs)
});
/**
* | output |
* | --- |
* | "ไทย" |
*
* @param {Lang_ThInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_th = /** @type {((inputs?: Lang_ThInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_ThInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_th(inputs)
	if (locale === "fr") return __fr.lang_th(inputs)
	if (locale === "es") return __es.lang_th(inputs)
	if (locale === "zh") return __zh.lang_th(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_th(inputs)
	if (locale === "hi") return __hi.lang_th(inputs)
	if (locale === "ar") return __ar.lang_th(inputs)
	if (locale === "pt") return __pt.lang_th(inputs)
	if (locale === "de") return __de.lang_th(inputs)
	if (locale === "ja") return __ja.lang_th(inputs)
	if (locale === "ko") return __ko.lang_th(inputs)
	if (locale === "it") return __it.lang_th(inputs)
	if (locale === "tr") return __tr.lang_th(inputs)
	if (locale === "pl") return __pl.lang_th(inputs)
	if (locale === "uk") return __uk.lang_th(inputs)
	if (locale === "nl") return __nl.lang_th(inputs)
	if (locale === "vi") return __vi.lang_th(inputs)
	if (locale === "id") return __id.lang_th(inputs)
	if (locale === "ms") return __ms.lang_th(inputs)
	if (locale === "th") return __th.lang_th(inputs)
	if (locale === "fa") return __fa.lang_th(inputs)
	if (locale === "ur") return __ur.lang_th(inputs)
	if (locale === "bn") return __bn.lang_th(inputs)
	if (locale === "pa") return __pa.lang_th(inputs)
	if (locale === "sw") return __sw.lang_th(inputs)
	if (locale === "el") return __el.lang_th(inputs)
	if (locale === "cs") return __cs.lang_th(inputs)
	if (locale === "ro") return __ro.lang_th(inputs)
	if (locale === "hu") return __hu.lang_th(inputs)
	if (locale === "sv") return __sv.lang_th(inputs)
	if (locale === "he") return __he.lang_th(inputs)
	return __ru.lang_th(inputs)
});
/**
* | output |
* | --- |
* | "Türkçe" |
*
* @param {Lang_TrInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_tr = /** @type {((inputs?: Lang_TrInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_TrInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_tr(inputs)
	if (locale === "fr") return __fr.lang_tr(inputs)
	if (locale === "es") return __es.lang_tr(inputs)
	if (locale === "zh") return __zh.lang_tr(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_tr(inputs)
	if (locale === "hi") return __hi.lang_tr(inputs)
	if (locale === "ar") return __ar.lang_tr(inputs)
	if (locale === "pt") return __pt.lang_tr(inputs)
	if (locale === "de") return __de.lang_tr(inputs)
	if (locale === "ja") return __ja.lang_tr(inputs)
	if (locale === "ko") return __ko.lang_tr(inputs)
	if (locale === "it") return __it.lang_tr(inputs)
	if (locale === "tr") return __tr.lang_tr(inputs)
	if (locale === "pl") return __pl.lang_tr(inputs)
	if (locale === "uk") return __uk.lang_tr(inputs)
	if (locale === "nl") return __nl.lang_tr(inputs)
	if (locale === "vi") return __vi.lang_tr(inputs)
	if (locale === "id") return __id.lang_tr(inputs)
	if (locale === "ms") return __ms.lang_tr(inputs)
	if (locale === "th") return __th.lang_tr(inputs)
	if (locale === "fa") return __fa.lang_tr(inputs)
	if (locale === "ur") return __ur.lang_tr(inputs)
	if (locale === "bn") return __bn.lang_tr(inputs)
	if (locale === "pa") return __pa.lang_tr(inputs)
	if (locale === "sw") return __sw.lang_tr(inputs)
	if (locale === "el") return __el.lang_tr(inputs)
	if (locale === "cs") return __cs.lang_tr(inputs)
	if (locale === "ro") return __ro.lang_tr(inputs)
	if (locale === "hu") return __hu.lang_tr(inputs)
	if (locale === "sv") return __sv.lang_tr(inputs)
	if (locale === "he") return __he.lang_tr(inputs)
	return __ru.lang_tr(inputs)
});
/**
* | output |
* | --- |
* | "Українська" |
*
* @param {Lang_UkInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_uk = /** @type {((inputs?: Lang_UkInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_UkInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_uk(inputs)
	if (locale === "fr") return __fr.lang_uk(inputs)
	if (locale === "es") return __es.lang_uk(inputs)
	if (locale === "zh") return __zh.lang_uk(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_uk(inputs)
	if (locale === "hi") return __hi.lang_uk(inputs)
	if (locale === "ar") return __ar.lang_uk(inputs)
	if (locale === "pt") return __pt.lang_uk(inputs)
	if (locale === "de") return __de.lang_uk(inputs)
	if (locale === "ja") return __ja.lang_uk(inputs)
	if (locale === "ko") return __ko.lang_uk(inputs)
	if (locale === "it") return __it.lang_uk(inputs)
	if (locale === "tr") return __tr.lang_uk(inputs)
	if (locale === "pl") return __pl.lang_uk(inputs)
	if (locale === "uk") return __uk.lang_uk(inputs)
	if (locale === "nl") return __nl.lang_uk(inputs)
	if (locale === "vi") return __vi.lang_uk(inputs)
	if (locale === "id") return __id.lang_uk(inputs)
	if (locale === "ms") return __ms.lang_uk(inputs)
	if (locale === "th") return __th.lang_uk(inputs)
	if (locale === "fa") return __fa.lang_uk(inputs)
	if (locale === "ur") return __ur.lang_uk(inputs)
	if (locale === "bn") return __bn.lang_uk(inputs)
	if (locale === "pa") return __pa.lang_uk(inputs)
	if (locale === "sw") return __sw.lang_uk(inputs)
	if (locale === "el") return __el.lang_uk(inputs)
	if (locale === "cs") return __cs.lang_uk(inputs)
	if (locale === "ro") return __ro.lang_uk(inputs)
	if (locale === "hu") return __hu.lang_uk(inputs)
	if (locale === "sv") return __sv.lang_uk(inputs)
	if (locale === "he") return __he.lang_uk(inputs)
	return __ru.lang_uk(inputs)
});
/**
* | output |
* | --- |
* | "اردو" |
*
* @param {Lang_UrInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_ur = /** @type {((inputs?: Lang_UrInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_UrInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_ur(inputs)
	if (locale === "fr") return __fr.lang_ur(inputs)
	if (locale === "es") return __es.lang_ur(inputs)
	if (locale === "zh") return __zh.lang_ur(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_ur(inputs)
	if (locale === "hi") return __hi.lang_ur(inputs)
	if (locale === "ar") return __ar.lang_ur(inputs)
	if (locale === "pt") return __pt.lang_ur(inputs)
	if (locale === "de") return __de.lang_ur(inputs)
	if (locale === "ja") return __ja.lang_ur(inputs)
	if (locale === "ko") return __ko.lang_ur(inputs)
	if (locale === "it") return __it.lang_ur(inputs)
	if (locale === "tr") return __tr.lang_ur(inputs)
	if (locale === "pl") return __pl.lang_ur(inputs)
	if (locale === "uk") return __uk.lang_ur(inputs)
	if (locale === "nl") return __nl.lang_ur(inputs)
	if (locale === "vi") return __vi.lang_ur(inputs)
	if (locale === "id") return __id.lang_ur(inputs)
	if (locale === "ms") return __ms.lang_ur(inputs)
	if (locale === "th") return __th.lang_ur(inputs)
	if (locale === "fa") return __fa.lang_ur(inputs)
	if (locale === "ur") return __ur.lang_ur(inputs)
	if (locale === "bn") return __bn.lang_ur(inputs)
	if (locale === "pa") return __pa.lang_ur(inputs)
	if (locale === "sw") return __sw.lang_ur(inputs)
	if (locale === "el") return __el.lang_ur(inputs)
	if (locale === "cs") return __cs.lang_ur(inputs)
	if (locale === "ro") return __ro.lang_ur(inputs)
	if (locale === "hu") return __hu.lang_ur(inputs)
	if (locale === "sv") return __sv.lang_ur(inputs)
	if (locale === "he") return __he.lang_ur(inputs)
	return __ru.lang_ur(inputs)
});
/**
* | output |
* | --- |
* | "Tiếng Việt" |
*
* @param {Lang_ViInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_vi = /** @type {((inputs?: Lang_ViInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_ViInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_vi(inputs)
	if (locale === "fr") return __fr.lang_vi(inputs)
	if (locale === "es") return __es.lang_vi(inputs)
	if (locale === "zh") return __zh.lang_vi(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_vi(inputs)
	if (locale === "hi") return __hi.lang_vi(inputs)
	if (locale === "ar") return __ar.lang_vi(inputs)
	if (locale === "pt") return __pt.lang_vi(inputs)
	if (locale === "de") return __de.lang_vi(inputs)
	if (locale === "ja") return __ja.lang_vi(inputs)
	if (locale === "ko") return __ko.lang_vi(inputs)
	if (locale === "it") return __it.lang_vi(inputs)
	if (locale === "tr") return __tr.lang_vi(inputs)
	if (locale === "pl") return __pl.lang_vi(inputs)
	if (locale === "uk") return __uk.lang_vi(inputs)
	if (locale === "nl") return __nl.lang_vi(inputs)
	if (locale === "vi") return __vi.lang_vi(inputs)
	if (locale === "id") return __id.lang_vi(inputs)
	if (locale === "ms") return __ms.lang_vi(inputs)
	if (locale === "th") return __th.lang_vi(inputs)
	if (locale === "fa") return __fa.lang_vi(inputs)
	if (locale === "ur") return __ur.lang_vi(inputs)
	if (locale === "bn") return __bn.lang_vi(inputs)
	if (locale === "pa") return __pa.lang_vi(inputs)
	if (locale === "sw") return __sw.lang_vi(inputs)
	if (locale === "el") return __el.lang_vi(inputs)
	if (locale === "cs") return __cs.lang_vi(inputs)
	if (locale === "ro") return __ro.lang_vi(inputs)
	if (locale === "hu") return __hu.lang_vi(inputs)
	if (locale === "sv") return __sv.lang_vi(inputs)
	if (locale === "he") return __he.lang_vi(inputs)
	return __ru.lang_vi(inputs)
});
/**
* | output |
* | --- |
* | "中文" |
*
* @param {Lang_ZhInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const lang_zh = /** @type {((inputs?: Lang_ZhInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_ZhInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_zh(inputs)
	if (locale === "fr") return __fr.lang_zh(inputs)
	if (locale === "es") return __es.lang_zh(inputs)
	if (locale === "zh") return __zh.lang_zh(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_zh(inputs)
	if (locale === "hi") return __hi.lang_zh(inputs)
	if (locale === "ar") return __ar.lang_zh(inputs)
	if (locale === "pt") return __pt.lang_zh(inputs)
	if (locale === "de") return __de.lang_zh(inputs)
	if (locale === "ja") return __ja.lang_zh(inputs)
	if (locale === "ko") return __ko.lang_zh(inputs)
	if (locale === "it") return __it.lang_zh(inputs)
	if (locale === "tr") return __tr.lang_zh(inputs)
	if (locale === "pl") return __pl.lang_zh(inputs)
	if (locale === "uk") return __uk.lang_zh(inputs)
	if (locale === "nl") return __nl.lang_zh(inputs)
	if (locale === "vi") return __vi.lang_zh(inputs)
	if (locale === "id") return __id.lang_zh(inputs)
	if (locale === "ms") return __ms.lang_zh(inputs)
	if (locale === "th") return __th.lang_zh(inputs)
	if (locale === "fa") return __fa.lang_zh(inputs)
	if (locale === "ur") return __ur.lang_zh(inputs)
	if (locale === "bn") return __bn.lang_zh(inputs)
	if (locale === "pa") return __pa.lang_zh(inputs)
	if (locale === "sw") return __sw.lang_zh(inputs)
	if (locale === "el") return __el.lang_zh(inputs)
	if (locale === "cs") return __cs.lang_zh(inputs)
	if (locale === "ro") return __ro.lang_zh(inputs)
	if (locale === "hu") return __hu.lang_zh(inputs)
	if (locale === "sv") return __sv.lang_zh(inputs)
	if (locale === "he") return __he.lang_zh(inputs)
	return __ru.lang_zh(inputs)
});
/**
* | output |
* | --- |
* | "中文（繁體）" |
*
* @param {Lang_Zh_Tw2Inputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
const lang_zh_tw2 = /** @type {((inputs?: Lang_Zh_Tw2Inputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Lang_Zh_Tw2Inputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.lang_zh_tw2(inputs)
	if (locale === "fr") return __fr.lang_zh_tw2(inputs)
	if (locale === "es") return __es.lang_zh_tw2(inputs)
	if (locale === "zh") return __zh.lang_zh_tw2(inputs)
	if (locale === "zh-TW") return __zh_tw2.lang_zh_tw2(inputs)
	if (locale === "hi") return __hi.lang_zh_tw2(inputs)
	if (locale === "ar") return __ar.lang_zh_tw2(inputs)
	if (locale === "pt") return __pt.lang_zh_tw2(inputs)
	if (locale === "de") return __de.lang_zh_tw2(inputs)
	if (locale === "ja") return __ja.lang_zh_tw2(inputs)
	if (locale === "ko") return __ko.lang_zh_tw2(inputs)
	if (locale === "it") return __it.lang_zh_tw2(inputs)
	if (locale === "tr") return __tr.lang_zh_tw2(inputs)
	if (locale === "pl") return __pl.lang_zh_tw2(inputs)
	if (locale === "uk") return __uk.lang_zh_tw2(inputs)
	if (locale === "nl") return __nl.lang_zh_tw2(inputs)
	if (locale === "vi") return __vi.lang_zh_tw2(inputs)
	if (locale === "id") return __id.lang_zh_tw2(inputs)
	if (locale === "ms") return __ms.lang_zh_tw2(inputs)
	if (locale === "th") return __th.lang_zh_tw2(inputs)
	if (locale === "fa") return __fa.lang_zh_tw2(inputs)
	if (locale === "ur") return __ur.lang_zh_tw2(inputs)
	if (locale === "bn") return __bn.lang_zh_tw2(inputs)
	if (locale === "pa") return __pa.lang_zh_tw2(inputs)
	if (locale === "sw") return __sw.lang_zh_tw2(inputs)
	if (locale === "el") return __el.lang_zh_tw2(inputs)
	if (locale === "cs") return __cs.lang_zh_tw2(inputs)
	if (locale === "ro") return __ro.lang_zh_tw2(inputs)
	if (locale === "hu") return __hu.lang_zh_tw2(inputs)
	if (locale === "sv") return __sv.lang_zh_tw2(inputs)
	if (locale === "he") return __he.lang_zh_tw2(inputs)
	return __ru.lang_zh_tw2(inputs)
});
export { lang_zh_tw2 as "lang_zh_TW" }
/**
* | output |
* | --- |
* | "Privacy" |
*
* @param {Legal_PrivacyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const legal_privacy = /** @type {((inputs?: Legal_PrivacyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Legal_PrivacyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.legal_privacy(inputs)
	if (locale === "fr") return __fr.legal_privacy(inputs)
	if (locale === "es") return __es.legal_privacy(inputs)
	if (locale === "zh") return __zh.legal_privacy(inputs)
	if (locale === "zh-TW") return __zh_tw2.legal_privacy(inputs)
	if (locale === "hi") return __hi.legal_privacy(inputs)
	if (locale === "ar") return __ar.legal_privacy(inputs)
	if (locale === "pt") return __pt.legal_privacy(inputs)
	if (locale === "de") return __de.legal_privacy(inputs)
	if (locale === "ja") return __ja.legal_privacy(inputs)
	if (locale === "ko") return __ko.legal_privacy(inputs)
	if (locale === "it") return __it.legal_privacy(inputs)
	if (locale === "tr") return __tr.legal_privacy(inputs)
	if (locale === "pl") return __pl.legal_privacy(inputs)
	if (locale === "uk") return __uk.legal_privacy(inputs)
	if (locale === "nl") return __nl.legal_privacy(inputs)
	if (locale === "vi") return __vi.legal_privacy(inputs)
	if (locale === "id") return __id.legal_privacy(inputs)
	if (locale === "ms") return __ms.legal_privacy(inputs)
	if (locale === "th") return __th.legal_privacy(inputs)
	if (locale === "fa") return __fa.legal_privacy(inputs)
	if (locale === "ur") return __ur.legal_privacy(inputs)
	if (locale === "bn") return __bn.legal_privacy(inputs)
	if (locale === "pa") return __pa.legal_privacy(inputs)
	if (locale === "sw") return __sw.legal_privacy(inputs)
	if (locale === "el") return __el.legal_privacy(inputs)
	if (locale === "cs") return __cs.legal_privacy(inputs)
	if (locale === "ro") return __ro.legal_privacy(inputs)
	if (locale === "hu") return __hu.legal_privacy(inputs)
	if (locale === "sv") return __sv.legal_privacy(inputs)
	if (locale === "he") return __he.legal_privacy(inputs)
	return __ru.legal_privacy(inputs)
});
/**
* | output |
* | --- |
* | "Rules" |
*
* @param {Legal_RulesInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const legal_rules = /** @type {((inputs?: Legal_RulesInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Legal_RulesInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.legal_rules(inputs)
	if (locale === "fr") return __fr.legal_rules(inputs)
	if (locale === "es") return __es.legal_rules(inputs)
	if (locale === "zh") return __zh.legal_rules(inputs)
	if (locale === "zh-TW") return __zh_tw2.legal_rules(inputs)
	if (locale === "hi") return __hi.legal_rules(inputs)
	if (locale === "ar") return __ar.legal_rules(inputs)
	if (locale === "pt") return __pt.legal_rules(inputs)
	if (locale === "de") return __de.legal_rules(inputs)
	if (locale === "ja") return __ja.legal_rules(inputs)
	if (locale === "ko") return __ko.legal_rules(inputs)
	if (locale === "it") return __it.legal_rules(inputs)
	if (locale === "tr") return __tr.legal_rules(inputs)
	if (locale === "pl") return __pl.legal_rules(inputs)
	if (locale === "uk") return __uk.legal_rules(inputs)
	if (locale === "nl") return __nl.legal_rules(inputs)
	if (locale === "vi") return __vi.legal_rules(inputs)
	if (locale === "id") return __id.legal_rules(inputs)
	if (locale === "ms") return __ms.legal_rules(inputs)
	if (locale === "th") return __th.legal_rules(inputs)
	if (locale === "fa") return __fa.legal_rules(inputs)
	if (locale === "ur") return __ur.legal_rules(inputs)
	if (locale === "bn") return __bn.legal_rules(inputs)
	if (locale === "pa") return __pa.legal_rules(inputs)
	if (locale === "sw") return __sw.legal_rules(inputs)
	if (locale === "el") return __el.legal_rules(inputs)
	if (locale === "cs") return __cs.legal_rules(inputs)
	if (locale === "ro") return __ro.legal_rules(inputs)
	if (locale === "hu") return __hu.legal_rules(inputs)
	if (locale === "sv") return __sv.legal_rules(inputs)
	if (locale === "he") return __he.legal_rules(inputs)
	return __ru.legal_rules(inputs)
});
/**
* | output |
* | --- |
* | "Add a listing" |
*
* @param {Menu_Add_CardInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_add_card = /** @type {((inputs?: Menu_Add_CardInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_Add_CardInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_add_card(inputs)
	if (locale === "fr") return __fr.menu_add_card(inputs)
	if (locale === "es") return __es.menu_add_card(inputs)
	if (locale === "zh") return __zh.menu_add_card(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_add_card(inputs)
	if (locale === "hi") return __hi.menu_add_card(inputs)
	if (locale === "ar") return __ar.menu_add_card(inputs)
	if (locale === "pt") return __pt.menu_add_card(inputs)
	if (locale === "de") return __de.menu_add_card(inputs)
	if (locale === "ja") return __ja.menu_add_card(inputs)
	if (locale === "ko") return __ko.menu_add_card(inputs)
	if (locale === "it") return __it.menu_add_card(inputs)
	if (locale === "tr") return __tr.menu_add_card(inputs)
	if (locale === "pl") return __pl.menu_add_card(inputs)
	if (locale === "uk") return __uk.menu_add_card(inputs)
	if (locale === "nl") return __nl.menu_add_card(inputs)
	if (locale === "vi") return __vi.menu_add_card(inputs)
	if (locale === "id") return __id.menu_add_card(inputs)
	if (locale === "ms") return __ms.menu_add_card(inputs)
	if (locale === "th") return __th.menu_add_card(inputs)
	if (locale === "fa") return __fa.menu_add_card(inputs)
	if (locale === "ur") return __ur.menu_add_card(inputs)
	if (locale === "bn") return __bn.menu_add_card(inputs)
	if (locale === "pa") return __pa.menu_add_card(inputs)
	if (locale === "sw") return __sw.menu_add_card(inputs)
	if (locale === "el") return __el.menu_add_card(inputs)
	if (locale === "cs") return __cs.menu_add_card(inputs)
	if (locale === "ro") return __ro.menu_add_card(inputs)
	if (locale === "hu") return __hu.menu_add_card(inputs)
	if (locale === "sv") return __sv.menu_add_card(inputs)
	if (locale === "he") return __he.menu_add_card(inputs)
	return __ru.menu_add_card(inputs)
});
/**
* | output |
* | --- |
* | "City, category and text" |
*
* @param {Menu_Add_MetaInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_add_meta = /** @type {((inputs?: Menu_Add_MetaInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_Add_MetaInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_add_meta(inputs)
	if (locale === "fr") return __fr.menu_add_meta(inputs)
	if (locale === "es") return __es.menu_add_meta(inputs)
	if (locale === "zh") return __zh.menu_add_meta(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_add_meta(inputs)
	if (locale === "hi") return __hi.menu_add_meta(inputs)
	if (locale === "ar") return __ar.menu_add_meta(inputs)
	if (locale === "pt") return __pt.menu_add_meta(inputs)
	if (locale === "de") return __de.menu_add_meta(inputs)
	if (locale === "ja") return __ja.menu_add_meta(inputs)
	if (locale === "ko") return __ko.menu_add_meta(inputs)
	if (locale === "it") return __it.menu_add_meta(inputs)
	if (locale === "tr") return __tr.menu_add_meta(inputs)
	if (locale === "pl") return __pl.menu_add_meta(inputs)
	if (locale === "uk") return __uk.menu_add_meta(inputs)
	if (locale === "nl") return __nl.menu_add_meta(inputs)
	if (locale === "vi") return __vi.menu_add_meta(inputs)
	if (locale === "id") return __id.menu_add_meta(inputs)
	if (locale === "ms") return __ms.menu_add_meta(inputs)
	if (locale === "th") return __th.menu_add_meta(inputs)
	if (locale === "fa") return __fa.menu_add_meta(inputs)
	if (locale === "ur") return __ur.menu_add_meta(inputs)
	if (locale === "bn") return __bn.menu_add_meta(inputs)
	if (locale === "pa") return __pa.menu_add_meta(inputs)
	if (locale === "sw") return __sw.menu_add_meta(inputs)
	if (locale === "el") return __el.menu_add_meta(inputs)
	if (locale === "cs") return __cs.menu_add_meta(inputs)
	if (locale === "ro") return __ro.menu_add_meta(inputs)
	if (locale === "hu") return __hu.menu_add_meta(inputs)
	if (locale === "sv") return __sv.menu_add_meta(inputs)
	if (locale === "he") return __he.menu_add_meta(inputs)
	return __ru.menu_add_meta(inputs)
});
/**
* | output |
* | --- |
* | "App" |
*
* @param {Menu_AppInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_app = /** @type {((inputs?: Menu_AppInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_AppInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_app(inputs)
	if (locale === "fr") return __fr.menu_app(inputs)
	if (locale === "es") return __es.menu_app(inputs)
	if (locale === "zh") return __zh.menu_app(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_app(inputs)
	if (locale === "hi") return __hi.menu_app(inputs)
	if (locale === "ar") return __ar.menu_app(inputs)
	if (locale === "pt") return __pt.menu_app(inputs)
	if (locale === "de") return __de.menu_app(inputs)
	if (locale === "ja") return __ja.menu_app(inputs)
	if (locale === "ko") return __ko.menu_app(inputs)
	if (locale === "it") return __it.menu_app(inputs)
	if (locale === "tr") return __tr.menu_app(inputs)
	if (locale === "pl") return __pl.menu_app(inputs)
	if (locale === "uk") return __uk.menu_app(inputs)
	if (locale === "nl") return __nl.menu_app(inputs)
	if (locale === "vi") return __vi.menu_app(inputs)
	if (locale === "id") return __id.menu_app(inputs)
	if (locale === "ms") return __ms.menu_app(inputs)
	if (locale === "th") return __th.menu_app(inputs)
	if (locale === "fa") return __fa.menu_app(inputs)
	if (locale === "ur") return __ur.menu_app(inputs)
	if (locale === "bn") return __bn.menu_app(inputs)
	if (locale === "pa") return __pa.menu_app(inputs)
	if (locale === "sw") return __sw.menu_app(inputs)
	if (locale === "el") return __el.menu_app(inputs)
	if (locale === "cs") return __cs.menu_app(inputs)
	if (locale === "ro") return __ro.menu_app(inputs)
	if (locale === "hu") return __hu.menu_app(inputs)
	if (locale === "sv") return __sv.menu_app(inputs)
	if (locale === "he") return __he.menu_app(inputs)
	return __ru.menu_app(inputs)
});
/**
* | output |
* | --- |
* | "Download" |
*
* @param {Menu_DownloadInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_download = /** @type {((inputs?: Menu_DownloadInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_DownloadInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_download(inputs)
	if (locale === "fr") return __fr.menu_download(inputs)
	if (locale === "es") return __es.menu_download(inputs)
	if (locale === "zh") return __zh.menu_download(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_download(inputs)
	if (locale === "hi") return __hi.menu_download(inputs)
	if (locale === "ar") return __ar.menu_download(inputs)
	if (locale === "pt") return __pt.menu_download(inputs)
	if (locale === "de") return __de.menu_download(inputs)
	if (locale === "ja") return __ja.menu_download(inputs)
	if (locale === "ko") return __ko.menu_download(inputs)
	if (locale === "it") return __it.menu_download(inputs)
	if (locale === "tr") return __tr.menu_download(inputs)
	if (locale === "pl") return __pl.menu_download(inputs)
	if (locale === "uk") return __uk.menu_download(inputs)
	if (locale === "nl") return __nl.menu_download(inputs)
	if (locale === "vi") return __vi.menu_download(inputs)
	if (locale === "id") return __id.menu_download(inputs)
	if (locale === "ms") return __ms.menu_download(inputs)
	if (locale === "th") return __th.menu_download(inputs)
	if (locale === "fa") return __fa.menu_download(inputs)
	if (locale === "ur") return __ur.menu_download(inputs)
	if (locale === "bn") return __bn.menu_download(inputs)
	if (locale === "pa") return __pa.menu_download(inputs)
	if (locale === "sw") return __sw.menu_download(inputs)
	if (locale === "el") return __el.menu_download(inputs)
	if (locale === "cs") return __cs.menu_download(inputs)
	if (locale === "ro") return __ro.menu_download(inputs)
	if (locale === "hu") return __hu.menu_download(inputs)
	if (locale === "sv") return __sv.menu_download(inputs)
	if (locale === "he") return __he.menu_download(inputs)
	return __ru.menu_download(inputs)
});
/**
* | output |
* | --- |
* | "Haptics" |
*
* @param {Menu_HapticsInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_haptics = /** @type {((inputs?: Menu_HapticsInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_HapticsInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_haptics(inputs)
	if (locale === "fr") return __fr.menu_haptics(inputs)
	if (locale === "es") return __es.menu_haptics(inputs)
	if (locale === "zh") return __zh.menu_haptics(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_haptics(inputs)
	if (locale === "hi") return __hi.menu_haptics(inputs)
	if (locale === "ar") return __ar.menu_haptics(inputs)
	if (locale === "pt") return __pt.menu_haptics(inputs)
	if (locale === "de") return __de.menu_haptics(inputs)
	if (locale === "ja") return __ja.menu_haptics(inputs)
	if (locale === "ko") return __ko.menu_haptics(inputs)
	if (locale === "it") return __it.menu_haptics(inputs)
	if (locale === "tr") return __tr.menu_haptics(inputs)
	if (locale === "pl") return __pl.menu_haptics(inputs)
	if (locale === "uk") return __uk.menu_haptics(inputs)
	if (locale === "nl") return __nl.menu_haptics(inputs)
	if (locale === "vi") return __vi.menu_haptics(inputs)
	if (locale === "id") return __id.menu_haptics(inputs)
	if (locale === "ms") return __ms.menu_haptics(inputs)
	if (locale === "th") return __th.menu_haptics(inputs)
	if (locale === "fa") return __fa.menu_haptics(inputs)
	if (locale === "ur") return __ur.menu_haptics(inputs)
	if (locale === "bn") return __bn.menu_haptics(inputs)
	if (locale === "pa") return __pa.menu_haptics(inputs)
	if (locale === "sw") return __sw.menu_haptics(inputs)
	if (locale === "el") return __el.menu_haptics(inputs)
	if (locale === "cs") return __cs.menu_haptics(inputs)
	if (locale === "ro") return __ro.menu_haptics(inputs)
	if (locale === "hu") return __hu.menu_haptics(inputs)
	if (locale === "sv") return __sv.menu_haptics(inputs)
	if (locale === "he") return __he.menu_haptics(inputs)
	return __ru.menu_haptics(inputs)
});
/**
* | output |
* | --- |
* | "Off" |
*
* @param {Menu_Haptics_OffInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_haptics_off = /** @type {((inputs?: Menu_Haptics_OffInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_Haptics_OffInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_haptics_off(inputs)
	if (locale === "fr") return __fr.menu_haptics_off(inputs)
	if (locale === "es") return __es.menu_haptics_off(inputs)
	if (locale === "zh") return __zh.menu_haptics_off(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_haptics_off(inputs)
	if (locale === "hi") return __hi.menu_haptics_off(inputs)
	if (locale === "ar") return __ar.menu_haptics_off(inputs)
	if (locale === "pt") return __pt.menu_haptics_off(inputs)
	if (locale === "de") return __de.menu_haptics_off(inputs)
	if (locale === "ja") return __ja.menu_haptics_off(inputs)
	if (locale === "ko") return __ko.menu_haptics_off(inputs)
	if (locale === "it") return __it.menu_haptics_off(inputs)
	if (locale === "tr") return __tr.menu_haptics_off(inputs)
	if (locale === "pl") return __pl.menu_haptics_off(inputs)
	if (locale === "uk") return __uk.menu_haptics_off(inputs)
	if (locale === "nl") return __nl.menu_haptics_off(inputs)
	if (locale === "vi") return __vi.menu_haptics_off(inputs)
	if (locale === "id") return __id.menu_haptics_off(inputs)
	if (locale === "ms") return __ms.menu_haptics_off(inputs)
	if (locale === "th") return __th.menu_haptics_off(inputs)
	if (locale === "fa") return __fa.menu_haptics_off(inputs)
	if (locale === "ur") return __ur.menu_haptics_off(inputs)
	if (locale === "bn") return __bn.menu_haptics_off(inputs)
	if (locale === "pa") return __pa.menu_haptics_off(inputs)
	if (locale === "sw") return __sw.menu_haptics_off(inputs)
	if (locale === "el") return __el.menu_haptics_off(inputs)
	if (locale === "cs") return __cs.menu_haptics_off(inputs)
	if (locale === "ro") return __ro.menu_haptics_off(inputs)
	if (locale === "hu") return __hu.menu_haptics_off(inputs)
	if (locale === "sv") return __sv.menu_haptics_off(inputs)
	if (locale === "he") return __he.menu_haptics_off(inputs)
	return __ru.menu_haptics_off(inputs)
});
/**
* | output |
* | --- |
* | "On" |
*
* @param {Menu_Haptics_OnInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_haptics_on = /** @type {((inputs?: Menu_Haptics_OnInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_Haptics_OnInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_haptics_on(inputs)
	if (locale === "fr") return __fr.menu_haptics_on(inputs)
	if (locale === "es") return __es.menu_haptics_on(inputs)
	if (locale === "zh") return __zh.menu_haptics_on(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_haptics_on(inputs)
	if (locale === "hi") return __hi.menu_haptics_on(inputs)
	if (locale === "ar") return __ar.menu_haptics_on(inputs)
	if (locale === "pt") return __pt.menu_haptics_on(inputs)
	if (locale === "de") return __de.menu_haptics_on(inputs)
	if (locale === "ja") return __ja.menu_haptics_on(inputs)
	if (locale === "ko") return __ko.menu_haptics_on(inputs)
	if (locale === "it") return __it.menu_haptics_on(inputs)
	if (locale === "tr") return __tr.menu_haptics_on(inputs)
	if (locale === "pl") return __pl.menu_haptics_on(inputs)
	if (locale === "uk") return __uk.menu_haptics_on(inputs)
	if (locale === "nl") return __nl.menu_haptics_on(inputs)
	if (locale === "vi") return __vi.menu_haptics_on(inputs)
	if (locale === "id") return __id.menu_haptics_on(inputs)
	if (locale === "ms") return __ms.menu_haptics_on(inputs)
	if (locale === "th") return __th.menu_haptics_on(inputs)
	if (locale === "fa") return __fa.menu_haptics_on(inputs)
	if (locale === "ur") return __ur.menu_haptics_on(inputs)
	if (locale === "bn") return __bn.menu_haptics_on(inputs)
	if (locale === "pa") return __pa.menu_haptics_on(inputs)
	if (locale === "sw") return __sw.menu_haptics_on(inputs)
	if (locale === "el") return __el.menu_haptics_on(inputs)
	if (locale === "cs") return __cs.menu_haptics_on(inputs)
	if (locale === "ro") return __ro.menu_haptics_on(inputs)
	if (locale === "hu") return __hu.menu_haptics_on(inputs)
	if (locale === "sv") return __sv.menu_haptics_on(inputs)
	if (locale === "he") return __he.menu_haptics_on(inputs)
	return __ru.menu_haptics_on(inputs)
});
/**
* | output |
* | --- |
* | "Add to your phone home screen" |
*
* @param {Menu_Install_HintInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_install_hint = /** @type {((inputs?: Menu_Install_HintInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_Install_HintInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_install_hint(inputs)
	if (locale === "fr") return __fr.menu_install_hint(inputs)
	if (locale === "es") return __es.menu_install_hint(inputs)
	if (locale === "zh") return __zh.menu_install_hint(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_install_hint(inputs)
	if (locale === "hi") return __hi.menu_install_hint(inputs)
	if (locale === "ar") return __ar.menu_install_hint(inputs)
	if (locale === "pt") return __pt.menu_install_hint(inputs)
	if (locale === "de") return __de.menu_install_hint(inputs)
	if (locale === "ja") return __ja.menu_install_hint(inputs)
	if (locale === "ko") return __ko.menu_install_hint(inputs)
	if (locale === "it") return __it.menu_install_hint(inputs)
	if (locale === "tr") return __tr.menu_install_hint(inputs)
	if (locale === "pl") return __pl.menu_install_hint(inputs)
	if (locale === "uk") return __uk.menu_install_hint(inputs)
	if (locale === "nl") return __nl.menu_install_hint(inputs)
	if (locale === "vi") return __vi.menu_install_hint(inputs)
	if (locale === "id") return __id.menu_install_hint(inputs)
	if (locale === "ms") return __ms.menu_install_hint(inputs)
	if (locale === "th") return __th.menu_install_hint(inputs)
	if (locale === "fa") return __fa.menu_install_hint(inputs)
	if (locale === "ur") return __ur.menu_install_hint(inputs)
	if (locale === "bn") return __bn.menu_install_hint(inputs)
	if (locale === "pa") return __pa.menu_install_hint(inputs)
	if (locale === "sw") return __sw.menu_install_hint(inputs)
	if (locale === "el") return __el.menu_install_hint(inputs)
	if (locale === "cs") return __cs.menu_install_hint(inputs)
	if (locale === "ro") return __ro.menu_install_hint(inputs)
	if (locale === "hu") return __hu.menu_install_hint(inputs)
	if (locale === "sv") return __sv.menu_install_hint(inputs)
	if (locale === "he") return __he.menu_install_hint(inputs)
	return __ru.menu_install_hint(inputs)
});
/**
* | output |
* | --- |
* | "Language" |
*
* @param {Menu_LanguageInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_language = /** @type {((inputs?: Menu_LanguageInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_LanguageInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_language(inputs)
	if (locale === "fr") return __fr.menu_language(inputs)
	if (locale === "es") return __es.menu_language(inputs)
	if (locale === "zh") return __zh.menu_language(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_language(inputs)
	if (locale === "hi") return __hi.menu_language(inputs)
	if (locale === "ar") return __ar.menu_language(inputs)
	if (locale === "pt") return __pt.menu_language(inputs)
	if (locale === "de") return __de.menu_language(inputs)
	if (locale === "ja") return __ja.menu_language(inputs)
	if (locale === "ko") return __ko.menu_language(inputs)
	if (locale === "it") return __it.menu_language(inputs)
	if (locale === "tr") return __tr.menu_language(inputs)
	if (locale === "pl") return __pl.menu_language(inputs)
	if (locale === "uk") return __uk.menu_language(inputs)
	if (locale === "nl") return __nl.menu_language(inputs)
	if (locale === "vi") return __vi.menu_language(inputs)
	if (locale === "id") return __id.menu_language(inputs)
	if (locale === "ms") return __ms.menu_language(inputs)
	if (locale === "th") return __th.menu_language(inputs)
	if (locale === "fa") return __fa.menu_language(inputs)
	if (locale === "ur") return __ur.menu_language(inputs)
	if (locale === "bn") return __bn.menu_language(inputs)
	if (locale === "pa") return __pa.menu_language(inputs)
	if (locale === "sw") return __sw.menu_language(inputs)
	if (locale === "el") return __el.menu_language(inputs)
	if (locale === "cs") return __cs.menu_language(inputs)
	if (locale === "ro") return __ro.menu_language(inputs)
	if (locale === "hu") return __hu.menu_language(inputs)
	if (locale === "sv") return __sv.menu_language(inputs)
	if (locale === "he") return __he.menu_language(inputs)
	return __ru.menu_language(inputs)
});
/**
* | output |
* | --- |
* | "App interface" |
*
* @param {Menu_Language_HintInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_language_hint = /** @type {((inputs?: Menu_Language_HintInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_Language_HintInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_language_hint(inputs)
	if (locale === "fr") return __fr.menu_language_hint(inputs)
	if (locale === "es") return __es.menu_language_hint(inputs)
	if (locale === "zh") return __zh.menu_language_hint(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_language_hint(inputs)
	if (locale === "hi") return __hi.menu_language_hint(inputs)
	if (locale === "ar") return __ar.menu_language_hint(inputs)
	if (locale === "pt") return __pt.menu_language_hint(inputs)
	if (locale === "de") return __de.menu_language_hint(inputs)
	if (locale === "ja") return __ja.menu_language_hint(inputs)
	if (locale === "ko") return __ko.menu_language_hint(inputs)
	if (locale === "it") return __it.menu_language_hint(inputs)
	if (locale === "tr") return __tr.menu_language_hint(inputs)
	if (locale === "pl") return __pl.menu_language_hint(inputs)
	if (locale === "uk") return __uk.menu_language_hint(inputs)
	if (locale === "nl") return __nl.menu_language_hint(inputs)
	if (locale === "vi") return __vi.menu_language_hint(inputs)
	if (locale === "id") return __id.menu_language_hint(inputs)
	if (locale === "ms") return __ms.menu_language_hint(inputs)
	if (locale === "th") return __th.menu_language_hint(inputs)
	if (locale === "fa") return __fa.menu_language_hint(inputs)
	if (locale === "ur") return __ur.menu_language_hint(inputs)
	if (locale === "bn") return __bn.menu_language_hint(inputs)
	if (locale === "pa") return __pa.menu_language_hint(inputs)
	if (locale === "sw") return __sw.menu_language_hint(inputs)
	if (locale === "el") return __el.menu_language_hint(inputs)
	if (locale === "cs") return __cs.menu_language_hint(inputs)
	if (locale === "ro") return __ro.menu_language_hint(inputs)
	if (locale === "hu") return __hu.menu_language_hint(inputs)
	if (locale === "sv") return __sv.menu_language_hint(inputs)
	if (locale === "he") return __he.menu_language_hint(inputs)
	return __ru.menu_language_hint(inputs)
});
/**
* | output |
* | --- |
* | "Sound, day and night, home-screen shortcut." |
*
* @param {Menu_LeadInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_lead = /** @type {((inputs?: Menu_LeadInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_LeadInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_lead(inputs)
	if (locale === "fr") return __fr.menu_lead(inputs)
	if (locale === "es") return __es.menu_lead(inputs)
	if (locale === "zh") return __zh.menu_lead(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_lead(inputs)
	if (locale === "hi") return __hi.menu_lead(inputs)
	if (locale === "ar") return __ar.menu_lead(inputs)
	if (locale === "pt") return __pt.menu_lead(inputs)
	if (locale === "de") return __de.menu_lead(inputs)
	if (locale === "ja") return __ja.menu_lead(inputs)
	if (locale === "ko") return __ko.menu_lead(inputs)
	if (locale === "it") return __it.menu_lead(inputs)
	if (locale === "tr") return __tr.menu_lead(inputs)
	if (locale === "pl") return __pl.menu_lead(inputs)
	if (locale === "uk") return __uk.menu_lead(inputs)
	if (locale === "nl") return __nl.menu_lead(inputs)
	if (locale === "vi") return __vi.menu_lead(inputs)
	if (locale === "id") return __id.menu_lead(inputs)
	if (locale === "ms") return __ms.menu_lead(inputs)
	if (locale === "th") return __th.menu_lead(inputs)
	if (locale === "fa") return __fa.menu_lead(inputs)
	if (locale === "ur") return __ur.menu_lead(inputs)
	if (locale === "bn") return __bn.menu_lead(inputs)
	if (locale === "pa") return __pa.menu_lead(inputs)
	if (locale === "sw") return __sw.menu_lead(inputs)
	if (locale === "el") return __el.menu_lead(inputs)
	if (locale === "cs") return __cs.menu_lead(inputs)
	if (locale === "ro") return __ro.menu_lead(inputs)
	if (locale === "hu") return __hu.menu_lead(inputs)
	if (locale === "sv") return __sv.menu_lead(inputs)
	if (locale === "he") return __he.menu_lead(inputs)
	return __ru.menu_lead(inputs)
});
/**
* | output |
* | --- |
* | "Profile" |
*
* @param {Menu_Profile_CardInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_profile_card = /** @type {((inputs?: Menu_Profile_CardInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_Profile_CardInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_profile_card(inputs)
	if (locale === "fr") return __fr.menu_profile_card(inputs)
	if (locale === "es") return __es.menu_profile_card(inputs)
	if (locale === "zh") return __zh.menu_profile_card(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_profile_card(inputs)
	if (locale === "hi") return __hi.menu_profile_card(inputs)
	if (locale === "ar") return __ar.menu_profile_card(inputs)
	if (locale === "pt") return __pt.menu_profile_card(inputs)
	if (locale === "de") return __de.menu_profile_card(inputs)
	if (locale === "ja") return __ja.menu_profile_card(inputs)
	if (locale === "ko") return __ko.menu_profile_card(inputs)
	if (locale === "it") return __it.menu_profile_card(inputs)
	if (locale === "tr") return __tr.menu_profile_card(inputs)
	if (locale === "pl") return __pl.menu_profile_card(inputs)
	if (locale === "uk") return __uk.menu_profile_card(inputs)
	if (locale === "nl") return __nl.menu_profile_card(inputs)
	if (locale === "vi") return __vi.menu_profile_card(inputs)
	if (locale === "id") return __id.menu_profile_card(inputs)
	if (locale === "ms") return __ms.menu_profile_card(inputs)
	if (locale === "th") return __th.menu_profile_card(inputs)
	if (locale === "fa") return __fa.menu_profile_card(inputs)
	if (locale === "ur") return __ur.menu_profile_card(inputs)
	if (locale === "bn") return __bn.menu_profile_card(inputs)
	if (locale === "pa") return __pa.menu_profile_card(inputs)
	if (locale === "sw") return __sw.menu_profile_card(inputs)
	if (locale === "el") return __el.menu_profile_card(inputs)
	if (locale === "cs") return __cs.menu_profile_card(inputs)
	if (locale === "ro") return __ro.menu_profile_card(inputs)
	if (locale === "hu") return __hu.menu_profile_card(inputs)
	if (locale === "sv") return __sv.menu_profile_card(inputs)
	if (locale === "he") return __he.menu_profile_card(inputs)
	return __ru.menu_profile_card(inputs)
});
/**
* | output |
* | --- |
* | "Account and listings" |
*
* @param {Menu_Profile_MetaInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_profile_meta = /** @type {((inputs?: Menu_Profile_MetaInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_Profile_MetaInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_profile_meta(inputs)
	if (locale === "fr") return __fr.menu_profile_meta(inputs)
	if (locale === "es") return __es.menu_profile_meta(inputs)
	if (locale === "zh") return __zh.menu_profile_meta(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_profile_meta(inputs)
	if (locale === "hi") return __hi.menu_profile_meta(inputs)
	if (locale === "ar") return __ar.menu_profile_meta(inputs)
	if (locale === "pt") return __pt.menu_profile_meta(inputs)
	if (locale === "de") return __de.menu_profile_meta(inputs)
	if (locale === "ja") return __ja.menu_profile_meta(inputs)
	if (locale === "ko") return __ko.menu_profile_meta(inputs)
	if (locale === "it") return __it.menu_profile_meta(inputs)
	if (locale === "tr") return __tr.menu_profile_meta(inputs)
	if (locale === "pl") return __pl.menu_profile_meta(inputs)
	if (locale === "uk") return __uk.menu_profile_meta(inputs)
	if (locale === "nl") return __nl.menu_profile_meta(inputs)
	if (locale === "vi") return __vi.menu_profile_meta(inputs)
	if (locale === "id") return __id.menu_profile_meta(inputs)
	if (locale === "ms") return __ms.menu_profile_meta(inputs)
	if (locale === "th") return __th.menu_profile_meta(inputs)
	if (locale === "fa") return __fa.menu_profile_meta(inputs)
	if (locale === "ur") return __ur.menu_profile_meta(inputs)
	if (locale === "bn") return __bn.menu_profile_meta(inputs)
	if (locale === "pa") return __pa.menu_profile_meta(inputs)
	if (locale === "sw") return __sw.menu_profile_meta(inputs)
	if (locale === "el") return __el.menu_profile_meta(inputs)
	if (locale === "cs") return __cs.menu_profile_meta(inputs)
	if (locale === "ro") return __ro.menu_profile_meta(inputs)
	if (locale === "hu") return __hu.menu_profile_meta(inputs)
	if (locale === "sv") return __sv.menu_profile_meta(inputs)
	if (locale === "he") return __he.menu_profile_meta(inputs)
	return __ru.menu_profile_meta(inputs)
});
/**
* | output |
* | --- |
* | "Save" |
*
* @param {Menu_Save_LanguageInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_save_language = /** @type {((inputs?: Menu_Save_LanguageInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_Save_LanguageInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_save_language(inputs)
	if (locale === "fr") return __fr.menu_save_language(inputs)
	if (locale === "es") return __es.menu_save_language(inputs)
	if (locale === "zh") return __zh.menu_save_language(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_save_language(inputs)
	if (locale === "hi") return __hi.menu_save_language(inputs)
	if (locale === "ar") return __ar.menu_save_language(inputs)
	if (locale === "pt") return __pt.menu_save_language(inputs)
	if (locale === "de") return __de.menu_save_language(inputs)
	if (locale === "ja") return __ja.menu_save_language(inputs)
	if (locale === "ko") return __ko.menu_save_language(inputs)
	if (locale === "it") return __it.menu_save_language(inputs)
	if (locale === "tr") return __tr.menu_save_language(inputs)
	if (locale === "pl") return __pl.menu_save_language(inputs)
	if (locale === "uk") return __uk.menu_save_language(inputs)
	if (locale === "nl") return __nl.menu_save_language(inputs)
	if (locale === "vi") return __vi.menu_save_language(inputs)
	if (locale === "id") return __id.menu_save_language(inputs)
	if (locale === "ms") return __ms.menu_save_language(inputs)
	if (locale === "th") return __th.menu_save_language(inputs)
	if (locale === "fa") return __fa.menu_save_language(inputs)
	if (locale === "ur") return __ur.menu_save_language(inputs)
	if (locale === "bn") return __bn.menu_save_language(inputs)
	if (locale === "pa") return __pa.menu_save_language(inputs)
	if (locale === "sw") return __sw.menu_save_language(inputs)
	if (locale === "el") return __el.menu_save_language(inputs)
	if (locale === "cs") return __cs.menu_save_language(inputs)
	if (locale === "ro") return __ro.menu_save_language(inputs)
	if (locale === "hu") return __hu.menu_save_language(inputs)
	if (locale === "sv") return __sv.menu_save_language(inputs)
	if (locale === "he") return __he.menu_save_language(inputs)
	return __ru.menu_save_language(inputs)
});
/**
* | output |
* | --- |
* | "Profile, listing and settings" |
*
* @param {Menu_Section_CaptionInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_section_caption = /** @type {((inputs?: Menu_Section_CaptionInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_Section_CaptionInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_section_caption(inputs)
	if (locale === "fr") return __fr.menu_section_caption(inputs)
	if (locale === "es") return __es.menu_section_caption(inputs)
	if (locale === "zh") return __zh.menu_section_caption(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_section_caption(inputs)
	if (locale === "hi") return __hi.menu_section_caption(inputs)
	if (locale === "ar") return __ar.menu_section_caption(inputs)
	if (locale === "pt") return __pt.menu_section_caption(inputs)
	if (locale === "de") return __de.menu_section_caption(inputs)
	if (locale === "ja") return __ja.menu_section_caption(inputs)
	if (locale === "ko") return __ko.menu_section_caption(inputs)
	if (locale === "it") return __it.menu_section_caption(inputs)
	if (locale === "tr") return __tr.menu_section_caption(inputs)
	if (locale === "pl") return __pl.menu_section_caption(inputs)
	if (locale === "uk") return __uk.menu_section_caption(inputs)
	if (locale === "nl") return __nl.menu_section_caption(inputs)
	if (locale === "vi") return __vi.menu_section_caption(inputs)
	if (locale === "id") return __id.menu_section_caption(inputs)
	if (locale === "ms") return __ms.menu_section_caption(inputs)
	if (locale === "th") return __th.menu_section_caption(inputs)
	if (locale === "fa") return __fa.menu_section_caption(inputs)
	if (locale === "ur") return __ur.menu_section_caption(inputs)
	if (locale === "bn") return __bn.menu_section_caption(inputs)
	if (locale === "pa") return __pa.menu_section_caption(inputs)
	if (locale === "sw") return __sw.menu_section_caption(inputs)
	if (locale === "el") return __el.menu_section_caption(inputs)
	if (locale === "cs") return __cs.menu_section_caption(inputs)
	if (locale === "ro") return __ro.menu_section_caption(inputs)
	if (locale === "hu") return __hu.menu_section_caption(inputs)
	if (locale === "sv") return __sv.menu_section_caption(inputs)
	if (locale === "he") return __he.menu_section_caption(inputs)
	return __ru.menu_section_caption(inputs)
});
/**
* | output |
* | --- |
* | "Sound" |
*
* @param {Menu_SoundInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_sound = /** @type {((inputs?: Menu_SoundInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_SoundInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_sound(inputs)
	if (locale === "fr") return __fr.menu_sound(inputs)
	if (locale === "es") return __es.menu_sound(inputs)
	if (locale === "zh") return __zh.menu_sound(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_sound(inputs)
	if (locale === "hi") return __hi.menu_sound(inputs)
	if (locale === "ar") return __ar.menu_sound(inputs)
	if (locale === "pt") return __pt.menu_sound(inputs)
	if (locale === "de") return __de.menu_sound(inputs)
	if (locale === "ja") return __ja.menu_sound(inputs)
	if (locale === "ko") return __ko.menu_sound(inputs)
	if (locale === "it") return __it.menu_sound(inputs)
	if (locale === "tr") return __tr.menu_sound(inputs)
	if (locale === "pl") return __pl.menu_sound(inputs)
	if (locale === "uk") return __uk.menu_sound(inputs)
	if (locale === "nl") return __nl.menu_sound(inputs)
	if (locale === "vi") return __vi.menu_sound(inputs)
	if (locale === "id") return __id.menu_sound(inputs)
	if (locale === "ms") return __ms.menu_sound(inputs)
	if (locale === "th") return __th.menu_sound(inputs)
	if (locale === "fa") return __fa.menu_sound(inputs)
	if (locale === "ur") return __ur.menu_sound(inputs)
	if (locale === "bn") return __bn.menu_sound(inputs)
	if (locale === "pa") return __pa.menu_sound(inputs)
	if (locale === "sw") return __sw.menu_sound(inputs)
	if (locale === "el") return __el.menu_sound(inputs)
	if (locale === "cs") return __cs.menu_sound(inputs)
	if (locale === "ro") return __ro.menu_sound(inputs)
	if (locale === "hu") return __hu.menu_sound(inputs)
	if (locale === "sv") return __sv.menu_sound(inputs)
	if (locale === "he") return __he.menu_sound(inputs)
	return __ru.menu_sound(inputs)
});
/**
* | output |
* | --- |
* | "Off" |
*
* @param {Menu_Sound_OffInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_sound_off = /** @type {((inputs?: Menu_Sound_OffInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_Sound_OffInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_sound_off(inputs)
	if (locale === "fr") return __fr.menu_sound_off(inputs)
	if (locale === "es") return __es.menu_sound_off(inputs)
	if (locale === "zh") return __zh.menu_sound_off(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_sound_off(inputs)
	if (locale === "hi") return __hi.menu_sound_off(inputs)
	if (locale === "ar") return __ar.menu_sound_off(inputs)
	if (locale === "pt") return __pt.menu_sound_off(inputs)
	if (locale === "de") return __de.menu_sound_off(inputs)
	if (locale === "ja") return __ja.menu_sound_off(inputs)
	if (locale === "ko") return __ko.menu_sound_off(inputs)
	if (locale === "it") return __it.menu_sound_off(inputs)
	if (locale === "tr") return __tr.menu_sound_off(inputs)
	if (locale === "pl") return __pl.menu_sound_off(inputs)
	if (locale === "uk") return __uk.menu_sound_off(inputs)
	if (locale === "nl") return __nl.menu_sound_off(inputs)
	if (locale === "vi") return __vi.menu_sound_off(inputs)
	if (locale === "id") return __id.menu_sound_off(inputs)
	if (locale === "ms") return __ms.menu_sound_off(inputs)
	if (locale === "th") return __th.menu_sound_off(inputs)
	if (locale === "fa") return __fa.menu_sound_off(inputs)
	if (locale === "ur") return __ur.menu_sound_off(inputs)
	if (locale === "bn") return __bn.menu_sound_off(inputs)
	if (locale === "pa") return __pa.menu_sound_off(inputs)
	if (locale === "sw") return __sw.menu_sound_off(inputs)
	if (locale === "el") return __el.menu_sound_off(inputs)
	if (locale === "cs") return __cs.menu_sound_off(inputs)
	if (locale === "ro") return __ro.menu_sound_off(inputs)
	if (locale === "hu") return __hu.menu_sound_off(inputs)
	if (locale === "sv") return __sv.menu_sound_off(inputs)
	if (locale === "he") return __he.menu_sound_off(inputs)
	return __ru.menu_sound_off(inputs)
});
/**
* | output |
* | --- |
* | "On" |
*
* @param {Menu_Sound_OnInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_sound_on = /** @type {((inputs?: Menu_Sound_OnInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_Sound_OnInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_sound_on(inputs)
	if (locale === "fr") return __fr.menu_sound_on(inputs)
	if (locale === "es") return __es.menu_sound_on(inputs)
	if (locale === "zh") return __zh.menu_sound_on(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_sound_on(inputs)
	if (locale === "hi") return __hi.menu_sound_on(inputs)
	if (locale === "ar") return __ar.menu_sound_on(inputs)
	if (locale === "pt") return __pt.menu_sound_on(inputs)
	if (locale === "de") return __de.menu_sound_on(inputs)
	if (locale === "ja") return __ja.menu_sound_on(inputs)
	if (locale === "ko") return __ko.menu_sound_on(inputs)
	if (locale === "it") return __it.menu_sound_on(inputs)
	if (locale === "tr") return __tr.menu_sound_on(inputs)
	if (locale === "pl") return __pl.menu_sound_on(inputs)
	if (locale === "uk") return __uk.menu_sound_on(inputs)
	if (locale === "nl") return __nl.menu_sound_on(inputs)
	if (locale === "vi") return __vi.menu_sound_on(inputs)
	if (locale === "id") return __id.menu_sound_on(inputs)
	if (locale === "ms") return __ms.menu_sound_on(inputs)
	if (locale === "th") return __th.menu_sound_on(inputs)
	if (locale === "fa") return __fa.menu_sound_on(inputs)
	if (locale === "ur") return __ur.menu_sound_on(inputs)
	if (locale === "bn") return __bn.menu_sound_on(inputs)
	if (locale === "pa") return __pa.menu_sound_on(inputs)
	if (locale === "sw") return __sw.menu_sound_on(inputs)
	if (locale === "el") return __el.menu_sound_on(inputs)
	if (locale === "cs") return __cs.menu_sound_on(inputs)
	if (locale === "ro") return __ro.menu_sound_on(inputs)
	if (locale === "hu") return __hu.menu_sound_on(inputs)
	if (locale === "sv") return __sv.menu_sound_on(inputs)
	if (locale === "he") return __he.menu_sound_on(inputs)
	return __ru.menu_sound_on(inputs)
});
/**
* | output |
* | --- |
* | "Test sound" |
*
* @param {Menu_Sound_TestInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_sound_test = /** @type {((inputs?: Menu_Sound_TestInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_Sound_TestInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_sound_test(inputs)
	if (locale === "fr") return __fr.menu_sound_test(inputs)
	if (locale === "es") return __es.menu_sound_test(inputs)
	if (locale === "zh") return __zh.menu_sound_test(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_sound_test(inputs)
	if (locale === "hi") return __hi.menu_sound_test(inputs)
	if (locale === "ar") return __ar.menu_sound_test(inputs)
	if (locale === "pt") return __pt.menu_sound_test(inputs)
	if (locale === "de") return __de.menu_sound_test(inputs)
	if (locale === "ja") return __ja.menu_sound_test(inputs)
	if (locale === "ko") return __ko.menu_sound_test(inputs)
	if (locale === "it") return __it.menu_sound_test(inputs)
	if (locale === "tr") return __tr.menu_sound_test(inputs)
	if (locale === "pl") return __pl.menu_sound_test(inputs)
	if (locale === "uk") return __uk.menu_sound_test(inputs)
	if (locale === "nl") return __nl.menu_sound_test(inputs)
	if (locale === "vi") return __vi.menu_sound_test(inputs)
	if (locale === "id") return __id.menu_sound_test(inputs)
	if (locale === "ms") return __ms.menu_sound_test(inputs)
	if (locale === "th") return __th.menu_sound_test(inputs)
	if (locale === "fa") return __fa.menu_sound_test(inputs)
	if (locale === "ur") return __ur.menu_sound_test(inputs)
	if (locale === "bn") return __bn.menu_sound_test(inputs)
	if (locale === "pa") return __pa.menu_sound_test(inputs)
	if (locale === "sw") return __sw.menu_sound_test(inputs)
	if (locale === "el") return __el.menu_sound_test(inputs)
	if (locale === "cs") return __cs.menu_sound_test(inputs)
	if (locale === "ro") return __ro.menu_sound_test(inputs)
	if (locale === "hu") return __hu.menu_sound_test(inputs)
	if (locale === "sv") return __sv.menu_sound_test(inputs)
	if (locale === "he") return __he.menu_sound_test(inputs)
	return __ru.menu_sound_test(inputs)
});
/**
* | output |
* | --- |
* | "Short signal" |
*
* @param {Menu_Sound_Test_HintInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_sound_test_hint = /** @type {((inputs?: Menu_Sound_Test_HintInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_Sound_Test_HintInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_sound_test_hint(inputs)
	if (locale === "fr") return __fr.menu_sound_test_hint(inputs)
	if (locale === "es") return __es.menu_sound_test_hint(inputs)
	if (locale === "zh") return __zh.menu_sound_test_hint(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_sound_test_hint(inputs)
	if (locale === "hi") return __hi.menu_sound_test_hint(inputs)
	if (locale === "ar") return __ar.menu_sound_test_hint(inputs)
	if (locale === "pt") return __pt.menu_sound_test_hint(inputs)
	if (locale === "de") return __de.menu_sound_test_hint(inputs)
	if (locale === "ja") return __ja.menu_sound_test_hint(inputs)
	if (locale === "ko") return __ko.menu_sound_test_hint(inputs)
	if (locale === "it") return __it.menu_sound_test_hint(inputs)
	if (locale === "tr") return __tr.menu_sound_test_hint(inputs)
	if (locale === "pl") return __pl.menu_sound_test_hint(inputs)
	if (locale === "uk") return __uk.menu_sound_test_hint(inputs)
	if (locale === "nl") return __nl.menu_sound_test_hint(inputs)
	if (locale === "vi") return __vi.menu_sound_test_hint(inputs)
	if (locale === "id") return __id.menu_sound_test_hint(inputs)
	if (locale === "ms") return __ms.menu_sound_test_hint(inputs)
	if (locale === "th") return __th.menu_sound_test_hint(inputs)
	if (locale === "fa") return __fa.menu_sound_test_hint(inputs)
	if (locale === "ur") return __ur.menu_sound_test_hint(inputs)
	if (locale === "bn") return __bn.menu_sound_test_hint(inputs)
	if (locale === "pa") return __pa.menu_sound_test_hint(inputs)
	if (locale === "sw") return __sw.menu_sound_test_hint(inputs)
	if (locale === "el") return __el.menu_sound_test_hint(inputs)
	if (locale === "cs") return __cs.menu_sound_test_hint(inputs)
	if (locale === "ro") return __ro.menu_sound_test_hint(inputs)
	if (locale === "hu") return __hu.menu_sound_test_hint(inputs)
	if (locale === "sv") return __sv.menu_sound_test_hint(inputs)
	if (locale === "he") return __he.menu_sound_test_hint(inputs)
	return __ru.menu_sound_test_hint(inputs)
});
/**
* | output |
* | --- |
* | "Pedometer" |
*
* @param {Menu_Steps_CardInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_steps_card = /** @type {((inputs?: Menu_Steps_CardInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_Steps_CardInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_steps_card(inputs)
	if (locale === "fr") return __fr.menu_steps_card(inputs)
	if (locale === "es") return __es.menu_steps_card(inputs)
	if (locale === "zh") return __zh.menu_steps_card(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_steps_card(inputs)
	if (locale === "hi") return __hi.menu_steps_card(inputs)
	if (locale === "ar") return __ar.menu_steps_card(inputs)
	if (locale === "pt") return __pt.menu_steps_card(inputs)
	if (locale === "de") return __de.menu_steps_card(inputs)
	if (locale === "ja") return __ja.menu_steps_card(inputs)
	if (locale === "ko") return __ko.menu_steps_card(inputs)
	if (locale === "it") return __it.menu_steps_card(inputs)
	if (locale === "tr") return __tr.menu_steps_card(inputs)
	if (locale === "pl") return __pl.menu_steps_card(inputs)
	if (locale === "uk") return __uk.menu_steps_card(inputs)
	if (locale === "nl") return __nl.menu_steps_card(inputs)
	if (locale === "vi") return __vi.menu_steps_card(inputs)
	if (locale === "id") return __id.menu_steps_card(inputs)
	if (locale === "ms") return __ms.menu_steps_card(inputs)
	if (locale === "th") return __th.menu_steps_card(inputs)
	if (locale === "fa") return __fa.menu_steps_card(inputs)
	if (locale === "ur") return __ur.menu_steps_card(inputs)
	if (locale === "bn") return __bn.menu_steps_card(inputs)
	if (locale === "pa") return __pa.menu_steps_card(inputs)
	if (locale === "sw") return __sw.menu_steps_card(inputs)
	if (locale === "el") return __el.menu_steps_card(inputs)
	if (locale === "cs") return __cs.menu_steps_card(inputs)
	if (locale === "ro") return __ro.menu_steps_card(inputs)
	if (locale === "hu") return __hu.menu_steps_card(inputs)
	if (locale === "sv") return __sv.menu_steps_card(inputs)
	if (locale === "he") return __he.menu_steps_card(inputs)
	return __ru.menu_steps_card(inputs)
});
/**
* | output |
* | --- |
* | "10,000 steps a day" |
*
* @param {Menu_Steps_MetaInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_steps_meta = /** @type {((inputs?: Menu_Steps_MetaInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_Steps_MetaInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_steps_meta(inputs)
	if (locale === "fr") return __fr.menu_steps_meta(inputs)
	if (locale === "es") return __es.menu_steps_meta(inputs)
	if (locale === "zh") return __zh.menu_steps_meta(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_steps_meta(inputs)
	if (locale === "hi") return __hi.menu_steps_meta(inputs)
	if (locale === "ar") return __ar.menu_steps_meta(inputs)
	if (locale === "pt") return __pt.menu_steps_meta(inputs)
	if (locale === "de") return __de.menu_steps_meta(inputs)
	if (locale === "ja") return __ja.menu_steps_meta(inputs)
	if (locale === "ko") return __ko.menu_steps_meta(inputs)
	if (locale === "it") return __it.menu_steps_meta(inputs)
	if (locale === "tr") return __tr.menu_steps_meta(inputs)
	if (locale === "pl") return __pl.menu_steps_meta(inputs)
	if (locale === "uk") return __uk.menu_steps_meta(inputs)
	if (locale === "nl") return __nl.menu_steps_meta(inputs)
	if (locale === "vi") return __vi.menu_steps_meta(inputs)
	if (locale === "id") return __id.menu_steps_meta(inputs)
	if (locale === "ms") return __ms.menu_steps_meta(inputs)
	if (locale === "th") return __th.menu_steps_meta(inputs)
	if (locale === "fa") return __fa.menu_steps_meta(inputs)
	if (locale === "ur") return __ur.menu_steps_meta(inputs)
	if (locale === "bn") return __bn.menu_steps_meta(inputs)
	if (locale === "pa") return __pa.menu_steps_meta(inputs)
	if (locale === "sw") return __sw.menu_steps_meta(inputs)
	if (locale === "el") return __el.menu_steps_meta(inputs)
	if (locale === "cs") return __cs.menu_steps_meta(inputs)
	if (locale === "ro") return __ro.menu_steps_meta(inputs)
	if (locale === "hu") return __hu.menu_steps_meta(inputs)
	if (locale === "sv") return __sv.menu_steps_meta(inputs)
	if (locale === "he") return __he.menu_steps_meta(inputs)
	return __ru.menu_steps_meta(inputs)
});
/**
* | output |
* | --- |
* | "Day and night" |
*
* @param {Menu_ThemeInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_theme = /** @type {((inputs?: Menu_ThemeInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_ThemeInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_theme(inputs)
	if (locale === "fr") return __fr.menu_theme(inputs)
	if (locale === "es") return __es.menu_theme(inputs)
	if (locale === "zh") return __zh.menu_theme(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_theme(inputs)
	if (locale === "hi") return __hi.menu_theme(inputs)
	if (locale === "ar") return __ar.menu_theme(inputs)
	if (locale === "pt") return __pt.menu_theme(inputs)
	if (locale === "de") return __de.menu_theme(inputs)
	if (locale === "ja") return __ja.menu_theme(inputs)
	if (locale === "ko") return __ko.menu_theme(inputs)
	if (locale === "it") return __it.menu_theme(inputs)
	if (locale === "tr") return __tr.menu_theme(inputs)
	if (locale === "pl") return __pl.menu_theme(inputs)
	if (locale === "uk") return __uk.menu_theme(inputs)
	if (locale === "nl") return __nl.menu_theme(inputs)
	if (locale === "vi") return __vi.menu_theme(inputs)
	if (locale === "id") return __id.menu_theme(inputs)
	if (locale === "ms") return __ms.menu_theme(inputs)
	if (locale === "th") return __th.menu_theme(inputs)
	if (locale === "fa") return __fa.menu_theme(inputs)
	if (locale === "ur") return __ur.menu_theme(inputs)
	if (locale === "bn") return __bn.menu_theme(inputs)
	if (locale === "pa") return __pa.menu_theme(inputs)
	if (locale === "sw") return __sw.menu_theme(inputs)
	if (locale === "el") return __el.menu_theme(inputs)
	if (locale === "cs") return __cs.menu_theme(inputs)
	if (locale === "ro") return __ro.menu_theme(inputs)
	if (locale === "hu") return __hu.menu_theme(inputs)
	if (locale === "sv") return __sv.menu_theme(inputs)
	if (locale === "he") return __he.menu_theme(inputs)
	return __ru.menu_theme(inputs)
});
/**
* | output |
* | --- |
* | "Dark now" |
*
* @param {Menu_Theme_DarkInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_theme_dark = /** @type {((inputs?: Menu_Theme_DarkInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_Theme_DarkInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_theme_dark(inputs)
	if (locale === "fr") return __fr.menu_theme_dark(inputs)
	if (locale === "es") return __es.menu_theme_dark(inputs)
	if (locale === "zh") return __zh.menu_theme_dark(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_theme_dark(inputs)
	if (locale === "hi") return __hi.menu_theme_dark(inputs)
	if (locale === "ar") return __ar.menu_theme_dark(inputs)
	if (locale === "pt") return __pt.menu_theme_dark(inputs)
	if (locale === "de") return __de.menu_theme_dark(inputs)
	if (locale === "ja") return __ja.menu_theme_dark(inputs)
	if (locale === "ko") return __ko.menu_theme_dark(inputs)
	if (locale === "it") return __it.menu_theme_dark(inputs)
	if (locale === "tr") return __tr.menu_theme_dark(inputs)
	if (locale === "pl") return __pl.menu_theme_dark(inputs)
	if (locale === "uk") return __uk.menu_theme_dark(inputs)
	if (locale === "nl") return __nl.menu_theme_dark(inputs)
	if (locale === "vi") return __vi.menu_theme_dark(inputs)
	if (locale === "id") return __id.menu_theme_dark(inputs)
	if (locale === "ms") return __ms.menu_theme_dark(inputs)
	if (locale === "th") return __th.menu_theme_dark(inputs)
	if (locale === "fa") return __fa.menu_theme_dark(inputs)
	if (locale === "ur") return __ur.menu_theme_dark(inputs)
	if (locale === "bn") return __bn.menu_theme_dark(inputs)
	if (locale === "pa") return __pa.menu_theme_dark(inputs)
	if (locale === "sw") return __sw.menu_theme_dark(inputs)
	if (locale === "el") return __el.menu_theme_dark(inputs)
	if (locale === "cs") return __cs.menu_theme_dark(inputs)
	if (locale === "ro") return __ro.menu_theme_dark(inputs)
	if (locale === "hu") return __hu.menu_theme_dark(inputs)
	if (locale === "sv") return __sv.menu_theme_dark(inputs)
	if (locale === "he") return __he.menu_theme_dark(inputs)
	return __ru.menu_theme_dark(inputs)
});
/**
* | output |
* | --- |
* | "Light now" |
*
* @param {Menu_Theme_LightInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_theme_light = /** @type {((inputs?: Menu_Theme_LightInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_Theme_LightInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_theme_light(inputs)
	if (locale === "fr") return __fr.menu_theme_light(inputs)
	if (locale === "es") return __es.menu_theme_light(inputs)
	if (locale === "zh") return __zh.menu_theme_light(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_theme_light(inputs)
	if (locale === "hi") return __hi.menu_theme_light(inputs)
	if (locale === "ar") return __ar.menu_theme_light(inputs)
	if (locale === "pt") return __pt.menu_theme_light(inputs)
	if (locale === "de") return __de.menu_theme_light(inputs)
	if (locale === "ja") return __ja.menu_theme_light(inputs)
	if (locale === "ko") return __ko.menu_theme_light(inputs)
	if (locale === "it") return __it.menu_theme_light(inputs)
	if (locale === "tr") return __tr.menu_theme_light(inputs)
	if (locale === "pl") return __pl.menu_theme_light(inputs)
	if (locale === "uk") return __uk.menu_theme_light(inputs)
	if (locale === "nl") return __nl.menu_theme_light(inputs)
	if (locale === "vi") return __vi.menu_theme_light(inputs)
	if (locale === "id") return __id.menu_theme_light(inputs)
	if (locale === "ms") return __ms.menu_theme_light(inputs)
	if (locale === "th") return __th.menu_theme_light(inputs)
	if (locale === "fa") return __fa.menu_theme_light(inputs)
	if (locale === "ur") return __ur.menu_theme_light(inputs)
	if (locale === "bn") return __bn.menu_theme_light(inputs)
	if (locale === "pa") return __pa.menu_theme_light(inputs)
	if (locale === "sw") return __sw.menu_theme_light(inputs)
	if (locale === "el") return __el.menu_theme_light(inputs)
	if (locale === "cs") return __cs.menu_theme_light(inputs)
	if (locale === "ro") return __ro.menu_theme_light(inputs)
	if (locale === "hu") return __hu.menu_theme_light(inputs)
	if (locale === "sv") return __sv.menu_theme_light(inputs)
	if (locale === "he") return __he.menu_theme_light(inputs)
	return __ru.menu_theme_light(inputs)
});
/**
* | output |
* | --- |
* | "Menu" |
*
* @param {Menu_TitleInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const menu_title = /** @type {((inputs?: Menu_TitleInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Menu_TitleInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.menu_title(inputs)
	if (locale === "fr") return __fr.menu_title(inputs)
	if (locale === "es") return __es.menu_title(inputs)
	if (locale === "zh") return __zh.menu_title(inputs)
	if (locale === "zh-TW") return __zh_tw2.menu_title(inputs)
	if (locale === "hi") return __hi.menu_title(inputs)
	if (locale === "ar") return __ar.menu_title(inputs)
	if (locale === "pt") return __pt.menu_title(inputs)
	if (locale === "de") return __de.menu_title(inputs)
	if (locale === "ja") return __ja.menu_title(inputs)
	if (locale === "ko") return __ko.menu_title(inputs)
	if (locale === "it") return __it.menu_title(inputs)
	if (locale === "tr") return __tr.menu_title(inputs)
	if (locale === "pl") return __pl.menu_title(inputs)
	if (locale === "uk") return __uk.menu_title(inputs)
	if (locale === "nl") return __nl.menu_title(inputs)
	if (locale === "vi") return __vi.menu_title(inputs)
	if (locale === "id") return __id.menu_title(inputs)
	if (locale === "ms") return __ms.menu_title(inputs)
	if (locale === "th") return __th.menu_title(inputs)
	if (locale === "fa") return __fa.menu_title(inputs)
	if (locale === "ur") return __ur.menu_title(inputs)
	if (locale === "bn") return __bn.menu_title(inputs)
	if (locale === "pa") return __pa.menu_title(inputs)
	if (locale === "sw") return __sw.menu_title(inputs)
	if (locale === "el") return __el.menu_title(inputs)
	if (locale === "cs") return __cs.menu_title(inputs)
	if (locale === "ro") return __ro.menu_title(inputs)
	if (locale === "hu") return __hu.menu_title(inputs)
	if (locale === "sv") return __sv.menu_title(inputs)
	if (locale === "he") return __he.menu_title(inputs)
	return __ru.menu_title(inputs)
});
/**
* | output |
* | --- |
* | "Chats" |
*
* @param {Nav_ChatsInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const nav_chats = /** @type {((inputs?: Nav_ChatsInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_ChatsInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_chats(inputs)
	if (locale === "fr") return __fr.nav_chats(inputs)
	if (locale === "es") return __es.nav_chats(inputs)
	if (locale === "zh") return __zh.nav_chats(inputs)
	if (locale === "zh-TW") return __zh_tw2.nav_chats(inputs)
	if (locale === "hi") return __hi.nav_chats(inputs)
	if (locale === "ar") return __ar.nav_chats(inputs)
	if (locale === "pt") return __pt.nav_chats(inputs)
	if (locale === "de") return __de.nav_chats(inputs)
	if (locale === "ja") return __ja.nav_chats(inputs)
	if (locale === "ko") return __ko.nav_chats(inputs)
	if (locale === "it") return __it.nav_chats(inputs)
	if (locale === "tr") return __tr.nav_chats(inputs)
	if (locale === "pl") return __pl.nav_chats(inputs)
	if (locale === "uk") return __uk.nav_chats(inputs)
	if (locale === "nl") return __nl.nav_chats(inputs)
	if (locale === "vi") return __vi.nav_chats(inputs)
	if (locale === "id") return __id.nav_chats(inputs)
	if (locale === "ms") return __ms.nav_chats(inputs)
	if (locale === "th") return __th.nav_chats(inputs)
	if (locale === "fa") return __fa.nav_chats(inputs)
	if (locale === "ur") return __ur.nav_chats(inputs)
	if (locale === "bn") return __bn.nav_chats(inputs)
	if (locale === "pa") return __pa.nav_chats(inputs)
	if (locale === "sw") return __sw.nav_chats(inputs)
	if (locale === "el") return __el.nav_chats(inputs)
	if (locale === "cs") return __cs.nav_chats(inputs)
	if (locale === "ro") return __ro.nav_chats(inputs)
	if (locale === "hu") return __hu.nav_chats(inputs)
	if (locale === "sv") return __sv.nav_chats(inputs)
	if (locale === "he") return __he.nav_chats(inputs)
	return __ru.nav_chats(inputs)
});
/**
* | output |
* | --- |
* | "Cities" |
*
* @param {Nav_CitiesInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const nav_cities = /** @type {((inputs?: Nav_CitiesInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_CitiesInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_cities(inputs)
	if (locale === "fr") return __fr.nav_cities(inputs)
	if (locale === "es") return __es.nav_cities(inputs)
	if (locale === "zh") return __zh.nav_cities(inputs)
	if (locale === "zh-TW") return __zh_tw2.nav_cities(inputs)
	if (locale === "hi") return __hi.nav_cities(inputs)
	if (locale === "ar") return __ar.nav_cities(inputs)
	if (locale === "pt") return __pt.nav_cities(inputs)
	if (locale === "de") return __de.nav_cities(inputs)
	if (locale === "ja") return __ja.nav_cities(inputs)
	if (locale === "ko") return __ko.nav_cities(inputs)
	if (locale === "it") return __it.nav_cities(inputs)
	if (locale === "tr") return __tr.nav_cities(inputs)
	if (locale === "pl") return __pl.nav_cities(inputs)
	if (locale === "uk") return __uk.nav_cities(inputs)
	if (locale === "nl") return __nl.nav_cities(inputs)
	if (locale === "vi") return __vi.nav_cities(inputs)
	if (locale === "id") return __id.nav_cities(inputs)
	if (locale === "ms") return __ms.nav_cities(inputs)
	if (locale === "th") return __th.nav_cities(inputs)
	if (locale === "fa") return __fa.nav_cities(inputs)
	if (locale === "ur") return __ur.nav_cities(inputs)
	if (locale === "bn") return __bn.nav_cities(inputs)
	if (locale === "pa") return __pa.nav_cities(inputs)
	if (locale === "sw") return __sw.nav_cities(inputs)
	if (locale === "el") return __el.nav_cities(inputs)
	if (locale === "cs") return __cs.nav_cities(inputs)
	if (locale === "ro") return __ro.nav_cities(inputs)
	if (locale === "hu") return __hu.nav_cities(inputs)
	if (locale === "sv") return __sv.nav_cities(inputs)
	if (locale === "he") return __he.nav_cities(inputs)
	return __ru.nav_cities(inputs)
});
/**
* | output |
* | --- |
* | "Menu" |
*
* @param {Nav_MenuInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const nav_menu = /** @type {((inputs?: Nav_MenuInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_MenuInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_menu(inputs)
	if (locale === "fr") return __fr.nav_menu(inputs)
	if (locale === "es") return __es.nav_menu(inputs)
	if (locale === "zh") return __zh.nav_menu(inputs)
	if (locale === "zh-TW") return __zh_tw2.nav_menu(inputs)
	if (locale === "hi") return __hi.nav_menu(inputs)
	if (locale === "ar") return __ar.nav_menu(inputs)
	if (locale === "pt") return __pt.nav_menu(inputs)
	if (locale === "de") return __de.nav_menu(inputs)
	if (locale === "ja") return __ja.nav_menu(inputs)
	if (locale === "ko") return __ko.nav_menu(inputs)
	if (locale === "it") return __it.nav_menu(inputs)
	if (locale === "tr") return __tr.nav_menu(inputs)
	if (locale === "pl") return __pl.nav_menu(inputs)
	if (locale === "uk") return __uk.nav_menu(inputs)
	if (locale === "nl") return __nl.nav_menu(inputs)
	if (locale === "vi") return __vi.nav_menu(inputs)
	if (locale === "id") return __id.nav_menu(inputs)
	if (locale === "ms") return __ms.nav_menu(inputs)
	if (locale === "th") return __th.nav_menu(inputs)
	if (locale === "fa") return __fa.nav_menu(inputs)
	if (locale === "ur") return __ur.nav_menu(inputs)
	if (locale === "bn") return __bn.nav_menu(inputs)
	if (locale === "pa") return __pa.nav_menu(inputs)
	if (locale === "sw") return __sw.nav_menu(inputs)
	if (locale === "el") return __el.nav_menu(inputs)
	if (locale === "cs") return __cs.nav_menu(inputs)
	if (locale === "ro") return __ro.nav_menu(inputs)
	if (locale === "hu") return __hu.nav_menu(inputs)
	if (locale === "sv") return __sv.nav_menu(inputs)
	if (locale === "he") return __he.nav_menu(inputs)
	return __ru.nav_menu(inputs)
});
/**
* | output |
* | --- |
* | "Search" |
*
* @param {Nav_SearchInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const nav_search = /** @type {((inputs?: Nav_SearchInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Nav_SearchInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.nav_search(inputs)
	if (locale === "fr") return __fr.nav_search(inputs)
	if (locale === "es") return __es.nav_search(inputs)
	if (locale === "zh") return __zh.nav_search(inputs)
	if (locale === "zh-TW") return __zh_tw2.nav_search(inputs)
	if (locale === "hi") return __hi.nav_search(inputs)
	if (locale === "ar") return __ar.nav_search(inputs)
	if (locale === "pt") return __pt.nav_search(inputs)
	if (locale === "de") return __de.nav_search(inputs)
	if (locale === "ja") return __ja.nav_search(inputs)
	if (locale === "ko") return __ko.nav_search(inputs)
	if (locale === "it") return __it.nav_search(inputs)
	if (locale === "tr") return __tr.nav_search(inputs)
	if (locale === "pl") return __pl.nav_search(inputs)
	if (locale === "uk") return __uk.nav_search(inputs)
	if (locale === "nl") return __nl.nav_search(inputs)
	if (locale === "vi") return __vi.nav_search(inputs)
	if (locale === "id") return __id.nav_search(inputs)
	if (locale === "ms") return __ms.nav_search(inputs)
	if (locale === "th") return __th.nav_search(inputs)
	if (locale === "fa") return __fa.nav_search(inputs)
	if (locale === "ur") return __ur.nav_search(inputs)
	if (locale === "bn") return __bn.nav_search(inputs)
	if (locale === "pa") return __pa.nav_search(inputs)
	if (locale === "sw") return __sw.nav_search(inputs)
	if (locale === "el") return __el.nav_search(inputs)
	if (locale === "cs") return __cs.nav_search(inputs)
	if (locale === "ro") return __ro.nav_search(inputs)
	if (locale === "hu") return __hu.nav_search(inputs)
	if (locale === "sv") return __sv.nav_search(inputs)
	if (locale === "he") return __he.nav_search(inputs)
	return __ru.nav_search(inputs)
});
/**
* | output |
* | --- |
* | "Notifications" |
*
* @param {Notifications_TitleInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const notifications_title = /** @type {((inputs?: Notifications_TitleInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Notifications_TitleInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.notifications_title(inputs)
	if (locale === "fr") return __fr.notifications_title(inputs)
	if (locale === "es") return __es.notifications_title(inputs)
	if (locale === "zh") return __zh.notifications_title(inputs)
	if (locale === "zh-TW") return __zh_tw2.notifications_title(inputs)
	if (locale === "hi") return __hi.notifications_title(inputs)
	if (locale === "ar") return __ar.notifications_title(inputs)
	if (locale === "pt") return __pt.notifications_title(inputs)
	if (locale === "de") return __de.notifications_title(inputs)
	if (locale === "ja") return __ja.notifications_title(inputs)
	if (locale === "ko") return __ko.notifications_title(inputs)
	if (locale === "it") return __it.notifications_title(inputs)
	if (locale === "tr") return __tr.notifications_title(inputs)
	if (locale === "pl") return __pl.notifications_title(inputs)
	if (locale === "uk") return __uk.notifications_title(inputs)
	if (locale === "nl") return __nl.notifications_title(inputs)
	if (locale === "vi") return __vi.notifications_title(inputs)
	if (locale === "id") return __id.notifications_title(inputs)
	if (locale === "ms") return __ms.notifications_title(inputs)
	if (locale === "th") return __th.notifications_title(inputs)
	if (locale === "fa") return __fa.notifications_title(inputs)
	if (locale === "ur") return __ur.notifications_title(inputs)
	if (locale === "bn") return __bn.notifications_title(inputs)
	if (locale === "pa") return __pa.notifications_title(inputs)
	if (locale === "sw") return __sw.notifications_title(inputs)
	if (locale === "el") return __el.notifications_title(inputs)
	if (locale === "cs") return __cs.notifications_title(inputs)
	if (locale === "ro") return __ro.notifications_title(inputs)
	if (locale === "hu") return __hu.notifications_title(inputs)
	if (locale === "sv") return __sv.notifications_title(inputs)
	if (locale === "he") return __he.notifications_title(inputs)
	return __ru.notifications_title(inputs)
});
/**
* | output |
* | --- |
* | "Settings" |
*
* @param {Profile_SettingsInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const profile_settings = /** @type {((inputs?: Profile_SettingsInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_SettingsInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_settings(inputs)
	if (locale === "fr") return __fr.profile_settings(inputs)
	if (locale === "es") return __es.profile_settings(inputs)
	if (locale === "zh") return __zh.profile_settings(inputs)
	if (locale === "zh-TW") return __zh_tw2.profile_settings(inputs)
	if (locale === "hi") return __hi.profile_settings(inputs)
	if (locale === "ar") return __ar.profile_settings(inputs)
	if (locale === "pt") return __pt.profile_settings(inputs)
	if (locale === "de") return __de.profile_settings(inputs)
	if (locale === "ja") return __ja.profile_settings(inputs)
	if (locale === "ko") return __ko.profile_settings(inputs)
	if (locale === "it") return __it.profile_settings(inputs)
	if (locale === "tr") return __tr.profile_settings(inputs)
	if (locale === "pl") return __pl.profile_settings(inputs)
	if (locale === "uk") return __uk.profile_settings(inputs)
	if (locale === "nl") return __nl.profile_settings(inputs)
	if (locale === "vi") return __vi.profile_settings(inputs)
	if (locale === "id") return __id.profile_settings(inputs)
	if (locale === "ms") return __ms.profile_settings(inputs)
	if (locale === "th") return __th.profile_settings(inputs)
	if (locale === "fa") return __fa.profile_settings(inputs)
	if (locale === "ur") return __ur.profile_settings(inputs)
	if (locale === "bn") return __bn.profile_settings(inputs)
	if (locale === "pa") return __pa.profile_settings(inputs)
	if (locale === "sw") return __sw.profile_settings(inputs)
	if (locale === "el") return __el.profile_settings(inputs)
	if (locale === "cs") return __cs.profile_settings(inputs)
	if (locale === "ro") return __ro.profile_settings(inputs)
	if (locale === "hu") return __hu.profile_settings(inputs)
	if (locale === "sv") return __sv.profile_settings(inputs)
	if (locale === "he") return __he.profile_settings(inputs)
	return __ru.profile_settings(inputs)
});
/**
* | output |
* | --- |
* | "Sound and shortcut" |
*
* @param {Profile_Settings_SoundInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const profile_settings_sound = /** @type {((inputs?: Profile_Settings_SoundInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Settings_SoundInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_settings_sound(inputs)
	if (locale === "fr") return __fr.profile_settings_sound(inputs)
	if (locale === "es") return __es.profile_settings_sound(inputs)
	if (locale === "zh") return __zh.profile_settings_sound(inputs)
	if (locale === "zh-TW") return __zh_tw2.profile_settings_sound(inputs)
	if (locale === "hi") return __hi.profile_settings_sound(inputs)
	if (locale === "ar") return __ar.profile_settings_sound(inputs)
	if (locale === "pt") return __pt.profile_settings_sound(inputs)
	if (locale === "de") return __de.profile_settings_sound(inputs)
	if (locale === "ja") return __ja.profile_settings_sound(inputs)
	if (locale === "ko") return __ko.profile_settings_sound(inputs)
	if (locale === "it") return __it.profile_settings_sound(inputs)
	if (locale === "tr") return __tr.profile_settings_sound(inputs)
	if (locale === "pl") return __pl.profile_settings_sound(inputs)
	if (locale === "uk") return __uk.profile_settings_sound(inputs)
	if (locale === "nl") return __nl.profile_settings_sound(inputs)
	if (locale === "vi") return __vi.profile_settings_sound(inputs)
	if (locale === "id") return __id.profile_settings_sound(inputs)
	if (locale === "ms") return __ms.profile_settings_sound(inputs)
	if (locale === "th") return __th.profile_settings_sound(inputs)
	if (locale === "fa") return __fa.profile_settings_sound(inputs)
	if (locale === "ur") return __ur.profile_settings_sound(inputs)
	if (locale === "bn") return __bn.profile_settings_sound(inputs)
	if (locale === "pa") return __pa.profile_settings_sound(inputs)
	if (locale === "sw") return __sw.profile_settings_sound(inputs)
	if (locale === "el") return __el.profile_settings_sound(inputs)
	if (locale === "cs") return __cs.profile_settings_sound(inputs)
	if (locale === "ro") return __ro.profile_settings_sound(inputs)
	if (locale === "hu") return __hu.profile_settings_sound(inputs)
	if (locale === "sv") return __sv.profile_settings_sound(inputs)
	if (locale === "he") return __he.profile_settings_sound(inputs)
	return __ru.profile_settings_sound(inputs)
});
/**
* | output |
* | --- |
* | "Profile" |
*
* @param {Profile_TitleInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const profile_title = /** @type {((inputs?: Profile_TitleInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_TitleInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_title(inputs)
	if (locale === "fr") return __fr.profile_title(inputs)
	if (locale === "es") return __es.profile_title(inputs)
	if (locale === "zh") return __zh.profile_title(inputs)
	if (locale === "zh-TW") return __zh_tw2.profile_title(inputs)
	if (locale === "hi") return __hi.profile_title(inputs)
	if (locale === "ar") return __ar.profile_title(inputs)
	if (locale === "pt") return __pt.profile_title(inputs)
	if (locale === "de") return __de.profile_title(inputs)
	if (locale === "ja") return __ja.profile_title(inputs)
	if (locale === "ko") return __ko.profile_title(inputs)
	if (locale === "it") return __it.profile_title(inputs)
	if (locale === "tr") return __tr.profile_title(inputs)
	if (locale === "pl") return __pl.profile_title(inputs)
	if (locale === "uk") return __uk.profile_title(inputs)
	if (locale === "nl") return __nl.profile_title(inputs)
	if (locale === "vi") return __vi.profile_title(inputs)
	if (locale === "id") return __id.profile_title(inputs)
	if (locale === "ms") return __ms.profile_title(inputs)
	if (locale === "th") return __th.profile_title(inputs)
	if (locale === "fa") return __fa.profile_title(inputs)
	if (locale === "ur") return __ur.profile_title(inputs)
	if (locale === "bn") return __bn.profile_title(inputs)
	if (locale === "pa") return __pa.profile_title(inputs)
	if (locale === "sw") return __sw.profile_title(inputs)
	if (locale === "el") return __el.profile_title(inputs)
	if (locale === "cs") return __cs.profile_title(inputs)
	if (locale === "ro") return __ro.profile_title(inputs)
	if (locale === "hu") return __hu.profile_title(inputs)
	if (locale === "sv") return __sv.profile_title(inputs)
	if (locale === "he") return __he.profile_title(inputs)
	return __ru.profile_title(inputs)
});
/**
* | output |
* | --- |
* | "Already installed" |
*
* @param {Pwa_InstalledInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const pwa_installed = /** @type {((inputs?: Pwa_InstalledInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pwa_InstalledInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.pwa_installed(inputs)
	if (locale === "fr") return __fr.pwa_installed(inputs)
	if (locale === "es") return __es.pwa_installed(inputs)
	if (locale === "zh") return __zh.pwa_installed(inputs)
	if (locale === "zh-TW") return __zh_tw2.pwa_installed(inputs)
	if (locale === "hi") return __hi.pwa_installed(inputs)
	if (locale === "ar") return __ar.pwa_installed(inputs)
	if (locale === "pt") return __pt.pwa_installed(inputs)
	if (locale === "de") return __de.pwa_installed(inputs)
	if (locale === "ja") return __ja.pwa_installed(inputs)
	if (locale === "ko") return __ko.pwa_installed(inputs)
	if (locale === "it") return __it.pwa_installed(inputs)
	if (locale === "tr") return __tr.pwa_installed(inputs)
	if (locale === "pl") return __pl.pwa_installed(inputs)
	if (locale === "uk") return __uk.pwa_installed(inputs)
	if (locale === "nl") return __nl.pwa_installed(inputs)
	if (locale === "vi") return __vi.pwa_installed(inputs)
	if (locale === "id") return __id.pwa_installed(inputs)
	if (locale === "ms") return __ms.pwa_installed(inputs)
	if (locale === "th") return __th.pwa_installed(inputs)
	if (locale === "fa") return __fa.pwa_installed(inputs)
	if (locale === "ur") return __ur.pwa_installed(inputs)
	if (locale === "bn") return __bn.pwa_installed(inputs)
	if (locale === "pa") return __pa.pwa_installed(inputs)
	if (locale === "sw") return __sw.pwa_installed(inputs)
	if (locale === "el") return __el.pwa_installed(inputs)
	if (locale === "cs") return __cs.pwa_installed(inputs)
	if (locale === "ro") return __ro.pwa_installed(inputs)
	if (locale === "hu") return __hu.pwa_installed(inputs)
	if (locale === "sv") return __sv.pwa_installed(inputs)
	if (locale === "he") return __he.pwa_installed(inputs)
	return __ru.pwa_installed(inputs)
});
/**
* | output |
* | --- |
* | "Search" |
*
* @param {Search_TitleInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const search_title = /** @type {((inputs?: Search_TitleInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Search_TitleInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.search_title(inputs)
	if (locale === "fr") return __fr.search_title(inputs)
	if (locale === "es") return __es.search_title(inputs)
	if (locale === "zh") return __zh.search_title(inputs)
	if (locale === "zh-TW") return __zh_tw2.search_title(inputs)
	if (locale === "hi") return __hi.search_title(inputs)
	if (locale === "ar") return __ar.search_title(inputs)
	if (locale === "pt") return __pt.search_title(inputs)
	if (locale === "de") return __de.search_title(inputs)
	if (locale === "ja") return __ja.search_title(inputs)
	if (locale === "ko") return __ko.search_title(inputs)
	if (locale === "it") return __it.search_title(inputs)
	if (locale === "tr") return __tr.search_title(inputs)
	if (locale === "pl") return __pl.search_title(inputs)
	if (locale === "uk") return __uk.search_title(inputs)
	if (locale === "nl") return __nl.search_title(inputs)
	if (locale === "vi") return __vi.search_title(inputs)
	if (locale === "id") return __id.search_title(inputs)
	if (locale === "ms") return __ms.search_title(inputs)
	if (locale === "th") return __th.search_title(inputs)
	if (locale === "fa") return __fa.search_title(inputs)
	if (locale === "ur") return __ur.search_title(inputs)
	if (locale === "bn") return __bn.search_title(inputs)
	if (locale === "pa") return __pa.search_title(inputs)
	if (locale === "sw") return __sw.search_title(inputs)
	if (locale === "el") return __el.search_title(inputs)
	if (locale === "cs") return __cs.search_title(inputs)
	if (locale === "ro") return __ro.search_title(inputs)
	if (locale === "hu") return __hu.search_title(inputs)
	if (locale === "sv") return __sv.search_title(inputs)
	if (locale === "he") return __he.search_title(inputs)
	return __ru.search_title(inputs)
});
/**
* | output |
* | --- |
* | "Add to home screen" |
*
* @param {Steps_InstallInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_install = /** @type {((inputs?: Steps_InstallInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_InstallInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_install(inputs)
	if (locale === "fr") return __fr.steps_install(inputs)
	if (locale === "es") return __es.steps_install(inputs)
	if (locale === "zh") return __zh.steps_install(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_install(inputs)
	if (locale === "hi") return __hi.steps_install(inputs)
	if (locale === "ar") return __ar.steps_install(inputs)
	if (locale === "pt") return __pt.steps_install(inputs)
	if (locale === "de") return __de.steps_install(inputs)
	if (locale === "ja") return __ja.steps_install(inputs)
	if (locale === "ko") return __ko.steps_install(inputs)
	if (locale === "it") return __it.steps_install(inputs)
	if (locale === "tr") return __tr.steps_install(inputs)
	if (locale === "pl") return __pl.steps_install(inputs)
	if (locale === "uk") return __uk.steps_install(inputs)
	if (locale === "nl") return __nl.steps_install(inputs)
	if (locale === "vi") return __vi.steps_install(inputs)
	if (locale === "id") return __id.steps_install(inputs)
	if (locale === "ms") return __ms.steps_install(inputs)
	if (locale === "th") return __th.steps_install(inputs)
	if (locale === "fa") return __fa.steps_install(inputs)
	if (locale === "ur") return __ur.steps_install(inputs)
	if (locale === "bn") return __bn.steps_install(inputs)
	if (locale === "pa") return __pa.steps_install(inputs)
	if (locale === "sw") return __sw.steps_install(inputs)
	if (locale === "el") return __el.steps_install(inputs)
	if (locale === "cs") return __cs.steps_install(inputs)
	if (locale === "ro") return __ro.steps_install(inputs)
	if (locale === "hu") return __hu.steps_install(inputs)
	if (locale === "sv") return __sv.steps_install(inputs)
	if (locale === "he") return __he.steps_install(inputs)
	return __ru.steps_install(inputs)
});
/**
* | output |
* | --- |
* | "Daily goal — 10,000 steps." |
*
* @param {Steps_LeadInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_lead = /** @type {((inputs?: Steps_LeadInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_LeadInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_lead(inputs)
	if (locale === "fr") return __fr.steps_lead(inputs)
	if (locale === "es") return __es.steps_lead(inputs)
	if (locale === "zh") return __zh.steps_lead(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_lead(inputs)
	if (locale === "hi") return __hi.steps_lead(inputs)
	if (locale === "ar") return __ar.steps_lead(inputs)
	if (locale === "pt") return __pt.steps_lead(inputs)
	if (locale === "de") return __de.steps_lead(inputs)
	if (locale === "ja") return __ja.steps_lead(inputs)
	if (locale === "ko") return __ko.steps_lead(inputs)
	if (locale === "it") return __it.steps_lead(inputs)
	if (locale === "tr") return __tr.steps_lead(inputs)
	if (locale === "pl") return __pl.steps_lead(inputs)
	if (locale === "uk") return __uk.steps_lead(inputs)
	if (locale === "nl") return __nl.steps_lead(inputs)
	if (locale === "vi") return __vi.steps_lead(inputs)
	if (locale === "id") return __id.steps_lead(inputs)
	if (locale === "ms") return __ms.steps_lead(inputs)
	if (locale === "th") return __th.steps_lead(inputs)
	if (locale === "fa") return __fa.steps_lead(inputs)
	if (locale === "ur") return __ur.steps_lead(inputs)
	if (locale === "bn") return __bn.steps_lead(inputs)
	if (locale === "pa") return __pa.steps_lead(inputs)
	if (locale === "sw") return __sw.steps_lead(inputs)
	if (locale === "el") return __el.steps_lead(inputs)
	if (locale === "cs") return __cs.steps_lead(inputs)
	if (locale === "ro") return __ro.steps_lead(inputs)
	if (locale === "hu") return __hu.steps_lead(inputs)
	if (locale === "sv") return __sv.steps_lead(inputs)
	if (locale === "he") return __he.steps_lead(inputs)
	return __ru.steps_lead(inputs)
});
/**
* | output |
* | --- |
* | "Pedometer" |
*
* @param {Steps_TitleInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_title = /** @type {((inputs?: Steps_TitleInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_TitleInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_title(inputs)
	if (locale === "fr") return __fr.steps_title(inputs)
	if (locale === "es") return __es.steps_title(inputs)
	if (locale === "zh") return __zh.steps_title(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_title(inputs)
	if (locale === "hi") return __hi.steps_title(inputs)
	if (locale === "ar") return __ar.steps_title(inputs)
	if (locale === "pt") return __pt.steps_title(inputs)
	if (locale === "de") return __de.steps_title(inputs)
	if (locale === "ja") return __ja.steps_title(inputs)
	if (locale === "ko") return __ko.steps_title(inputs)
	if (locale === "it") return __it.steps_title(inputs)
	if (locale === "tr") return __tr.steps_title(inputs)
	if (locale === "pl") return __pl.steps_title(inputs)
	if (locale === "uk") return __uk.steps_title(inputs)
	if (locale === "nl") return __nl.steps_title(inputs)
	if (locale === "vi") return __vi.steps_title(inputs)
	if (locale === "id") return __id.steps_title(inputs)
	if (locale === "ms") return __ms.steps_title(inputs)
	if (locale === "th") return __th.steps_title(inputs)
	if (locale === "fa") return __fa.steps_title(inputs)
	if (locale === "ur") return __ur.steps_title(inputs)
	if (locale === "bn") return __bn.steps_title(inputs)
	if (locale === "pa") return __pa.steps_title(inputs)
	if (locale === "sw") return __sw.steps_title(inputs)
	if (locale === "el") return __el.steps_title(inputs)
	if (locale === "cs") return __cs.steps_title(inputs)
	if (locale === "ro") return __ro.steps_title(inputs)
	if (locale === "hu") return __hu.steps_title(inputs)
	if (locale === "sv") return __sv.steps_title(inputs)
	if (locale === "he") return __he.steps_title(inputs)
	return __ru.steps_title(inputs)
});