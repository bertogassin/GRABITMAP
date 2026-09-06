/* eslint-disable */
import { getLocale, experimentalStaticLocale } from "../runtime.js"

/** @typedef {import('../runtime.js').LocalizedString} LocalizedString */
/** @typedef {{}} Auth_EmailInputs */
/** @typedef {{}} Auth_ForgotInputs */
/** @typedef {{}} Auth_HideInputs */
/** @typedef {{}} Auth_Hide_PasswordInputs */
/** @typedef {{}} Auth_LoginInputs */
/** @typedef {{}} Auth_PasswordInputs */
/** @typedef {{}} Auth_RegisterInputs */
/** @typedef {{}} Auth_ShowInputs */
/** @typedef {{}} Auth_Show_PasswordInputs */
/** @typedef {{}} Back_To_CitiesInputs */
/** @typedef {{}} Chat_Actions_AriaInputs */
/** @typedef {{}} Chat_All_ReadInputs */
/** @typedef {{}} Chat_CancelInputs */
/** @typedef {{}} Chat_Cancel_ReplyInputs */
/** @typedef {{}} Chat_CloseInputs */
/** @typedef {{}} Chat_Compressing_PhotoInputs */
/** @typedef {{}} Chat_Conn_OkInputs */
/** @typedef {{}} Chat_ConnectingInputs */
/** @typedef {{}} Chat_CopyInputs */
/** @typedef {{ n: NonNullable<unknown> }} Chat_Days_AgoInputs */
/** @typedef {{}} Chat_DeleteInputs */
/** @typedef {{}} Chat_Delete_BodyInputs */
/** @typedef {{}} Chat_Delete_TitleInputs */
/** @typedef {{}} Chat_DeletedInputs */
/** @typedef {{}} Chat_DeletingInputs */
/** @typedef {{}} Chat_Dialog_Open_FailedInputs */
/** @typedef {{}} Chat_DialogsInputs */
/** @typedef {{}} Chat_EditInputs */
/** @typedef {{}} Chat_Edit_TitleInputs */
/** @typedef {{}} Chat_EditedInputs */
/** @typedef {{}} Chat_EmptyInputs */
/** @typedef {{}} Chat_ForwardInputs */
/** @typedef {{}} Chat_Forward_EmptyInputs */
/** @typedef {{}} Chat_Forward_FailedInputs */
/** @typedef {{}} Chat_Forward_Load_FailedInputs */
/** @typedef {{}} Chat_Forward_LoadingInputs */
/** @typedef {{}} Chat_Forward_OfflineInputs */
/** @typedef {{}} Chat_Forward_Photo_FailedInputs */
/** @typedef {{}} Chat_Forward_TitleInputs */
/** @typedef {{}} Chat_Forward_Voice_FailedInputs */
/** @typedef {{}} Chat_ForwardedInputs */
/** @typedef {{}} Chat_Forwarded_TagInputs */
/** @typedef {{}} Chat_ForwardingInputs */
/** @typedef {{}} Chat_Forwarding_PhotoInputs */
/** @typedef {{}} Chat_Forwarding_VoiceInputs */
/** @typedef {{}} Chat_GroupInputs */
/** @typedef {{}} Chat_History_ErrorInputs */
/** @typedef {{}} Chat_History_RetryInputs */
/** @typedef {{}} Chat_History_StartInputs */
/** @typedef {{ n: NonNullable<unknown> }} Chat_Hours_AgoInputs */
/** @typedef {{}} Chat_Just_NowInputs */
/** @typedef {{ when: NonNullable<unknown> }} Chat_Last_SeenInputs */
/** @typedef {{}} Chat_LeadInputs */
/** @typedef {{}} Chat_LeaveInputs */
/** @typedef {{}} Chat_Link_OffInputs */
/** @typedef {{}} Chat_Link_OkInputs */
/** @typedef {{}} Chat_Load_OlderInputs */
/** @typedef {{}} Chat_LoadingInputs */
/** @typedef {{}} Chat_Long_AgoInputs */
/** @typedef {{}} Chat_MembersInputs */
/** @typedef {{}} Chat_MessageInputs */
/** @typedef {{}} Chat_Mic_DeniedInputs */
/** @typedef {{ n: NonNullable<unknown> }} Chat_Mins_AgoInputs */
/** @typedef {{}} Chat_New_DialogInputs */
/** @typedef {{}} Chat_New_GroupInputs */
/** @typedef {{}} Chat_New_Group_PreviewInputs */
/** @typedef {{}} Chat_No_NetworkInputs */
/** @typedef {{}} Chat_OfflineInputs */
/** @typedef {{}} Chat_OnlineInputs */
/** @typedef {{}} Chat_OriginalInputs */
/** @typedef {{}} Chat_PeerInputs */
/** @typedef {{}} Chat_PhotoInputs */
/** @typedef {{}} Chat_Photo_ErrorInputs */
/** @typedef {{}} Chat_Photo_FailedInputs */
/** @typedef {{}} Chat_Photo_LabelInputs */
/** @typedef {{}} Chat_Photo_OfflineInputs */
/** @typedef {{}} Chat_Photo_Over_8mbInputs */
/** @typedef {{}} Chat_Photo_Too_BigInputs */
/** @typedef {{}} Chat_Profile_MissingInputs */
/** @typedef {{}} Chat_Rate_LimitedInputs */
/** @typedef {{}} Chat_RecordingInputs */
/** @typedef {{}} Chat_Recording_ReleaseInputs */
/** @typedef {{}} Chat_ReplyInputs */
/** @typedef {{}} Chat_Reply_LabelInputs */
/** @typedef {{ n: NonNullable<unknown> }} Chat_Retry_In_SecInputs */
/** @typedef {{}} Chat_Retry_SoonInputs */
/** @typedef {{}} Chat_SaveInputs */
/** @typedef {{}} Chat_SavingInputs */
/** @typedef {{}} Chat_Send_ErrorInputs */
/** @typedef {{}} Chat_Send_Failed_RetryInputs */
/** @typedef {{}} Chat_Send_UnavailableInputs */
/** @typedef {{}} Chat_SendingInputs */
/** @typedef {{ n: NonNullable<unknown> }} Chat_Sending_LeftInputs */
/** @typedef {{}} Chat_Sending_PhotoInputs */
/** @typedef {{}} Chat_Sending_VoiceInputs */
/** @typedef {{}} Chat_Sent_HintInputs */
/** @typedef {{}} Chat_Session_ExpiredInputs */
/** @typedef {{}} Chat_Status_SendingInputs */
/** @typedef {{}} Chat_TitleInputs */
/** @typedef {{}} Chat_TypingInputs */
/** @typedef {{}} Chat_User_UnavailableInputs */
/** @typedef {{}} Chat_VoiceInputs */
/** @typedef {{}} Chat_Voice_ErrorInputs */
/** @typedef {{}} Chat_Voice_FailedInputs */
/** @typedef {{}} Chat_Voice_OfflineInputs */
/** @typedef {{}} Chat_Voice_Too_ShortInputs */
/** @typedef {{}} Chat_Voice_UnsupportedInputs */
/** @typedef {{}} Chat_YouInputs */
/** @typedef {{}} Common_Account_NeededInputs */
/** @typedef {{ feature: NonNullable<unknown> }} Common_Account_Needed_BodyInputs */
/** @typedef {{}} Common_AllInputs */
/** @typedef {{}} Common_BackInputs */
/** @typedef {{}} Common_BusinessInputs */
/** @typedef {{}} Common_ClearInputs */
/** @typedef {{}} Common_Create_AccountInputs */
/** @typedef {{}} Common_Guest_CopyInputs */
/** @typedef {{}} Common_Guest_ModeInputs */
/** @typedef {{}} Common_ListingInputs */
/** @typedef {{}} Common_LoginInputs */
/** @typedef {{}} Common_Login_PasswordInputs */
/** @typedef {{}} Common_OfferInputs */
/** @typedef {{}} Common_OnlineInputs */
/** @typedef {{}} Common_Online_ShortInputs */
/** @typedef {{}} Common_Open_ProfileInputs */
/** @typedef {{}} Common_PremiumInputs */
/** @typedef {{}} Common_PrivacyInputs */
/** @typedef {{}} Common_ProfileInputs */
/** @typedef {{ rating: NonNullable<unknown>, votes: NonNullable<unknown> }} Common_RatingInputs */
/** @typedef {{}} Common_RegisterInputs */
/** @typedef {{}} Common_RulesInputs */
/** @typedef {{}} Common_SeekerInputs */
/** @typedef {{}} Common_ShareInputs */
/** @typedef {{}} Common_To_MapInputs */
/** @typedef {{}} Common_VerifiedInputs */
/** @typedef {{}} Common_Was_RecentlyInputs */
/** @typedef {{}} Common_WorkInputs */
/** @typedef {{}} Common_WorkersInputs */
/** @typedef {{}} Common_WriteInputs */
/** @typedef {{}} Explore_EmptyInputs */
/** @typedef {{}} Explore_Icon_BizInputs */
/** @typedef {{}} Explore_Icon_CityInputs */
/** @typedef {{}} Explore_Icon_CountryInputs */
/** @typedef {{}} Explore_Icon_PeopleInputs */
/** @typedef {{}} Explore_Icon_ProInputs */
/** @typedef {{}} Explore_Icon_WorkInputs */
/** @typedef {{}} Explore_Icon_WorldInputs */
/** @typedef {{}} Footer_AriaInputs */
/** @typedef {{}} Inbox_Empty_BodyInputs */
/** @typedef {{}} Inbox_Empty_TitleInputs */
/** @typedef {{}} Inbox_Find_PeopleInputs */
/** @typedef {{ n: NonNullable<unknown> }} Inbox_Unread_ManyInputs */
/** @typedef {{ n: NonNullable<unknown> }} Inbox_Unread_OneInputs */
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
/** @typedef {{}} Map_All_ContinentsInputs */
/** @typedef {{}} Map_Back_To_CitiesInputs */
/** @typedef {{}} Map_Back_To_CountriesInputs */
/** @typedef {{}} Map_Back_To_MapInputs */
/** @typedef {{}} Map_Back_To_SectionsInputs */
/** @typedef {{}} Map_Catalog_ErrorInputs */
/** @typedef {{ n: NonNullable<unknown> }} Map_Catalog_FoundInputs */
/** @typedef {{}} Map_Catalog_HintInputs */
/** @typedef {{}} Map_Catalog_NoneInputs */
/** @typedef {{}} Map_Catalog_SearchingInputs */
/** @typedef {{}} Map_CitiesInputs */
/** @typedef {{}} Map_Cities_Load_ErrorInputs */
/** @typedef {{}} Map_Cities_ProfessionsInputs */
/** @typedef {{}} Map_City_All_DirectionsInputs */
/** @typedef {{ country: NonNullable<unknown> }} Map_City_DotInputs */
/** @typedef {{}} Map_City_LabelInputs */
/** @typedef {{}} Map_City_Not_FoundInputs */
/** @typedef {{}} Map_City_Pick_LeadInputs */
/** @typedef {{}} Map_Clear_SearchInputs */
/** @typedef {{}} Map_ContinentInputs */
/** @typedef {{}} Map_ContinentsInputs */
/** @typedef {{}} Map_CountriesInputs */
/** @typedef {{ n: NonNullable<unknown> }} Map_Countries_AvailableInputs */
/** @typedef {{ continent: NonNullable<unknown> }} Map_Country_DotInputs */
/** @typedef {{}} Map_Country_Not_FoundInputs */
/** @typedef {{}} Map_Download_AppInputs */
/** @typedef {{}} Map_Explorer_AriaInputs */
/** @typedef {{}} Map_Explorer_CopyInputs */
/** @typedef {{}} Map_Explorer_PlaceholderInputs */
/** @typedef {{}} Map_Find_CityInputs */
/** @typedef {{}} Map_Find_CountryInputs */
/** @typedef {{}} Map_Find_In_CityInputs */
/** @typedef {{ n: NonNullable<unknown> }} Map_Found_NInputs */
/** @typedef {{}} Map_Global_LeadInputs */
/** @typedef {{}} Map_Global_TitleInputs */
/** @typedef {{}} Map_Home_LeadInputs */
/** @typedef {{}} Map_More_CitiesInputs */
/** @typedef {{ n: NonNullable<unknown> }} Map_N_CitiesInputs */
/** @typedef {{ n: NonNullable<unknown> }} Map_N_CountriesInputs */
/** @typedef {{ n: NonNullable<unknown> }} Map_N_ListingsInputs */
/** @typedef {{ n: NonNullable<unknown> }} Map_N_MembersInputs */
/** @typedef {{ n: NonNullable<unknown> }} Map_N_ProfessionsInputs */
/** @typedef {{}} Map_Need_LeadInputs */
/** @typedef {{}} Map_Need_TitleInputs */
/** @typedef {{}} Map_Open_CitiesInputs */
/** @typedef {{}} Map_Pick_CountryInputs */
/** @typedef {{}} Map_Pick_Country_CitiesInputs */
/** @typedef {{}} Map_Pick_ProfessionInputs */
/** @typedef {{}} Map_Profession_LabelInputs */
/** @typedef {{}} Map_ProfessionsInputs */
/** @typedef {{}} Map_Professions_LeadInputs */
/** @typedef {{}} Map_RegionInputs */
/** @typedef {{}} Map_Regions_LeadInputs */
/** @typedef {{}} Map_Seek_Or_OfferInputs */
/** @typedef {{}} Map_Stat_ListingsInputs */
/** @typedef {{}} Map_Stat_MembersInputs */
/** @typedef {{}} Map_TitleInputs */
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
/** @typedef {{}} Notify_GenericInputs */
/** @typedef {{}} Notify_New_MessageInputs */
/** @typedef {{}} Notify_Open_ChatInputs */
/** @typedef {{}} Notify_Steps_ActionInputs */
/** @typedef {{}} Notify_Steps_BodyInputs */
/** @typedef {{}} Notify_Steps_TitleInputs */
/** @typedef {{}} Profile_Login_WriteInputs */
/** @typedef {{}} Profile_SettingsInputs */
/** @typedef {{}} Profile_Settings_SoundInputs */
/** @typedef {{}} Profile_Share_TextInputs */
/** @typedef {{}} Profile_TitleInputs */
/** @typedef {{}} Profile_Write_HintInputs */
/** @typedef {{}} Profile_Write_Login_HintInputs */
/** @typedef {{}} Pwa_InstalledInputs */
/** @typedef {{}} Pwa_Open_App_StepsInputs */
/** @typedef {{ rating: NonNullable<unknown>, votes: NonNullable<unknown> }} Rating_VotesInputs */
/** @typedef {{}} Search_TitleInputs */
/** @typedef {{}} Search_WhatInputs */
/** @typedef {{}} SpecialistInputs */
/** @typedef {{}} Steps_BestInputs */
/** @typedef {{}} Steps_CountingInputs */
/** @typedef {{}} Steps_DesktopInputs */
/** @typedef {{}} Steps_EmptyInputs */
/** @typedef {{}} Steps_Goal_DoneInputs */
/** @typedef {{}} Steps_Goal_LabelInputs */
/** @typedef {{}} Steps_Goal_UpdatedInputs */
/** @typedef {{}} Steps_InstallInputs */
/** @typedef {{}} Steps_Keep_PanelInputs */
/** @typedef {{}} Steps_LeadInputs */
/** @typedef {{}} Steps_LifeInputs */
/** @typedef {{ pct: NonNullable<unknown>, km: NonNullable<unknown>, goal: NonNullable<unknown> }} Steps_Live_BodyInputs */
/** @typedef {{}} Steps_LogInputs */
/** @typedef {{}} Steps_Need_MotionInputs */
/** @typedef {{}} Steps_Notify_DeniedInputs */
/** @typedef {{ goal: NonNullable<unknown> }} Steps_Of_GoalInputs */
/** @typedef {{}} Steps_OkInputs */
/** @typedef {{}} Steps_PinInputs */
/** @typedef {{}} Steps_Sensor_QuietInputs */
/** @typedef {{}} Steps_StreakInputs */
/** @typedef {{}} Steps_TitleInputs */
/** @typedef {{ pct: NonNullable<unknown> }} Steps_Today_PctInputs */
/** @typedef {{}} Steps_WeekInputs */
/** @typedef {{}} Steps_Word_FewInputs */
/** @typedef {{}} Steps_Word_ManyInputs */
/** @typedef {{}} Steps_Word_OneInputs */
/** @typedef {{}} Steps_YearInputs */
/** @typedef {{}} Steps_Year_HintInputs */
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
* | "Email" |
*
* @param {Auth_EmailInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const auth_email = /** @type {((inputs?: Auth_EmailInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_EmailInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_email(inputs)
	if (locale === "fr") return __fr.auth_email(inputs)
	if (locale === "es") return __es.auth_email(inputs)
	if (locale === "zh") return __zh.auth_email(inputs)
	if (locale === "zh-TW") return __zh_tw2.auth_email(inputs)
	if (locale === "hi") return __hi.auth_email(inputs)
	if (locale === "ar") return __ar.auth_email(inputs)
	if (locale === "pt") return __pt.auth_email(inputs)
	if (locale === "de") return __de.auth_email(inputs)
	if (locale === "ja") return __ja.auth_email(inputs)
	if (locale === "ko") return __ko.auth_email(inputs)
	if (locale === "it") return __it.auth_email(inputs)
	if (locale === "tr") return __tr.auth_email(inputs)
	if (locale === "pl") return __pl.auth_email(inputs)
	if (locale === "uk") return __uk.auth_email(inputs)
	if (locale === "nl") return __nl.auth_email(inputs)
	if (locale === "vi") return __vi.auth_email(inputs)
	if (locale === "id") return __id.auth_email(inputs)
	if (locale === "ms") return __ms.auth_email(inputs)
	if (locale === "th") return __th.auth_email(inputs)
	if (locale === "fa") return __fa.auth_email(inputs)
	if (locale === "ur") return __ur.auth_email(inputs)
	if (locale === "bn") return __bn.auth_email(inputs)
	if (locale === "pa") return __pa.auth_email(inputs)
	if (locale === "sw") return __sw.auth_email(inputs)
	if (locale === "el") return __el.auth_email(inputs)
	if (locale === "cs") return __cs.auth_email(inputs)
	if (locale === "ro") return __ro.auth_email(inputs)
	if (locale === "hu") return __hu.auth_email(inputs)
	if (locale === "sv") return __sv.auth_email(inputs)
	if (locale === "he") return __he.auth_email(inputs)
	return __ru.auth_email(inputs)
});
/**
* | output |
* | --- |
* | "Forgot password?" |
*
* @param {Auth_ForgotInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const auth_forgot = /** @type {((inputs?: Auth_ForgotInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_ForgotInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_forgot(inputs)
	if (locale === "fr") return __fr.auth_forgot(inputs)
	if (locale === "es") return __es.auth_forgot(inputs)
	if (locale === "zh") return __zh.auth_forgot(inputs)
	if (locale === "zh-TW") return __zh_tw2.auth_forgot(inputs)
	if (locale === "hi") return __hi.auth_forgot(inputs)
	if (locale === "ar") return __ar.auth_forgot(inputs)
	if (locale === "pt") return __pt.auth_forgot(inputs)
	if (locale === "de") return __de.auth_forgot(inputs)
	if (locale === "ja") return __ja.auth_forgot(inputs)
	if (locale === "ko") return __ko.auth_forgot(inputs)
	if (locale === "it") return __it.auth_forgot(inputs)
	if (locale === "tr") return __tr.auth_forgot(inputs)
	if (locale === "pl") return __pl.auth_forgot(inputs)
	if (locale === "uk") return __uk.auth_forgot(inputs)
	if (locale === "nl") return __nl.auth_forgot(inputs)
	if (locale === "vi") return __vi.auth_forgot(inputs)
	if (locale === "id") return __id.auth_forgot(inputs)
	if (locale === "ms") return __ms.auth_forgot(inputs)
	if (locale === "th") return __th.auth_forgot(inputs)
	if (locale === "fa") return __fa.auth_forgot(inputs)
	if (locale === "ur") return __ur.auth_forgot(inputs)
	if (locale === "bn") return __bn.auth_forgot(inputs)
	if (locale === "pa") return __pa.auth_forgot(inputs)
	if (locale === "sw") return __sw.auth_forgot(inputs)
	if (locale === "el") return __el.auth_forgot(inputs)
	if (locale === "cs") return __cs.auth_forgot(inputs)
	if (locale === "ro") return __ro.auth_forgot(inputs)
	if (locale === "hu") return __hu.auth_forgot(inputs)
	if (locale === "sv") return __sv.auth_forgot(inputs)
	if (locale === "he") return __he.auth_forgot(inputs)
	return __ru.auth_forgot(inputs)
});
/**
* | output |
* | --- |
* | "Hide" |
*
* @param {Auth_HideInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const auth_hide = /** @type {((inputs?: Auth_HideInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_HideInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_hide(inputs)
	if (locale === "fr") return __fr.auth_hide(inputs)
	if (locale === "es") return __es.auth_hide(inputs)
	if (locale === "zh") return __zh.auth_hide(inputs)
	if (locale === "zh-TW") return __zh_tw2.auth_hide(inputs)
	if (locale === "hi") return __hi.auth_hide(inputs)
	if (locale === "ar") return __ar.auth_hide(inputs)
	if (locale === "pt") return __pt.auth_hide(inputs)
	if (locale === "de") return __de.auth_hide(inputs)
	if (locale === "ja") return __ja.auth_hide(inputs)
	if (locale === "ko") return __ko.auth_hide(inputs)
	if (locale === "it") return __it.auth_hide(inputs)
	if (locale === "tr") return __tr.auth_hide(inputs)
	if (locale === "pl") return __pl.auth_hide(inputs)
	if (locale === "uk") return __uk.auth_hide(inputs)
	if (locale === "nl") return __nl.auth_hide(inputs)
	if (locale === "vi") return __vi.auth_hide(inputs)
	if (locale === "id") return __id.auth_hide(inputs)
	if (locale === "ms") return __ms.auth_hide(inputs)
	if (locale === "th") return __th.auth_hide(inputs)
	if (locale === "fa") return __fa.auth_hide(inputs)
	if (locale === "ur") return __ur.auth_hide(inputs)
	if (locale === "bn") return __bn.auth_hide(inputs)
	if (locale === "pa") return __pa.auth_hide(inputs)
	if (locale === "sw") return __sw.auth_hide(inputs)
	if (locale === "el") return __el.auth_hide(inputs)
	if (locale === "cs") return __cs.auth_hide(inputs)
	if (locale === "ro") return __ro.auth_hide(inputs)
	if (locale === "hu") return __hu.auth_hide(inputs)
	if (locale === "sv") return __sv.auth_hide(inputs)
	if (locale === "he") return __he.auth_hide(inputs)
	return __ru.auth_hide(inputs)
});
/**
* | output |
* | --- |
* | "Hide password" |
*
* @param {Auth_Hide_PasswordInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const auth_hide_password = /** @type {((inputs?: Auth_Hide_PasswordInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Hide_PasswordInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_hide_password(inputs)
	if (locale === "fr") return __fr.auth_hide_password(inputs)
	if (locale === "es") return __es.auth_hide_password(inputs)
	if (locale === "zh") return __zh.auth_hide_password(inputs)
	if (locale === "zh-TW") return __zh_tw2.auth_hide_password(inputs)
	if (locale === "hi") return __hi.auth_hide_password(inputs)
	if (locale === "ar") return __ar.auth_hide_password(inputs)
	if (locale === "pt") return __pt.auth_hide_password(inputs)
	if (locale === "de") return __de.auth_hide_password(inputs)
	if (locale === "ja") return __ja.auth_hide_password(inputs)
	if (locale === "ko") return __ko.auth_hide_password(inputs)
	if (locale === "it") return __it.auth_hide_password(inputs)
	if (locale === "tr") return __tr.auth_hide_password(inputs)
	if (locale === "pl") return __pl.auth_hide_password(inputs)
	if (locale === "uk") return __uk.auth_hide_password(inputs)
	if (locale === "nl") return __nl.auth_hide_password(inputs)
	if (locale === "vi") return __vi.auth_hide_password(inputs)
	if (locale === "id") return __id.auth_hide_password(inputs)
	if (locale === "ms") return __ms.auth_hide_password(inputs)
	if (locale === "th") return __th.auth_hide_password(inputs)
	if (locale === "fa") return __fa.auth_hide_password(inputs)
	if (locale === "ur") return __ur.auth_hide_password(inputs)
	if (locale === "bn") return __bn.auth_hide_password(inputs)
	if (locale === "pa") return __pa.auth_hide_password(inputs)
	if (locale === "sw") return __sw.auth_hide_password(inputs)
	if (locale === "el") return __el.auth_hide_password(inputs)
	if (locale === "cs") return __cs.auth_hide_password(inputs)
	if (locale === "ro") return __ro.auth_hide_password(inputs)
	if (locale === "hu") return __hu.auth_hide_password(inputs)
	if (locale === "sv") return __sv.auth_hide_password(inputs)
	if (locale === "he") return __he.auth_hide_password(inputs)
	return __ru.auth_hide_password(inputs)
});
/**
* | output |
* | --- |
* | "Log in" |
*
* @param {Auth_LoginInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const auth_login = /** @type {((inputs?: Auth_LoginInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_LoginInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_login(inputs)
	if (locale === "fr") return __fr.auth_login(inputs)
	if (locale === "es") return __es.auth_login(inputs)
	if (locale === "zh") return __zh.auth_login(inputs)
	if (locale === "zh-TW") return __zh_tw2.auth_login(inputs)
	if (locale === "hi") return __hi.auth_login(inputs)
	if (locale === "ar") return __ar.auth_login(inputs)
	if (locale === "pt") return __pt.auth_login(inputs)
	if (locale === "de") return __de.auth_login(inputs)
	if (locale === "ja") return __ja.auth_login(inputs)
	if (locale === "ko") return __ko.auth_login(inputs)
	if (locale === "it") return __it.auth_login(inputs)
	if (locale === "tr") return __tr.auth_login(inputs)
	if (locale === "pl") return __pl.auth_login(inputs)
	if (locale === "uk") return __uk.auth_login(inputs)
	if (locale === "nl") return __nl.auth_login(inputs)
	if (locale === "vi") return __vi.auth_login(inputs)
	if (locale === "id") return __id.auth_login(inputs)
	if (locale === "ms") return __ms.auth_login(inputs)
	if (locale === "th") return __th.auth_login(inputs)
	if (locale === "fa") return __fa.auth_login(inputs)
	if (locale === "ur") return __ur.auth_login(inputs)
	if (locale === "bn") return __bn.auth_login(inputs)
	if (locale === "pa") return __pa.auth_login(inputs)
	if (locale === "sw") return __sw.auth_login(inputs)
	if (locale === "el") return __el.auth_login(inputs)
	if (locale === "cs") return __cs.auth_login(inputs)
	if (locale === "ro") return __ro.auth_login(inputs)
	if (locale === "hu") return __hu.auth_login(inputs)
	if (locale === "sv") return __sv.auth_login(inputs)
	if (locale === "he") return __he.auth_login(inputs)
	return __ru.auth_login(inputs)
});
/**
* | output |
* | --- |
* | "Password" |
*
* @param {Auth_PasswordInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const auth_password = /** @type {((inputs?: Auth_PasswordInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_PasswordInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_password(inputs)
	if (locale === "fr") return __fr.auth_password(inputs)
	if (locale === "es") return __es.auth_password(inputs)
	if (locale === "zh") return __zh.auth_password(inputs)
	if (locale === "zh-TW") return __zh_tw2.auth_password(inputs)
	if (locale === "hi") return __hi.auth_password(inputs)
	if (locale === "ar") return __ar.auth_password(inputs)
	if (locale === "pt") return __pt.auth_password(inputs)
	if (locale === "de") return __de.auth_password(inputs)
	if (locale === "ja") return __ja.auth_password(inputs)
	if (locale === "ko") return __ko.auth_password(inputs)
	if (locale === "it") return __it.auth_password(inputs)
	if (locale === "tr") return __tr.auth_password(inputs)
	if (locale === "pl") return __pl.auth_password(inputs)
	if (locale === "uk") return __uk.auth_password(inputs)
	if (locale === "nl") return __nl.auth_password(inputs)
	if (locale === "vi") return __vi.auth_password(inputs)
	if (locale === "id") return __id.auth_password(inputs)
	if (locale === "ms") return __ms.auth_password(inputs)
	if (locale === "th") return __th.auth_password(inputs)
	if (locale === "fa") return __fa.auth_password(inputs)
	if (locale === "ur") return __ur.auth_password(inputs)
	if (locale === "bn") return __bn.auth_password(inputs)
	if (locale === "pa") return __pa.auth_password(inputs)
	if (locale === "sw") return __sw.auth_password(inputs)
	if (locale === "el") return __el.auth_password(inputs)
	if (locale === "cs") return __cs.auth_password(inputs)
	if (locale === "ro") return __ro.auth_password(inputs)
	if (locale === "hu") return __hu.auth_password(inputs)
	if (locale === "sv") return __sv.auth_password(inputs)
	if (locale === "he") return __he.auth_password(inputs)
	return __ru.auth_password(inputs)
});
/**
* | output |
* | --- |
* | "Sign up" |
*
* @param {Auth_RegisterInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const auth_register = /** @type {((inputs?: Auth_RegisterInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_RegisterInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_register(inputs)
	if (locale === "fr") return __fr.auth_register(inputs)
	if (locale === "es") return __es.auth_register(inputs)
	if (locale === "zh") return __zh.auth_register(inputs)
	if (locale === "zh-TW") return __zh_tw2.auth_register(inputs)
	if (locale === "hi") return __hi.auth_register(inputs)
	if (locale === "ar") return __ar.auth_register(inputs)
	if (locale === "pt") return __pt.auth_register(inputs)
	if (locale === "de") return __de.auth_register(inputs)
	if (locale === "ja") return __ja.auth_register(inputs)
	if (locale === "ko") return __ko.auth_register(inputs)
	if (locale === "it") return __it.auth_register(inputs)
	if (locale === "tr") return __tr.auth_register(inputs)
	if (locale === "pl") return __pl.auth_register(inputs)
	if (locale === "uk") return __uk.auth_register(inputs)
	if (locale === "nl") return __nl.auth_register(inputs)
	if (locale === "vi") return __vi.auth_register(inputs)
	if (locale === "id") return __id.auth_register(inputs)
	if (locale === "ms") return __ms.auth_register(inputs)
	if (locale === "th") return __th.auth_register(inputs)
	if (locale === "fa") return __fa.auth_register(inputs)
	if (locale === "ur") return __ur.auth_register(inputs)
	if (locale === "bn") return __bn.auth_register(inputs)
	if (locale === "pa") return __pa.auth_register(inputs)
	if (locale === "sw") return __sw.auth_register(inputs)
	if (locale === "el") return __el.auth_register(inputs)
	if (locale === "cs") return __cs.auth_register(inputs)
	if (locale === "ro") return __ro.auth_register(inputs)
	if (locale === "hu") return __hu.auth_register(inputs)
	if (locale === "sv") return __sv.auth_register(inputs)
	if (locale === "he") return __he.auth_register(inputs)
	return __ru.auth_register(inputs)
});
/**
* | output |
* | --- |
* | "Show" |
*
* @param {Auth_ShowInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const auth_show = /** @type {((inputs?: Auth_ShowInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_ShowInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_show(inputs)
	if (locale === "fr") return __fr.auth_show(inputs)
	if (locale === "es") return __es.auth_show(inputs)
	if (locale === "zh") return __zh.auth_show(inputs)
	if (locale === "zh-TW") return __zh_tw2.auth_show(inputs)
	if (locale === "hi") return __hi.auth_show(inputs)
	if (locale === "ar") return __ar.auth_show(inputs)
	if (locale === "pt") return __pt.auth_show(inputs)
	if (locale === "de") return __de.auth_show(inputs)
	if (locale === "ja") return __ja.auth_show(inputs)
	if (locale === "ko") return __ko.auth_show(inputs)
	if (locale === "it") return __it.auth_show(inputs)
	if (locale === "tr") return __tr.auth_show(inputs)
	if (locale === "pl") return __pl.auth_show(inputs)
	if (locale === "uk") return __uk.auth_show(inputs)
	if (locale === "nl") return __nl.auth_show(inputs)
	if (locale === "vi") return __vi.auth_show(inputs)
	if (locale === "id") return __id.auth_show(inputs)
	if (locale === "ms") return __ms.auth_show(inputs)
	if (locale === "th") return __th.auth_show(inputs)
	if (locale === "fa") return __fa.auth_show(inputs)
	if (locale === "ur") return __ur.auth_show(inputs)
	if (locale === "bn") return __bn.auth_show(inputs)
	if (locale === "pa") return __pa.auth_show(inputs)
	if (locale === "sw") return __sw.auth_show(inputs)
	if (locale === "el") return __el.auth_show(inputs)
	if (locale === "cs") return __cs.auth_show(inputs)
	if (locale === "ro") return __ro.auth_show(inputs)
	if (locale === "hu") return __hu.auth_show(inputs)
	if (locale === "sv") return __sv.auth_show(inputs)
	if (locale === "he") return __he.auth_show(inputs)
	return __ru.auth_show(inputs)
});
/**
* | output |
* | --- |
* | "Show password" |
*
* @param {Auth_Show_PasswordInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const auth_show_password = /** @type {((inputs?: Auth_Show_PasswordInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Auth_Show_PasswordInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.auth_show_password(inputs)
	if (locale === "fr") return __fr.auth_show_password(inputs)
	if (locale === "es") return __es.auth_show_password(inputs)
	if (locale === "zh") return __zh.auth_show_password(inputs)
	if (locale === "zh-TW") return __zh_tw2.auth_show_password(inputs)
	if (locale === "hi") return __hi.auth_show_password(inputs)
	if (locale === "ar") return __ar.auth_show_password(inputs)
	if (locale === "pt") return __pt.auth_show_password(inputs)
	if (locale === "de") return __de.auth_show_password(inputs)
	if (locale === "ja") return __ja.auth_show_password(inputs)
	if (locale === "ko") return __ko.auth_show_password(inputs)
	if (locale === "it") return __it.auth_show_password(inputs)
	if (locale === "tr") return __tr.auth_show_password(inputs)
	if (locale === "pl") return __pl.auth_show_password(inputs)
	if (locale === "uk") return __uk.auth_show_password(inputs)
	if (locale === "nl") return __nl.auth_show_password(inputs)
	if (locale === "vi") return __vi.auth_show_password(inputs)
	if (locale === "id") return __id.auth_show_password(inputs)
	if (locale === "ms") return __ms.auth_show_password(inputs)
	if (locale === "th") return __th.auth_show_password(inputs)
	if (locale === "fa") return __fa.auth_show_password(inputs)
	if (locale === "ur") return __ur.auth_show_password(inputs)
	if (locale === "bn") return __bn.auth_show_password(inputs)
	if (locale === "pa") return __pa.auth_show_password(inputs)
	if (locale === "sw") return __sw.auth_show_password(inputs)
	if (locale === "el") return __el.auth_show_password(inputs)
	if (locale === "cs") return __cs.auth_show_password(inputs)
	if (locale === "ro") return __ro.auth_show_password(inputs)
	if (locale === "hu") return __hu.auth_show_password(inputs)
	if (locale === "sv") return __sv.auth_show_password(inputs)
	if (locale === "he") return __he.auth_show_password(inputs)
	return __ru.auth_show_password(inputs)
});
/**
* | output |
* | --- |
* | "Back to cities" |
*
* @param {Back_To_CitiesInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const back_to_cities = /** @type {((inputs?: Back_To_CitiesInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Back_To_CitiesInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.back_to_cities(inputs)
	if (locale === "fr") return __fr.back_to_cities(inputs)
	if (locale === "es") return __es.back_to_cities(inputs)
	if (locale === "zh") return __zh.back_to_cities(inputs)
	if (locale === "zh-TW") return __zh_tw2.back_to_cities(inputs)
	if (locale === "hi") return __hi.back_to_cities(inputs)
	if (locale === "ar") return __ar.back_to_cities(inputs)
	if (locale === "pt") return __pt.back_to_cities(inputs)
	if (locale === "de") return __de.back_to_cities(inputs)
	if (locale === "ja") return __ja.back_to_cities(inputs)
	if (locale === "ko") return __ko.back_to_cities(inputs)
	if (locale === "it") return __it.back_to_cities(inputs)
	if (locale === "tr") return __tr.back_to_cities(inputs)
	if (locale === "pl") return __pl.back_to_cities(inputs)
	if (locale === "uk") return __uk.back_to_cities(inputs)
	if (locale === "nl") return __nl.back_to_cities(inputs)
	if (locale === "vi") return __vi.back_to_cities(inputs)
	if (locale === "id") return __id.back_to_cities(inputs)
	if (locale === "ms") return __ms.back_to_cities(inputs)
	if (locale === "th") return __th.back_to_cities(inputs)
	if (locale === "fa") return __fa.back_to_cities(inputs)
	if (locale === "ur") return __ur.back_to_cities(inputs)
	if (locale === "bn") return __bn.back_to_cities(inputs)
	if (locale === "pa") return __pa.back_to_cities(inputs)
	if (locale === "sw") return __sw.back_to_cities(inputs)
	if (locale === "el") return __el.back_to_cities(inputs)
	if (locale === "cs") return __cs.back_to_cities(inputs)
	if (locale === "ro") return __ro.back_to_cities(inputs)
	if (locale === "hu") return __hu.back_to_cities(inputs)
	if (locale === "sv") return __sv.back_to_cities(inputs)
	if (locale === "he") return __he.back_to_cities(inputs)
	return __ru.back_to_cities(inputs)
});
/**
* | output |
* | --- |
* | "Message actions" |
*
* @param {Chat_Actions_AriaInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_actions_aria = /** @type {((inputs?: Chat_Actions_AriaInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Actions_AriaInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_actions_aria(inputs)
	if (locale === "fr") return __fr.chat_actions_aria(inputs)
	if (locale === "es") return __es.chat_actions_aria(inputs)
	if (locale === "zh") return __zh.chat_actions_aria(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_actions_aria(inputs)
	if (locale === "hi") return __hi.chat_actions_aria(inputs)
	if (locale === "ar") return __ar.chat_actions_aria(inputs)
	if (locale === "pt") return __pt.chat_actions_aria(inputs)
	if (locale === "de") return __de.chat_actions_aria(inputs)
	if (locale === "ja") return __ja.chat_actions_aria(inputs)
	if (locale === "ko") return __ko.chat_actions_aria(inputs)
	if (locale === "it") return __it.chat_actions_aria(inputs)
	if (locale === "tr") return __tr.chat_actions_aria(inputs)
	if (locale === "pl") return __pl.chat_actions_aria(inputs)
	if (locale === "uk") return __uk.chat_actions_aria(inputs)
	if (locale === "nl") return __nl.chat_actions_aria(inputs)
	if (locale === "vi") return __vi.chat_actions_aria(inputs)
	if (locale === "id") return __id.chat_actions_aria(inputs)
	if (locale === "ms") return __ms.chat_actions_aria(inputs)
	if (locale === "th") return __th.chat_actions_aria(inputs)
	if (locale === "fa") return __fa.chat_actions_aria(inputs)
	if (locale === "ur") return __ur.chat_actions_aria(inputs)
	if (locale === "bn") return __bn.chat_actions_aria(inputs)
	if (locale === "pa") return __pa.chat_actions_aria(inputs)
	if (locale === "sw") return __sw.chat_actions_aria(inputs)
	if (locale === "el") return __el.chat_actions_aria(inputs)
	if (locale === "cs") return __cs.chat_actions_aria(inputs)
	if (locale === "ro") return __ro.chat_actions_aria(inputs)
	if (locale === "hu") return __hu.chat_actions_aria(inputs)
	if (locale === "sv") return __sv.chat_actions_aria(inputs)
	if (locale === "he") return __he.chat_actions_aria(inputs)
	return __ru.chat_actions_aria(inputs)
});
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
* | "Cancel" |
*
* @param {Chat_CancelInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_cancel = /** @type {((inputs?: Chat_CancelInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_CancelInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_cancel(inputs)
	if (locale === "fr") return __fr.chat_cancel(inputs)
	if (locale === "es") return __es.chat_cancel(inputs)
	if (locale === "zh") return __zh.chat_cancel(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_cancel(inputs)
	if (locale === "hi") return __hi.chat_cancel(inputs)
	if (locale === "ar") return __ar.chat_cancel(inputs)
	if (locale === "pt") return __pt.chat_cancel(inputs)
	if (locale === "de") return __de.chat_cancel(inputs)
	if (locale === "ja") return __ja.chat_cancel(inputs)
	if (locale === "ko") return __ko.chat_cancel(inputs)
	if (locale === "it") return __it.chat_cancel(inputs)
	if (locale === "tr") return __tr.chat_cancel(inputs)
	if (locale === "pl") return __pl.chat_cancel(inputs)
	if (locale === "uk") return __uk.chat_cancel(inputs)
	if (locale === "nl") return __nl.chat_cancel(inputs)
	if (locale === "vi") return __vi.chat_cancel(inputs)
	if (locale === "id") return __id.chat_cancel(inputs)
	if (locale === "ms") return __ms.chat_cancel(inputs)
	if (locale === "th") return __th.chat_cancel(inputs)
	if (locale === "fa") return __fa.chat_cancel(inputs)
	if (locale === "ur") return __ur.chat_cancel(inputs)
	if (locale === "bn") return __bn.chat_cancel(inputs)
	if (locale === "pa") return __pa.chat_cancel(inputs)
	if (locale === "sw") return __sw.chat_cancel(inputs)
	if (locale === "el") return __el.chat_cancel(inputs)
	if (locale === "cs") return __cs.chat_cancel(inputs)
	if (locale === "ro") return __ro.chat_cancel(inputs)
	if (locale === "hu") return __hu.chat_cancel(inputs)
	if (locale === "sv") return __sv.chat_cancel(inputs)
	if (locale === "he") return __he.chat_cancel(inputs)
	return __ru.chat_cancel(inputs)
});
/**
* | output |
* | --- |
* | "Cancel reply" |
*
* @param {Chat_Cancel_ReplyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_cancel_reply = /** @type {((inputs?: Chat_Cancel_ReplyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Cancel_ReplyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_cancel_reply(inputs)
	if (locale === "fr") return __fr.chat_cancel_reply(inputs)
	if (locale === "es") return __es.chat_cancel_reply(inputs)
	if (locale === "zh") return __zh.chat_cancel_reply(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_cancel_reply(inputs)
	if (locale === "hi") return __hi.chat_cancel_reply(inputs)
	if (locale === "ar") return __ar.chat_cancel_reply(inputs)
	if (locale === "pt") return __pt.chat_cancel_reply(inputs)
	if (locale === "de") return __de.chat_cancel_reply(inputs)
	if (locale === "ja") return __ja.chat_cancel_reply(inputs)
	if (locale === "ko") return __ko.chat_cancel_reply(inputs)
	if (locale === "it") return __it.chat_cancel_reply(inputs)
	if (locale === "tr") return __tr.chat_cancel_reply(inputs)
	if (locale === "pl") return __pl.chat_cancel_reply(inputs)
	if (locale === "uk") return __uk.chat_cancel_reply(inputs)
	if (locale === "nl") return __nl.chat_cancel_reply(inputs)
	if (locale === "vi") return __vi.chat_cancel_reply(inputs)
	if (locale === "id") return __id.chat_cancel_reply(inputs)
	if (locale === "ms") return __ms.chat_cancel_reply(inputs)
	if (locale === "th") return __th.chat_cancel_reply(inputs)
	if (locale === "fa") return __fa.chat_cancel_reply(inputs)
	if (locale === "ur") return __ur.chat_cancel_reply(inputs)
	if (locale === "bn") return __bn.chat_cancel_reply(inputs)
	if (locale === "pa") return __pa.chat_cancel_reply(inputs)
	if (locale === "sw") return __sw.chat_cancel_reply(inputs)
	if (locale === "el") return __el.chat_cancel_reply(inputs)
	if (locale === "cs") return __cs.chat_cancel_reply(inputs)
	if (locale === "ro") return __ro.chat_cancel_reply(inputs)
	if (locale === "hu") return __hu.chat_cancel_reply(inputs)
	if (locale === "sv") return __sv.chat_cancel_reply(inputs)
	if (locale === "he") return __he.chat_cancel_reply(inputs)
	return __ru.chat_cancel_reply(inputs)
});
/**
* | output |
* | --- |
* | "Close" |
*
* @param {Chat_CloseInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_close = /** @type {((inputs?: Chat_CloseInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_CloseInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_close(inputs)
	if (locale === "fr") return __fr.chat_close(inputs)
	if (locale === "es") return __es.chat_close(inputs)
	if (locale === "zh") return __zh.chat_close(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_close(inputs)
	if (locale === "hi") return __hi.chat_close(inputs)
	if (locale === "ar") return __ar.chat_close(inputs)
	if (locale === "pt") return __pt.chat_close(inputs)
	if (locale === "de") return __de.chat_close(inputs)
	if (locale === "ja") return __ja.chat_close(inputs)
	if (locale === "ko") return __ko.chat_close(inputs)
	if (locale === "it") return __it.chat_close(inputs)
	if (locale === "tr") return __tr.chat_close(inputs)
	if (locale === "pl") return __pl.chat_close(inputs)
	if (locale === "uk") return __uk.chat_close(inputs)
	if (locale === "nl") return __nl.chat_close(inputs)
	if (locale === "vi") return __vi.chat_close(inputs)
	if (locale === "id") return __id.chat_close(inputs)
	if (locale === "ms") return __ms.chat_close(inputs)
	if (locale === "th") return __th.chat_close(inputs)
	if (locale === "fa") return __fa.chat_close(inputs)
	if (locale === "ur") return __ur.chat_close(inputs)
	if (locale === "bn") return __bn.chat_close(inputs)
	if (locale === "pa") return __pa.chat_close(inputs)
	if (locale === "sw") return __sw.chat_close(inputs)
	if (locale === "el") return __el.chat_close(inputs)
	if (locale === "cs") return __cs.chat_close(inputs)
	if (locale === "ro") return __ro.chat_close(inputs)
	if (locale === "hu") return __hu.chat_close(inputs)
	if (locale === "sv") return __sv.chat_close(inputs)
	if (locale === "he") return __he.chat_close(inputs)
	return __ru.chat_close(inputs)
});
/**
* | output |
* | --- |
* | "Compressing photo…" |
*
* @param {Chat_Compressing_PhotoInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_compressing_photo = /** @type {((inputs?: Chat_Compressing_PhotoInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Compressing_PhotoInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_compressing_photo(inputs)
	if (locale === "fr") return __fr.chat_compressing_photo(inputs)
	if (locale === "es") return __es.chat_compressing_photo(inputs)
	if (locale === "zh") return __zh.chat_compressing_photo(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_compressing_photo(inputs)
	if (locale === "hi") return __hi.chat_compressing_photo(inputs)
	if (locale === "ar") return __ar.chat_compressing_photo(inputs)
	if (locale === "pt") return __pt.chat_compressing_photo(inputs)
	if (locale === "de") return __de.chat_compressing_photo(inputs)
	if (locale === "ja") return __ja.chat_compressing_photo(inputs)
	if (locale === "ko") return __ko.chat_compressing_photo(inputs)
	if (locale === "it") return __it.chat_compressing_photo(inputs)
	if (locale === "tr") return __tr.chat_compressing_photo(inputs)
	if (locale === "pl") return __pl.chat_compressing_photo(inputs)
	if (locale === "uk") return __uk.chat_compressing_photo(inputs)
	if (locale === "nl") return __nl.chat_compressing_photo(inputs)
	if (locale === "vi") return __vi.chat_compressing_photo(inputs)
	if (locale === "id") return __id.chat_compressing_photo(inputs)
	if (locale === "ms") return __ms.chat_compressing_photo(inputs)
	if (locale === "th") return __th.chat_compressing_photo(inputs)
	if (locale === "fa") return __fa.chat_compressing_photo(inputs)
	if (locale === "ur") return __ur.chat_compressing_photo(inputs)
	if (locale === "bn") return __bn.chat_compressing_photo(inputs)
	if (locale === "pa") return __pa.chat_compressing_photo(inputs)
	if (locale === "sw") return __sw.chat_compressing_photo(inputs)
	if (locale === "el") return __el.chat_compressing_photo(inputs)
	if (locale === "cs") return __cs.chat_compressing_photo(inputs)
	if (locale === "ro") return __ro.chat_compressing_photo(inputs)
	if (locale === "hu") return __hu.chat_compressing_photo(inputs)
	if (locale === "sv") return __sv.chat_compressing_photo(inputs)
	if (locale === "he") return __he.chat_compressing_photo(inputs)
	return __ru.chat_compressing_photo(inputs)
});
/**
* | output |
* | --- |
* | "Connected" |
*
* @param {Chat_Conn_OkInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_conn_ok = /** @type {((inputs?: Chat_Conn_OkInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Conn_OkInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_conn_ok(inputs)
	if (locale === "fr") return __fr.chat_conn_ok(inputs)
	if (locale === "es") return __es.chat_conn_ok(inputs)
	if (locale === "zh") return __zh.chat_conn_ok(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_conn_ok(inputs)
	if (locale === "hi") return __hi.chat_conn_ok(inputs)
	if (locale === "ar") return __ar.chat_conn_ok(inputs)
	if (locale === "pt") return __pt.chat_conn_ok(inputs)
	if (locale === "de") return __de.chat_conn_ok(inputs)
	if (locale === "ja") return __ja.chat_conn_ok(inputs)
	if (locale === "ko") return __ko.chat_conn_ok(inputs)
	if (locale === "it") return __it.chat_conn_ok(inputs)
	if (locale === "tr") return __tr.chat_conn_ok(inputs)
	if (locale === "pl") return __pl.chat_conn_ok(inputs)
	if (locale === "uk") return __uk.chat_conn_ok(inputs)
	if (locale === "nl") return __nl.chat_conn_ok(inputs)
	if (locale === "vi") return __vi.chat_conn_ok(inputs)
	if (locale === "id") return __id.chat_conn_ok(inputs)
	if (locale === "ms") return __ms.chat_conn_ok(inputs)
	if (locale === "th") return __th.chat_conn_ok(inputs)
	if (locale === "fa") return __fa.chat_conn_ok(inputs)
	if (locale === "ur") return __ur.chat_conn_ok(inputs)
	if (locale === "bn") return __bn.chat_conn_ok(inputs)
	if (locale === "pa") return __pa.chat_conn_ok(inputs)
	if (locale === "sw") return __sw.chat_conn_ok(inputs)
	if (locale === "el") return __el.chat_conn_ok(inputs)
	if (locale === "cs") return __cs.chat_conn_ok(inputs)
	if (locale === "ro") return __ro.chat_conn_ok(inputs)
	if (locale === "hu") return __hu.chat_conn_ok(inputs)
	if (locale === "sv") return __sv.chat_conn_ok(inputs)
	if (locale === "he") return __he.chat_conn_ok(inputs)
	return __ru.chat_conn_ok(inputs)
});
/**
* | output |
* | --- |
* | "Reconnecting…" |
*
* @param {Chat_ConnectingInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_connecting = /** @type {((inputs?: Chat_ConnectingInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_ConnectingInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_connecting(inputs)
	if (locale === "fr") return __fr.chat_connecting(inputs)
	if (locale === "es") return __es.chat_connecting(inputs)
	if (locale === "zh") return __zh.chat_connecting(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_connecting(inputs)
	if (locale === "hi") return __hi.chat_connecting(inputs)
	if (locale === "ar") return __ar.chat_connecting(inputs)
	if (locale === "pt") return __pt.chat_connecting(inputs)
	if (locale === "de") return __de.chat_connecting(inputs)
	if (locale === "ja") return __ja.chat_connecting(inputs)
	if (locale === "ko") return __ko.chat_connecting(inputs)
	if (locale === "it") return __it.chat_connecting(inputs)
	if (locale === "tr") return __tr.chat_connecting(inputs)
	if (locale === "pl") return __pl.chat_connecting(inputs)
	if (locale === "uk") return __uk.chat_connecting(inputs)
	if (locale === "nl") return __nl.chat_connecting(inputs)
	if (locale === "vi") return __vi.chat_connecting(inputs)
	if (locale === "id") return __id.chat_connecting(inputs)
	if (locale === "ms") return __ms.chat_connecting(inputs)
	if (locale === "th") return __th.chat_connecting(inputs)
	if (locale === "fa") return __fa.chat_connecting(inputs)
	if (locale === "ur") return __ur.chat_connecting(inputs)
	if (locale === "bn") return __bn.chat_connecting(inputs)
	if (locale === "pa") return __pa.chat_connecting(inputs)
	if (locale === "sw") return __sw.chat_connecting(inputs)
	if (locale === "el") return __el.chat_connecting(inputs)
	if (locale === "cs") return __cs.chat_connecting(inputs)
	if (locale === "ro") return __ro.chat_connecting(inputs)
	if (locale === "hu") return __hu.chat_connecting(inputs)
	if (locale === "sv") return __sv.chat_connecting(inputs)
	if (locale === "he") return __he.chat_connecting(inputs)
	return __ru.chat_connecting(inputs)
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
* | "{n} d ago" |
*
* @param {Chat_Days_AgoInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_days_ago = /** @type {((inputs: Chat_Days_AgoInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Days_AgoInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_days_ago(inputs)
	if (locale === "fr") return __fr.chat_days_ago(inputs)
	if (locale === "es") return __es.chat_days_ago(inputs)
	if (locale === "zh") return __zh.chat_days_ago(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_days_ago(inputs)
	if (locale === "hi") return __hi.chat_days_ago(inputs)
	if (locale === "ar") return __ar.chat_days_ago(inputs)
	if (locale === "pt") return __pt.chat_days_ago(inputs)
	if (locale === "de") return __de.chat_days_ago(inputs)
	if (locale === "ja") return __ja.chat_days_ago(inputs)
	if (locale === "ko") return __ko.chat_days_ago(inputs)
	if (locale === "it") return __it.chat_days_ago(inputs)
	if (locale === "tr") return __tr.chat_days_ago(inputs)
	if (locale === "pl") return __pl.chat_days_ago(inputs)
	if (locale === "uk") return __uk.chat_days_ago(inputs)
	if (locale === "nl") return __nl.chat_days_ago(inputs)
	if (locale === "vi") return __vi.chat_days_ago(inputs)
	if (locale === "id") return __id.chat_days_ago(inputs)
	if (locale === "ms") return __ms.chat_days_ago(inputs)
	if (locale === "th") return __th.chat_days_ago(inputs)
	if (locale === "fa") return __fa.chat_days_ago(inputs)
	if (locale === "ur") return __ur.chat_days_ago(inputs)
	if (locale === "bn") return __bn.chat_days_ago(inputs)
	if (locale === "pa") return __pa.chat_days_ago(inputs)
	if (locale === "sw") return __sw.chat_days_ago(inputs)
	if (locale === "el") return __el.chat_days_ago(inputs)
	if (locale === "cs") return __cs.chat_days_ago(inputs)
	if (locale === "ro") return __ro.chat_days_ago(inputs)
	if (locale === "hu") return __hu.chat_days_ago(inputs)
	if (locale === "sv") return __sv.chat_days_ago(inputs)
	if (locale === "he") return __he.chat_days_ago(inputs)
	return __ru.chat_days_ago(inputs)
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
* | "Others will see “Message deleted” instead of the text." |
*
* @param {Chat_Delete_BodyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_delete_body = /** @type {((inputs?: Chat_Delete_BodyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Delete_BodyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_delete_body(inputs)
	if (locale === "fr") return __fr.chat_delete_body(inputs)
	if (locale === "es") return __es.chat_delete_body(inputs)
	if (locale === "zh") return __zh.chat_delete_body(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_delete_body(inputs)
	if (locale === "hi") return __hi.chat_delete_body(inputs)
	if (locale === "ar") return __ar.chat_delete_body(inputs)
	if (locale === "pt") return __pt.chat_delete_body(inputs)
	if (locale === "de") return __de.chat_delete_body(inputs)
	if (locale === "ja") return __ja.chat_delete_body(inputs)
	if (locale === "ko") return __ko.chat_delete_body(inputs)
	if (locale === "it") return __it.chat_delete_body(inputs)
	if (locale === "tr") return __tr.chat_delete_body(inputs)
	if (locale === "pl") return __pl.chat_delete_body(inputs)
	if (locale === "uk") return __uk.chat_delete_body(inputs)
	if (locale === "nl") return __nl.chat_delete_body(inputs)
	if (locale === "vi") return __vi.chat_delete_body(inputs)
	if (locale === "id") return __id.chat_delete_body(inputs)
	if (locale === "ms") return __ms.chat_delete_body(inputs)
	if (locale === "th") return __th.chat_delete_body(inputs)
	if (locale === "fa") return __fa.chat_delete_body(inputs)
	if (locale === "ur") return __ur.chat_delete_body(inputs)
	if (locale === "bn") return __bn.chat_delete_body(inputs)
	if (locale === "pa") return __pa.chat_delete_body(inputs)
	if (locale === "sw") return __sw.chat_delete_body(inputs)
	if (locale === "el") return __el.chat_delete_body(inputs)
	if (locale === "cs") return __cs.chat_delete_body(inputs)
	if (locale === "ro") return __ro.chat_delete_body(inputs)
	if (locale === "hu") return __hu.chat_delete_body(inputs)
	if (locale === "sv") return __sv.chat_delete_body(inputs)
	if (locale === "he") return __he.chat_delete_body(inputs)
	return __ru.chat_delete_body(inputs)
});
/**
* | output |
* | --- |
* | "Delete message?" |
*
* @param {Chat_Delete_TitleInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_delete_title = /** @type {((inputs?: Chat_Delete_TitleInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Delete_TitleInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_delete_title(inputs)
	if (locale === "fr") return __fr.chat_delete_title(inputs)
	if (locale === "es") return __es.chat_delete_title(inputs)
	if (locale === "zh") return __zh.chat_delete_title(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_delete_title(inputs)
	if (locale === "hi") return __hi.chat_delete_title(inputs)
	if (locale === "ar") return __ar.chat_delete_title(inputs)
	if (locale === "pt") return __pt.chat_delete_title(inputs)
	if (locale === "de") return __de.chat_delete_title(inputs)
	if (locale === "ja") return __ja.chat_delete_title(inputs)
	if (locale === "ko") return __ko.chat_delete_title(inputs)
	if (locale === "it") return __it.chat_delete_title(inputs)
	if (locale === "tr") return __tr.chat_delete_title(inputs)
	if (locale === "pl") return __pl.chat_delete_title(inputs)
	if (locale === "uk") return __uk.chat_delete_title(inputs)
	if (locale === "nl") return __nl.chat_delete_title(inputs)
	if (locale === "vi") return __vi.chat_delete_title(inputs)
	if (locale === "id") return __id.chat_delete_title(inputs)
	if (locale === "ms") return __ms.chat_delete_title(inputs)
	if (locale === "th") return __th.chat_delete_title(inputs)
	if (locale === "fa") return __fa.chat_delete_title(inputs)
	if (locale === "ur") return __ur.chat_delete_title(inputs)
	if (locale === "bn") return __bn.chat_delete_title(inputs)
	if (locale === "pa") return __pa.chat_delete_title(inputs)
	if (locale === "sw") return __sw.chat_delete_title(inputs)
	if (locale === "el") return __el.chat_delete_title(inputs)
	if (locale === "cs") return __cs.chat_delete_title(inputs)
	if (locale === "ro") return __ro.chat_delete_title(inputs)
	if (locale === "hu") return __hu.chat_delete_title(inputs)
	if (locale === "sv") return __sv.chat_delete_title(inputs)
	if (locale === "he") return __he.chat_delete_title(inputs)
	return __ru.chat_delete_title(inputs)
});
/**
* | output |
* | --- |
* | "Message deleted" |
*
* @param {Chat_DeletedInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_deleted = /** @type {((inputs?: Chat_DeletedInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_DeletedInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_deleted(inputs)
	if (locale === "fr") return __fr.chat_deleted(inputs)
	if (locale === "es") return __es.chat_deleted(inputs)
	if (locale === "zh") return __zh.chat_deleted(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_deleted(inputs)
	if (locale === "hi") return __hi.chat_deleted(inputs)
	if (locale === "ar") return __ar.chat_deleted(inputs)
	if (locale === "pt") return __pt.chat_deleted(inputs)
	if (locale === "de") return __de.chat_deleted(inputs)
	if (locale === "ja") return __ja.chat_deleted(inputs)
	if (locale === "ko") return __ko.chat_deleted(inputs)
	if (locale === "it") return __it.chat_deleted(inputs)
	if (locale === "tr") return __tr.chat_deleted(inputs)
	if (locale === "pl") return __pl.chat_deleted(inputs)
	if (locale === "uk") return __uk.chat_deleted(inputs)
	if (locale === "nl") return __nl.chat_deleted(inputs)
	if (locale === "vi") return __vi.chat_deleted(inputs)
	if (locale === "id") return __id.chat_deleted(inputs)
	if (locale === "ms") return __ms.chat_deleted(inputs)
	if (locale === "th") return __th.chat_deleted(inputs)
	if (locale === "fa") return __fa.chat_deleted(inputs)
	if (locale === "ur") return __ur.chat_deleted(inputs)
	if (locale === "bn") return __bn.chat_deleted(inputs)
	if (locale === "pa") return __pa.chat_deleted(inputs)
	if (locale === "sw") return __sw.chat_deleted(inputs)
	if (locale === "el") return __el.chat_deleted(inputs)
	if (locale === "cs") return __cs.chat_deleted(inputs)
	if (locale === "ro") return __ro.chat_deleted(inputs)
	if (locale === "hu") return __hu.chat_deleted(inputs)
	if (locale === "sv") return __sv.chat_deleted(inputs)
	if (locale === "he") return __he.chat_deleted(inputs)
	return __ru.chat_deleted(inputs)
});
/**
* | output |
* | --- |
* | "Deleting…" |
*
* @param {Chat_DeletingInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_deleting = /** @type {((inputs?: Chat_DeletingInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_DeletingInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_deleting(inputs)
	if (locale === "fr") return __fr.chat_deleting(inputs)
	if (locale === "es") return __es.chat_deleting(inputs)
	if (locale === "zh") return __zh.chat_deleting(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_deleting(inputs)
	if (locale === "hi") return __hi.chat_deleting(inputs)
	if (locale === "ar") return __ar.chat_deleting(inputs)
	if (locale === "pt") return __pt.chat_deleting(inputs)
	if (locale === "de") return __de.chat_deleting(inputs)
	if (locale === "ja") return __ja.chat_deleting(inputs)
	if (locale === "ko") return __ko.chat_deleting(inputs)
	if (locale === "it") return __it.chat_deleting(inputs)
	if (locale === "tr") return __tr.chat_deleting(inputs)
	if (locale === "pl") return __pl.chat_deleting(inputs)
	if (locale === "uk") return __uk.chat_deleting(inputs)
	if (locale === "nl") return __nl.chat_deleting(inputs)
	if (locale === "vi") return __vi.chat_deleting(inputs)
	if (locale === "id") return __id.chat_deleting(inputs)
	if (locale === "ms") return __ms.chat_deleting(inputs)
	if (locale === "th") return __th.chat_deleting(inputs)
	if (locale === "fa") return __fa.chat_deleting(inputs)
	if (locale === "ur") return __ur.chat_deleting(inputs)
	if (locale === "bn") return __bn.chat_deleting(inputs)
	if (locale === "pa") return __pa.chat_deleting(inputs)
	if (locale === "sw") return __sw.chat_deleting(inputs)
	if (locale === "el") return __el.chat_deleting(inputs)
	if (locale === "cs") return __cs.chat_deleting(inputs)
	if (locale === "ro") return __ro.chat_deleting(inputs)
	if (locale === "hu") return __hu.chat_deleting(inputs)
	if (locale === "sv") return __sv.chat_deleting(inputs)
	if (locale === "he") return __he.chat_deleting(inputs)
	return __ru.chat_deleting(inputs)
});
/**
* | output |
* | --- |
* | "Couldn’t open chat" |
*
* @param {Chat_Dialog_Open_FailedInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_dialog_open_failed = /** @type {((inputs?: Chat_Dialog_Open_FailedInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Dialog_Open_FailedInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_dialog_open_failed(inputs)
	if (locale === "fr") return __fr.chat_dialog_open_failed(inputs)
	if (locale === "es") return __es.chat_dialog_open_failed(inputs)
	if (locale === "zh") return __zh.chat_dialog_open_failed(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_dialog_open_failed(inputs)
	if (locale === "hi") return __hi.chat_dialog_open_failed(inputs)
	if (locale === "ar") return __ar.chat_dialog_open_failed(inputs)
	if (locale === "pt") return __pt.chat_dialog_open_failed(inputs)
	if (locale === "de") return __de.chat_dialog_open_failed(inputs)
	if (locale === "ja") return __ja.chat_dialog_open_failed(inputs)
	if (locale === "ko") return __ko.chat_dialog_open_failed(inputs)
	if (locale === "it") return __it.chat_dialog_open_failed(inputs)
	if (locale === "tr") return __tr.chat_dialog_open_failed(inputs)
	if (locale === "pl") return __pl.chat_dialog_open_failed(inputs)
	if (locale === "uk") return __uk.chat_dialog_open_failed(inputs)
	if (locale === "nl") return __nl.chat_dialog_open_failed(inputs)
	if (locale === "vi") return __vi.chat_dialog_open_failed(inputs)
	if (locale === "id") return __id.chat_dialog_open_failed(inputs)
	if (locale === "ms") return __ms.chat_dialog_open_failed(inputs)
	if (locale === "th") return __th.chat_dialog_open_failed(inputs)
	if (locale === "fa") return __fa.chat_dialog_open_failed(inputs)
	if (locale === "ur") return __ur.chat_dialog_open_failed(inputs)
	if (locale === "bn") return __bn.chat_dialog_open_failed(inputs)
	if (locale === "pa") return __pa.chat_dialog_open_failed(inputs)
	if (locale === "sw") return __sw.chat_dialog_open_failed(inputs)
	if (locale === "el") return __el.chat_dialog_open_failed(inputs)
	if (locale === "cs") return __cs.chat_dialog_open_failed(inputs)
	if (locale === "ro") return __ro.chat_dialog_open_failed(inputs)
	if (locale === "hu") return __hu.chat_dialog_open_failed(inputs)
	if (locale === "sv") return __sv.chat_dialog_open_failed(inputs)
	if (locale === "he") return __he.chat_dialog_open_failed(inputs)
	return __ru.chat_dialog_open_failed(inputs)
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
* | "Edit message" |
*
* @param {Chat_Edit_TitleInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_edit_title = /** @type {((inputs?: Chat_Edit_TitleInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Edit_TitleInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_edit_title(inputs)
	if (locale === "fr") return __fr.chat_edit_title(inputs)
	if (locale === "es") return __es.chat_edit_title(inputs)
	if (locale === "zh") return __zh.chat_edit_title(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_edit_title(inputs)
	if (locale === "hi") return __hi.chat_edit_title(inputs)
	if (locale === "ar") return __ar.chat_edit_title(inputs)
	if (locale === "pt") return __pt.chat_edit_title(inputs)
	if (locale === "de") return __de.chat_edit_title(inputs)
	if (locale === "ja") return __ja.chat_edit_title(inputs)
	if (locale === "ko") return __ko.chat_edit_title(inputs)
	if (locale === "it") return __it.chat_edit_title(inputs)
	if (locale === "tr") return __tr.chat_edit_title(inputs)
	if (locale === "pl") return __pl.chat_edit_title(inputs)
	if (locale === "uk") return __uk.chat_edit_title(inputs)
	if (locale === "nl") return __nl.chat_edit_title(inputs)
	if (locale === "vi") return __vi.chat_edit_title(inputs)
	if (locale === "id") return __id.chat_edit_title(inputs)
	if (locale === "ms") return __ms.chat_edit_title(inputs)
	if (locale === "th") return __th.chat_edit_title(inputs)
	if (locale === "fa") return __fa.chat_edit_title(inputs)
	if (locale === "ur") return __ur.chat_edit_title(inputs)
	if (locale === "bn") return __bn.chat_edit_title(inputs)
	if (locale === "pa") return __pa.chat_edit_title(inputs)
	if (locale === "sw") return __sw.chat_edit_title(inputs)
	if (locale === "el") return __el.chat_edit_title(inputs)
	if (locale === "cs") return __cs.chat_edit_title(inputs)
	if (locale === "ro") return __ro.chat_edit_title(inputs)
	if (locale === "hu") return __hu.chat_edit_title(inputs)
	if (locale === "sv") return __sv.chat_edit_title(inputs)
	if (locale === "he") return __he.chat_edit_title(inputs)
	return __ru.chat_edit_title(inputs)
});
/**
* | output |
* | --- |
* | "edited" |
*
* @param {Chat_EditedInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_edited = /** @type {((inputs?: Chat_EditedInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_EditedInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_edited(inputs)
	if (locale === "fr") return __fr.chat_edited(inputs)
	if (locale === "es") return __es.chat_edited(inputs)
	if (locale === "zh") return __zh.chat_edited(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_edited(inputs)
	if (locale === "hi") return __hi.chat_edited(inputs)
	if (locale === "ar") return __ar.chat_edited(inputs)
	if (locale === "pt") return __pt.chat_edited(inputs)
	if (locale === "de") return __de.chat_edited(inputs)
	if (locale === "ja") return __ja.chat_edited(inputs)
	if (locale === "ko") return __ko.chat_edited(inputs)
	if (locale === "it") return __it.chat_edited(inputs)
	if (locale === "tr") return __tr.chat_edited(inputs)
	if (locale === "pl") return __pl.chat_edited(inputs)
	if (locale === "uk") return __uk.chat_edited(inputs)
	if (locale === "nl") return __nl.chat_edited(inputs)
	if (locale === "vi") return __vi.chat_edited(inputs)
	if (locale === "id") return __id.chat_edited(inputs)
	if (locale === "ms") return __ms.chat_edited(inputs)
	if (locale === "th") return __th.chat_edited(inputs)
	if (locale === "fa") return __fa.chat_edited(inputs)
	if (locale === "ur") return __ur.chat_edited(inputs)
	if (locale === "bn") return __bn.chat_edited(inputs)
	if (locale === "pa") return __pa.chat_edited(inputs)
	if (locale === "sw") return __sw.chat_edited(inputs)
	if (locale === "el") return __el.chat_edited(inputs)
	if (locale === "cs") return __cs.chat_edited(inputs)
	if (locale === "ro") return __ro.chat_edited(inputs)
	if (locale === "hu") return __hu.chat_edited(inputs)
	if (locale === "sv") return __sv.chat_edited(inputs)
	if (locale === "he") return __he.chat_edited(inputs)
	return __ru.chat_edited(inputs)
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
* | "No other chats to forward to." |
*
* @param {Chat_Forward_EmptyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_forward_empty = /** @type {((inputs?: Chat_Forward_EmptyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Forward_EmptyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_forward_empty(inputs)
	if (locale === "fr") return __fr.chat_forward_empty(inputs)
	if (locale === "es") return __es.chat_forward_empty(inputs)
	if (locale === "zh") return __zh.chat_forward_empty(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_forward_empty(inputs)
	if (locale === "hi") return __hi.chat_forward_empty(inputs)
	if (locale === "ar") return __ar.chat_forward_empty(inputs)
	if (locale === "pt") return __pt.chat_forward_empty(inputs)
	if (locale === "de") return __de.chat_forward_empty(inputs)
	if (locale === "ja") return __ja.chat_forward_empty(inputs)
	if (locale === "ko") return __ko.chat_forward_empty(inputs)
	if (locale === "it") return __it.chat_forward_empty(inputs)
	if (locale === "tr") return __tr.chat_forward_empty(inputs)
	if (locale === "pl") return __pl.chat_forward_empty(inputs)
	if (locale === "uk") return __uk.chat_forward_empty(inputs)
	if (locale === "nl") return __nl.chat_forward_empty(inputs)
	if (locale === "vi") return __vi.chat_forward_empty(inputs)
	if (locale === "id") return __id.chat_forward_empty(inputs)
	if (locale === "ms") return __ms.chat_forward_empty(inputs)
	if (locale === "th") return __th.chat_forward_empty(inputs)
	if (locale === "fa") return __fa.chat_forward_empty(inputs)
	if (locale === "ur") return __ur.chat_forward_empty(inputs)
	if (locale === "bn") return __bn.chat_forward_empty(inputs)
	if (locale === "pa") return __pa.chat_forward_empty(inputs)
	if (locale === "sw") return __sw.chat_forward_empty(inputs)
	if (locale === "el") return __el.chat_forward_empty(inputs)
	if (locale === "cs") return __cs.chat_forward_empty(inputs)
	if (locale === "ro") return __ro.chat_forward_empty(inputs)
	if (locale === "hu") return __hu.chat_forward_empty(inputs)
	if (locale === "sv") return __sv.chat_forward_empty(inputs)
	if (locale === "he") return __he.chat_forward_empty(inputs)
	return __ru.chat_forward_empty(inputs)
});
/**
* | output |
* | --- |
* | "Couldn’t forward message" |
*
* @param {Chat_Forward_FailedInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_forward_failed = /** @type {((inputs?: Chat_Forward_FailedInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Forward_FailedInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_forward_failed(inputs)
	if (locale === "fr") return __fr.chat_forward_failed(inputs)
	if (locale === "es") return __es.chat_forward_failed(inputs)
	if (locale === "zh") return __zh.chat_forward_failed(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_forward_failed(inputs)
	if (locale === "hi") return __hi.chat_forward_failed(inputs)
	if (locale === "ar") return __ar.chat_forward_failed(inputs)
	if (locale === "pt") return __pt.chat_forward_failed(inputs)
	if (locale === "de") return __de.chat_forward_failed(inputs)
	if (locale === "ja") return __ja.chat_forward_failed(inputs)
	if (locale === "ko") return __ko.chat_forward_failed(inputs)
	if (locale === "it") return __it.chat_forward_failed(inputs)
	if (locale === "tr") return __tr.chat_forward_failed(inputs)
	if (locale === "pl") return __pl.chat_forward_failed(inputs)
	if (locale === "uk") return __uk.chat_forward_failed(inputs)
	if (locale === "nl") return __nl.chat_forward_failed(inputs)
	if (locale === "vi") return __vi.chat_forward_failed(inputs)
	if (locale === "id") return __id.chat_forward_failed(inputs)
	if (locale === "ms") return __ms.chat_forward_failed(inputs)
	if (locale === "th") return __th.chat_forward_failed(inputs)
	if (locale === "fa") return __fa.chat_forward_failed(inputs)
	if (locale === "ur") return __ur.chat_forward_failed(inputs)
	if (locale === "bn") return __bn.chat_forward_failed(inputs)
	if (locale === "pa") return __pa.chat_forward_failed(inputs)
	if (locale === "sw") return __sw.chat_forward_failed(inputs)
	if (locale === "el") return __el.chat_forward_failed(inputs)
	if (locale === "cs") return __cs.chat_forward_failed(inputs)
	if (locale === "ro") return __ro.chat_forward_failed(inputs)
	if (locale === "hu") return __hu.chat_forward_failed(inputs)
	if (locale === "sv") return __sv.chat_forward_failed(inputs)
	if (locale === "he") return __he.chat_forward_failed(inputs)
	return __ru.chat_forward_failed(inputs)
});
/**
* | output |
* | --- |
* | "Couldn’t load chats." |
*
* @param {Chat_Forward_Load_FailedInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_forward_load_failed = /** @type {((inputs?: Chat_Forward_Load_FailedInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Forward_Load_FailedInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_forward_load_failed(inputs)
	if (locale === "fr") return __fr.chat_forward_load_failed(inputs)
	if (locale === "es") return __es.chat_forward_load_failed(inputs)
	if (locale === "zh") return __zh.chat_forward_load_failed(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_forward_load_failed(inputs)
	if (locale === "hi") return __hi.chat_forward_load_failed(inputs)
	if (locale === "ar") return __ar.chat_forward_load_failed(inputs)
	if (locale === "pt") return __pt.chat_forward_load_failed(inputs)
	if (locale === "de") return __de.chat_forward_load_failed(inputs)
	if (locale === "ja") return __ja.chat_forward_load_failed(inputs)
	if (locale === "ko") return __ko.chat_forward_load_failed(inputs)
	if (locale === "it") return __it.chat_forward_load_failed(inputs)
	if (locale === "tr") return __tr.chat_forward_load_failed(inputs)
	if (locale === "pl") return __pl.chat_forward_load_failed(inputs)
	if (locale === "uk") return __uk.chat_forward_load_failed(inputs)
	if (locale === "nl") return __nl.chat_forward_load_failed(inputs)
	if (locale === "vi") return __vi.chat_forward_load_failed(inputs)
	if (locale === "id") return __id.chat_forward_load_failed(inputs)
	if (locale === "ms") return __ms.chat_forward_load_failed(inputs)
	if (locale === "th") return __th.chat_forward_load_failed(inputs)
	if (locale === "fa") return __fa.chat_forward_load_failed(inputs)
	if (locale === "ur") return __ur.chat_forward_load_failed(inputs)
	if (locale === "bn") return __bn.chat_forward_load_failed(inputs)
	if (locale === "pa") return __pa.chat_forward_load_failed(inputs)
	if (locale === "sw") return __sw.chat_forward_load_failed(inputs)
	if (locale === "el") return __el.chat_forward_load_failed(inputs)
	if (locale === "cs") return __cs.chat_forward_load_failed(inputs)
	if (locale === "ro") return __ro.chat_forward_load_failed(inputs)
	if (locale === "hu") return __hu.chat_forward_load_failed(inputs)
	if (locale === "sv") return __sv.chat_forward_load_failed(inputs)
	if (locale === "he") return __he.chat_forward_load_failed(inputs)
	return __ru.chat_forward_load_failed(inputs)
});
/**
* | output |
* | --- |
* | "Loading chats…" |
*
* @param {Chat_Forward_LoadingInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_forward_loading = /** @type {((inputs?: Chat_Forward_LoadingInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Forward_LoadingInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_forward_loading(inputs)
	if (locale === "fr") return __fr.chat_forward_loading(inputs)
	if (locale === "es") return __es.chat_forward_loading(inputs)
	if (locale === "zh") return __zh.chat_forward_loading(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_forward_loading(inputs)
	if (locale === "hi") return __hi.chat_forward_loading(inputs)
	if (locale === "ar") return __ar.chat_forward_loading(inputs)
	if (locale === "pt") return __pt.chat_forward_loading(inputs)
	if (locale === "de") return __de.chat_forward_loading(inputs)
	if (locale === "ja") return __ja.chat_forward_loading(inputs)
	if (locale === "ko") return __ko.chat_forward_loading(inputs)
	if (locale === "it") return __it.chat_forward_loading(inputs)
	if (locale === "tr") return __tr.chat_forward_loading(inputs)
	if (locale === "pl") return __pl.chat_forward_loading(inputs)
	if (locale === "uk") return __uk.chat_forward_loading(inputs)
	if (locale === "nl") return __nl.chat_forward_loading(inputs)
	if (locale === "vi") return __vi.chat_forward_loading(inputs)
	if (locale === "id") return __id.chat_forward_loading(inputs)
	if (locale === "ms") return __ms.chat_forward_loading(inputs)
	if (locale === "th") return __th.chat_forward_loading(inputs)
	if (locale === "fa") return __fa.chat_forward_loading(inputs)
	if (locale === "ur") return __ur.chat_forward_loading(inputs)
	if (locale === "bn") return __bn.chat_forward_loading(inputs)
	if (locale === "pa") return __pa.chat_forward_loading(inputs)
	if (locale === "sw") return __sw.chat_forward_loading(inputs)
	if (locale === "el") return __el.chat_forward_loading(inputs)
	if (locale === "cs") return __cs.chat_forward_loading(inputs)
	if (locale === "ro") return __ro.chat_forward_loading(inputs)
	if (locale === "hu") return __hu.chat_forward_loading(inputs)
	if (locale === "sv") return __sv.chat_forward_loading(inputs)
	if (locale === "he") return __he.chat_forward_loading(inputs)
	return __ru.chat_forward_loading(inputs)
});
/**
* | output |
* | --- |
* | "No network — forwarding unavailable" |
*
* @param {Chat_Forward_OfflineInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_forward_offline = /** @type {((inputs?: Chat_Forward_OfflineInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Forward_OfflineInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_forward_offline(inputs)
	if (locale === "fr") return __fr.chat_forward_offline(inputs)
	if (locale === "es") return __es.chat_forward_offline(inputs)
	if (locale === "zh") return __zh.chat_forward_offline(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_forward_offline(inputs)
	if (locale === "hi") return __hi.chat_forward_offline(inputs)
	if (locale === "ar") return __ar.chat_forward_offline(inputs)
	if (locale === "pt") return __pt.chat_forward_offline(inputs)
	if (locale === "de") return __de.chat_forward_offline(inputs)
	if (locale === "ja") return __ja.chat_forward_offline(inputs)
	if (locale === "ko") return __ko.chat_forward_offline(inputs)
	if (locale === "it") return __it.chat_forward_offline(inputs)
	if (locale === "tr") return __tr.chat_forward_offline(inputs)
	if (locale === "pl") return __pl.chat_forward_offline(inputs)
	if (locale === "uk") return __uk.chat_forward_offline(inputs)
	if (locale === "nl") return __nl.chat_forward_offline(inputs)
	if (locale === "vi") return __vi.chat_forward_offline(inputs)
	if (locale === "id") return __id.chat_forward_offline(inputs)
	if (locale === "ms") return __ms.chat_forward_offline(inputs)
	if (locale === "th") return __th.chat_forward_offline(inputs)
	if (locale === "fa") return __fa.chat_forward_offline(inputs)
	if (locale === "ur") return __ur.chat_forward_offline(inputs)
	if (locale === "bn") return __bn.chat_forward_offline(inputs)
	if (locale === "pa") return __pa.chat_forward_offline(inputs)
	if (locale === "sw") return __sw.chat_forward_offline(inputs)
	if (locale === "el") return __el.chat_forward_offline(inputs)
	if (locale === "cs") return __cs.chat_forward_offline(inputs)
	if (locale === "ro") return __ro.chat_forward_offline(inputs)
	if (locale === "hu") return __hu.chat_forward_offline(inputs)
	if (locale === "sv") return __sv.chat_forward_offline(inputs)
	if (locale === "he") return __he.chat_forward_offline(inputs)
	return __ru.chat_forward_offline(inputs)
});
/**
* | output |
* | --- |
* | "Couldn’t forward photo" |
*
* @param {Chat_Forward_Photo_FailedInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_forward_photo_failed = /** @type {((inputs?: Chat_Forward_Photo_FailedInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Forward_Photo_FailedInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_forward_photo_failed(inputs)
	if (locale === "fr") return __fr.chat_forward_photo_failed(inputs)
	if (locale === "es") return __es.chat_forward_photo_failed(inputs)
	if (locale === "zh") return __zh.chat_forward_photo_failed(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_forward_photo_failed(inputs)
	if (locale === "hi") return __hi.chat_forward_photo_failed(inputs)
	if (locale === "ar") return __ar.chat_forward_photo_failed(inputs)
	if (locale === "pt") return __pt.chat_forward_photo_failed(inputs)
	if (locale === "de") return __de.chat_forward_photo_failed(inputs)
	if (locale === "ja") return __ja.chat_forward_photo_failed(inputs)
	if (locale === "ko") return __ko.chat_forward_photo_failed(inputs)
	if (locale === "it") return __it.chat_forward_photo_failed(inputs)
	if (locale === "tr") return __tr.chat_forward_photo_failed(inputs)
	if (locale === "pl") return __pl.chat_forward_photo_failed(inputs)
	if (locale === "uk") return __uk.chat_forward_photo_failed(inputs)
	if (locale === "nl") return __nl.chat_forward_photo_failed(inputs)
	if (locale === "vi") return __vi.chat_forward_photo_failed(inputs)
	if (locale === "id") return __id.chat_forward_photo_failed(inputs)
	if (locale === "ms") return __ms.chat_forward_photo_failed(inputs)
	if (locale === "th") return __th.chat_forward_photo_failed(inputs)
	if (locale === "fa") return __fa.chat_forward_photo_failed(inputs)
	if (locale === "ur") return __ur.chat_forward_photo_failed(inputs)
	if (locale === "bn") return __bn.chat_forward_photo_failed(inputs)
	if (locale === "pa") return __pa.chat_forward_photo_failed(inputs)
	if (locale === "sw") return __sw.chat_forward_photo_failed(inputs)
	if (locale === "el") return __el.chat_forward_photo_failed(inputs)
	if (locale === "cs") return __cs.chat_forward_photo_failed(inputs)
	if (locale === "ro") return __ro.chat_forward_photo_failed(inputs)
	if (locale === "hu") return __hu.chat_forward_photo_failed(inputs)
	if (locale === "sv") return __sv.chat_forward_photo_failed(inputs)
	if (locale === "he") return __he.chat_forward_photo_failed(inputs)
	return __ru.chat_forward_photo_failed(inputs)
});
/**
* | output |
* | --- |
* | "Forward message" |
*
* @param {Chat_Forward_TitleInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_forward_title = /** @type {((inputs?: Chat_Forward_TitleInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Forward_TitleInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_forward_title(inputs)
	if (locale === "fr") return __fr.chat_forward_title(inputs)
	if (locale === "es") return __es.chat_forward_title(inputs)
	if (locale === "zh") return __zh.chat_forward_title(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_forward_title(inputs)
	if (locale === "hi") return __hi.chat_forward_title(inputs)
	if (locale === "ar") return __ar.chat_forward_title(inputs)
	if (locale === "pt") return __pt.chat_forward_title(inputs)
	if (locale === "de") return __de.chat_forward_title(inputs)
	if (locale === "ja") return __ja.chat_forward_title(inputs)
	if (locale === "ko") return __ko.chat_forward_title(inputs)
	if (locale === "it") return __it.chat_forward_title(inputs)
	if (locale === "tr") return __tr.chat_forward_title(inputs)
	if (locale === "pl") return __pl.chat_forward_title(inputs)
	if (locale === "uk") return __uk.chat_forward_title(inputs)
	if (locale === "nl") return __nl.chat_forward_title(inputs)
	if (locale === "vi") return __vi.chat_forward_title(inputs)
	if (locale === "id") return __id.chat_forward_title(inputs)
	if (locale === "ms") return __ms.chat_forward_title(inputs)
	if (locale === "th") return __th.chat_forward_title(inputs)
	if (locale === "fa") return __fa.chat_forward_title(inputs)
	if (locale === "ur") return __ur.chat_forward_title(inputs)
	if (locale === "bn") return __bn.chat_forward_title(inputs)
	if (locale === "pa") return __pa.chat_forward_title(inputs)
	if (locale === "sw") return __sw.chat_forward_title(inputs)
	if (locale === "el") return __el.chat_forward_title(inputs)
	if (locale === "cs") return __cs.chat_forward_title(inputs)
	if (locale === "ro") return __ro.chat_forward_title(inputs)
	if (locale === "hu") return __hu.chat_forward_title(inputs)
	if (locale === "sv") return __sv.chat_forward_title(inputs)
	if (locale === "he") return __he.chat_forward_title(inputs)
	return __ru.chat_forward_title(inputs)
});
/**
* | output |
* | --- |
* | "Couldn’t forward voice" |
*
* @param {Chat_Forward_Voice_FailedInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_forward_voice_failed = /** @type {((inputs?: Chat_Forward_Voice_FailedInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Forward_Voice_FailedInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_forward_voice_failed(inputs)
	if (locale === "fr") return __fr.chat_forward_voice_failed(inputs)
	if (locale === "es") return __es.chat_forward_voice_failed(inputs)
	if (locale === "zh") return __zh.chat_forward_voice_failed(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_forward_voice_failed(inputs)
	if (locale === "hi") return __hi.chat_forward_voice_failed(inputs)
	if (locale === "ar") return __ar.chat_forward_voice_failed(inputs)
	if (locale === "pt") return __pt.chat_forward_voice_failed(inputs)
	if (locale === "de") return __de.chat_forward_voice_failed(inputs)
	if (locale === "ja") return __ja.chat_forward_voice_failed(inputs)
	if (locale === "ko") return __ko.chat_forward_voice_failed(inputs)
	if (locale === "it") return __it.chat_forward_voice_failed(inputs)
	if (locale === "tr") return __tr.chat_forward_voice_failed(inputs)
	if (locale === "pl") return __pl.chat_forward_voice_failed(inputs)
	if (locale === "uk") return __uk.chat_forward_voice_failed(inputs)
	if (locale === "nl") return __nl.chat_forward_voice_failed(inputs)
	if (locale === "vi") return __vi.chat_forward_voice_failed(inputs)
	if (locale === "id") return __id.chat_forward_voice_failed(inputs)
	if (locale === "ms") return __ms.chat_forward_voice_failed(inputs)
	if (locale === "th") return __th.chat_forward_voice_failed(inputs)
	if (locale === "fa") return __fa.chat_forward_voice_failed(inputs)
	if (locale === "ur") return __ur.chat_forward_voice_failed(inputs)
	if (locale === "bn") return __bn.chat_forward_voice_failed(inputs)
	if (locale === "pa") return __pa.chat_forward_voice_failed(inputs)
	if (locale === "sw") return __sw.chat_forward_voice_failed(inputs)
	if (locale === "el") return __el.chat_forward_voice_failed(inputs)
	if (locale === "cs") return __cs.chat_forward_voice_failed(inputs)
	if (locale === "ro") return __ro.chat_forward_voice_failed(inputs)
	if (locale === "hu") return __hu.chat_forward_voice_failed(inputs)
	if (locale === "sv") return __sv.chat_forward_voice_failed(inputs)
	if (locale === "he") return __he.chat_forward_voice_failed(inputs)
	return __ru.chat_forward_voice_failed(inputs)
});
/**
* | output |
* | --- |
* | "Forwarded · Enter to send" |
*
* @param {Chat_ForwardedInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_forwarded = /** @type {((inputs?: Chat_ForwardedInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_ForwardedInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_forwarded(inputs)
	if (locale === "fr") return __fr.chat_forwarded(inputs)
	if (locale === "es") return __es.chat_forwarded(inputs)
	if (locale === "zh") return __zh.chat_forwarded(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_forwarded(inputs)
	if (locale === "hi") return __hi.chat_forwarded(inputs)
	if (locale === "ar") return __ar.chat_forwarded(inputs)
	if (locale === "pt") return __pt.chat_forwarded(inputs)
	if (locale === "de") return __de.chat_forwarded(inputs)
	if (locale === "ja") return __ja.chat_forwarded(inputs)
	if (locale === "ko") return __ko.chat_forwarded(inputs)
	if (locale === "it") return __it.chat_forwarded(inputs)
	if (locale === "tr") return __tr.chat_forwarded(inputs)
	if (locale === "pl") return __pl.chat_forwarded(inputs)
	if (locale === "uk") return __uk.chat_forwarded(inputs)
	if (locale === "nl") return __nl.chat_forwarded(inputs)
	if (locale === "vi") return __vi.chat_forwarded(inputs)
	if (locale === "id") return __id.chat_forwarded(inputs)
	if (locale === "ms") return __ms.chat_forwarded(inputs)
	if (locale === "th") return __th.chat_forwarded(inputs)
	if (locale === "fa") return __fa.chat_forwarded(inputs)
	if (locale === "ur") return __ur.chat_forwarded(inputs)
	if (locale === "bn") return __bn.chat_forwarded(inputs)
	if (locale === "pa") return __pa.chat_forwarded(inputs)
	if (locale === "sw") return __sw.chat_forwarded(inputs)
	if (locale === "el") return __el.chat_forwarded(inputs)
	if (locale === "cs") return __cs.chat_forwarded(inputs)
	if (locale === "ro") return __ro.chat_forwarded(inputs)
	if (locale === "hu") return __hu.chat_forwarded(inputs)
	if (locale === "sv") return __sv.chat_forwarded(inputs)
	if (locale === "he") return __he.chat_forwarded(inputs)
	return __ru.chat_forwarded(inputs)
});
/**
* | output |
* | --- |
* | "[Forwarded]" |
*
* @param {Chat_Forwarded_TagInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_forwarded_tag = /** @type {((inputs?: Chat_Forwarded_TagInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Forwarded_TagInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_forwarded_tag(inputs)
	if (locale === "fr") return __fr.chat_forwarded_tag(inputs)
	if (locale === "es") return __es.chat_forwarded_tag(inputs)
	if (locale === "zh") return __zh.chat_forwarded_tag(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_forwarded_tag(inputs)
	if (locale === "hi") return __hi.chat_forwarded_tag(inputs)
	if (locale === "ar") return __ar.chat_forwarded_tag(inputs)
	if (locale === "pt") return __pt.chat_forwarded_tag(inputs)
	if (locale === "de") return __de.chat_forwarded_tag(inputs)
	if (locale === "ja") return __ja.chat_forwarded_tag(inputs)
	if (locale === "ko") return __ko.chat_forwarded_tag(inputs)
	if (locale === "it") return __it.chat_forwarded_tag(inputs)
	if (locale === "tr") return __tr.chat_forwarded_tag(inputs)
	if (locale === "pl") return __pl.chat_forwarded_tag(inputs)
	if (locale === "uk") return __uk.chat_forwarded_tag(inputs)
	if (locale === "nl") return __nl.chat_forwarded_tag(inputs)
	if (locale === "vi") return __vi.chat_forwarded_tag(inputs)
	if (locale === "id") return __id.chat_forwarded_tag(inputs)
	if (locale === "ms") return __ms.chat_forwarded_tag(inputs)
	if (locale === "th") return __th.chat_forwarded_tag(inputs)
	if (locale === "fa") return __fa.chat_forwarded_tag(inputs)
	if (locale === "ur") return __ur.chat_forwarded_tag(inputs)
	if (locale === "bn") return __bn.chat_forwarded_tag(inputs)
	if (locale === "pa") return __pa.chat_forwarded_tag(inputs)
	if (locale === "sw") return __sw.chat_forwarded_tag(inputs)
	if (locale === "el") return __el.chat_forwarded_tag(inputs)
	if (locale === "cs") return __cs.chat_forwarded_tag(inputs)
	if (locale === "ro") return __ro.chat_forwarded_tag(inputs)
	if (locale === "hu") return __hu.chat_forwarded_tag(inputs)
	if (locale === "sv") return __sv.chat_forwarded_tag(inputs)
	if (locale === "he") return __he.chat_forwarded_tag(inputs)
	return __ru.chat_forwarded_tag(inputs)
});
/**
* | output |
* | --- |
* | "Forwarding…" |
*
* @param {Chat_ForwardingInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_forwarding = /** @type {((inputs?: Chat_ForwardingInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_ForwardingInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_forwarding(inputs)
	if (locale === "fr") return __fr.chat_forwarding(inputs)
	if (locale === "es") return __es.chat_forwarding(inputs)
	if (locale === "zh") return __zh.chat_forwarding(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_forwarding(inputs)
	if (locale === "hi") return __hi.chat_forwarding(inputs)
	if (locale === "ar") return __ar.chat_forwarding(inputs)
	if (locale === "pt") return __pt.chat_forwarding(inputs)
	if (locale === "de") return __de.chat_forwarding(inputs)
	if (locale === "ja") return __ja.chat_forwarding(inputs)
	if (locale === "ko") return __ko.chat_forwarding(inputs)
	if (locale === "it") return __it.chat_forwarding(inputs)
	if (locale === "tr") return __tr.chat_forwarding(inputs)
	if (locale === "pl") return __pl.chat_forwarding(inputs)
	if (locale === "uk") return __uk.chat_forwarding(inputs)
	if (locale === "nl") return __nl.chat_forwarding(inputs)
	if (locale === "vi") return __vi.chat_forwarding(inputs)
	if (locale === "id") return __id.chat_forwarding(inputs)
	if (locale === "ms") return __ms.chat_forwarding(inputs)
	if (locale === "th") return __th.chat_forwarding(inputs)
	if (locale === "fa") return __fa.chat_forwarding(inputs)
	if (locale === "ur") return __ur.chat_forwarding(inputs)
	if (locale === "bn") return __bn.chat_forwarding(inputs)
	if (locale === "pa") return __pa.chat_forwarding(inputs)
	if (locale === "sw") return __sw.chat_forwarding(inputs)
	if (locale === "el") return __el.chat_forwarding(inputs)
	if (locale === "cs") return __cs.chat_forwarding(inputs)
	if (locale === "ro") return __ro.chat_forwarding(inputs)
	if (locale === "hu") return __hu.chat_forwarding(inputs)
	if (locale === "sv") return __sv.chat_forwarding(inputs)
	if (locale === "he") return __he.chat_forwarding(inputs)
	return __ru.chat_forwarding(inputs)
});
/**
* | output |
* | --- |
* | "Forwarding photo…" |
*
* @param {Chat_Forwarding_PhotoInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_forwarding_photo = /** @type {((inputs?: Chat_Forwarding_PhotoInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Forwarding_PhotoInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_forwarding_photo(inputs)
	if (locale === "fr") return __fr.chat_forwarding_photo(inputs)
	if (locale === "es") return __es.chat_forwarding_photo(inputs)
	if (locale === "zh") return __zh.chat_forwarding_photo(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_forwarding_photo(inputs)
	if (locale === "hi") return __hi.chat_forwarding_photo(inputs)
	if (locale === "ar") return __ar.chat_forwarding_photo(inputs)
	if (locale === "pt") return __pt.chat_forwarding_photo(inputs)
	if (locale === "de") return __de.chat_forwarding_photo(inputs)
	if (locale === "ja") return __ja.chat_forwarding_photo(inputs)
	if (locale === "ko") return __ko.chat_forwarding_photo(inputs)
	if (locale === "it") return __it.chat_forwarding_photo(inputs)
	if (locale === "tr") return __tr.chat_forwarding_photo(inputs)
	if (locale === "pl") return __pl.chat_forwarding_photo(inputs)
	if (locale === "uk") return __uk.chat_forwarding_photo(inputs)
	if (locale === "nl") return __nl.chat_forwarding_photo(inputs)
	if (locale === "vi") return __vi.chat_forwarding_photo(inputs)
	if (locale === "id") return __id.chat_forwarding_photo(inputs)
	if (locale === "ms") return __ms.chat_forwarding_photo(inputs)
	if (locale === "th") return __th.chat_forwarding_photo(inputs)
	if (locale === "fa") return __fa.chat_forwarding_photo(inputs)
	if (locale === "ur") return __ur.chat_forwarding_photo(inputs)
	if (locale === "bn") return __bn.chat_forwarding_photo(inputs)
	if (locale === "pa") return __pa.chat_forwarding_photo(inputs)
	if (locale === "sw") return __sw.chat_forwarding_photo(inputs)
	if (locale === "el") return __el.chat_forwarding_photo(inputs)
	if (locale === "cs") return __cs.chat_forwarding_photo(inputs)
	if (locale === "ro") return __ro.chat_forwarding_photo(inputs)
	if (locale === "hu") return __hu.chat_forwarding_photo(inputs)
	if (locale === "sv") return __sv.chat_forwarding_photo(inputs)
	if (locale === "he") return __he.chat_forwarding_photo(inputs)
	return __ru.chat_forwarding_photo(inputs)
});
/**
* | output |
* | --- |
* | "Forwarding voice…" |
*
* @param {Chat_Forwarding_VoiceInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_forwarding_voice = /** @type {((inputs?: Chat_Forwarding_VoiceInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Forwarding_VoiceInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_forwarding_voice(inputs)
	if (locale === "fr") return __fr.chat_forwarding_voice(inputs)
	if (locale === "es") return __es.chat_forwarding_voice(inputs)
	if (locale === "zh") return __zh.chat_forwarding_voice(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_forwarding_voice(inputs)
	if (locale === "hi") return __hi.chat_forwarding_voice(inputs)
	if (locale === "ar") return __ar.chat_forwarding_voice(inputs)
	if (locale === "pt") return __pt.chat_forwarding_voice(inputs)
	if (locale === "de") return __de.chat_forwarding_voice(inputs)
	if (locale === "ja") return __ja.chat_forwarding_voice(inputs)
	if (locale === "ko") return __ko.chat_forwarding_voice(inputs)
	if (locale === "it") return __it.chat_forwarding_voice(inputs)
	if (locale === "tr") return __tr.chat_forwarding_voice(inputs)
	if (locale === "pl") return __pl.chat_forwarding_voice(inputs)
	if (locale === "uk") return __uk.chat_forwarding_voice(inputs)
	if (locale === "nl") return __nl.chat_forwarding_voice(inputs)
	if (locale === "vi") return __vi.chat_forwarding_voice(inputs)
	if (locale === "id") return __id.chat_forwarding_voice(inputs)
	if (locale === "ms") return __ms.chat_forwarding_voice(inputs)
	if (locale === "th") return __th.chat_forwarding_voice(inputs)
	if (locale === "fa") return __fa.chat_forwarding_voice(inputs)
	if (locale === "ur") return __ur.chat_forwarding_voice(inputs)
	if (locale === "bn") return __bn.chat_forwarding_voice(inputs)
	if (locale === "pa") return __pa.chat_forwarding_voice(inputs)
	if (locale === "sw") return __sw.chat_forwarding_voice(inputs)
	if (locale === "el") return __el.chat_forwarding_voice(inputs)
	if (locale === "cs") return __cs.chat_forwarding_voice(inputs)
	if (locale === "ro") return __ro.chat_forwarding_voice(inputs)
	if (locale === "hu") return __hu.chat_forwarding_voice(inputs)
	if (locale === "sv") return __sv.chat_forwarding_voice(inputs)
	if (locale === "he") return __he.chat_forwarding_voice(inputs)
	return __ru.chat_forwarding_voice(inputs)
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
* | "Couldn’t load history" |
*
* @param {Chat_History_ErrorInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_history_error = /** @type {((inputs?: Chat_History_ErrorInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_History_ErrorInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_history_error(inputs)
	if (locale === "fr") return __fr.chat_history_error(inputs)
	if (locale === "es") return __es.chat_history_error(inputs)
	if (locale === "zh") return __zh.chat_history_error(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_history_error(inputs)
	if (locale === "hi") return __hi.chat_history_error(inputs)
	if (locale === "ar") return __ar.chat_history_error(inputs)
	if (locale === "pt") return __pt.chat_history_error(inputs)
	if (locale === "de") return __de.chat_history_error(inputs)
	if (locale === "ja") return __ja.chat_history_error(inputs)
	if (locale === "ko") return __ko.chat_history_error(inputs)
	if (locale === "it") return __it.chat_history_error(inputs)
	if (locale === "tr") return __tr.chat_history_error(inputs)
	if (locale === "pl") return __pl.chat_history_error(inputs)
	if (locale === "uk") return __uk.chat_history_error(inputs)
	if (locale === "nl") return __nl.chat_history_error(inputs)
	if (locale === "vi") return __vi.chat_history_error(inputs)
	if (locale === "id") return __id.chat_history_error(inputs)
	if (locale === "ms") return __ms.chat_history_error(inputs)
	if (locale === "th") return __th.chat_history_error(inputs)
	if (locale === "fa") return __fa.chat_history_error(inputs)
	if (locale === "ur") return __ur.chat_history_error(inputs)
	if (locale === "bn") return __bn.chat_history_error(inputs)
	if (locale === "pa") return __pa.chat_history_error(inputs)
	if (locale === "sw") return __sw.chat_history_error(inputs)
	if (locale === "el") return __el.chat_history_error(inputs)
	if (locale === "cs") return __cs.chat_history_error(inputs)
	if (locale === "ro") return __ro.chat_history_error(inputs)
	if (locale === "hu") return __hu.chat_history_error(inputs)
	if (locale === "sv") return __sv.chat_history_error(inputs)
	if (locale === "he") return __he.chat_history_error(inputs)
	return __ru.chat_history_error(inputs)
});
/**
* | output |
* | --- |
* | "Load failed · Retry" |
*
* @param {Chat_History_RetryInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_history_retry = /** @type {((inputs?: Chat_History_RetryInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_History_RetryInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_history_retry(inputs)
	if (locale === "fr") return __fr.chat_history_retry(inputs)
	if (locale === "es") return __es.chat_history_retry(inputs)
	if (locale === "zh") return __zh.chat_history_retry(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_history_retry(inputs)
	if (locale === "hi") return __hi.chat_history_retry(inputs)
	if (locale === "ar") return __ar.chat_history_retry(inputs)
	if (locale === "pt") return __pt.chat_history_retry(inputs)
	if (locale === "de") return __de.chat_history_retry(inputs)
	if (locale === "ja") return __ja.chat_history_retry(inputs)
	if (locale === "ko") return __ko.chat_history_retry(inputs)
	if (locale === "it") return __it.chat_history_retry(inputs)
	if (locale === "tr") return __tr.chat_history_retry(inputs)
	if (locale === "pl") return __pl.chat_history_retry(inputs)
	if (locale === "uk") return __uk.chat_history_retry(inputs)
	if (locale === "nl") return __nl.chat_history_retry(inputs)
	if (locale === "vi") return __vi.chat_history_retry(inputs)
	if (locale === "id") return __id.chat_history_retry(inputs)
	if (locale === "ms") return __ms.chat_history_retry(inputs)
	if (locale === "th") return __th.chat_history_retry(inputs)
	if (locale === "fa") return __fa.chat_history_retry(inputs)
	if (locale === "ur") return __ur.chat_history_retry(inputs)
	if (locale === "bn") return __bn.chat_history_retry(inputs)
	if (locale === "pa") return __pa.chat_history_retry(inputs)
	if (locale === "sw") return __sw.chat_history_retry(inputs)
	if (locale === "el") return __el.chat_history_retry(inputs)
	if (locale === "cs") return __cs.chat_history_retry(inputs)
	if (locale === "ro") return __ro.chat_history_retry(inputs)
	if (locale === "hu") return __hu.chat_history_retry(inputs)
	if (locale === "sv") return __sv.chat_history_retry(inputs)
	if (locale === "he") return __he.chat_history_retry(inputs)
	return __ru.chat_history_retry(inputs)
});
/**
* | output |
* | --- |
* | "Start of conversation" |
*
* @param {Chat_History_StartInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_history_start = /** @type {((inputs?: Chat_History_StartInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_History_StartInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_history_start(inputs)
	if (locale === "fr") return __fr.chat_history_start(inputs)
	if (locale === "es") return __es.chat_history_start(inputs)
	if (locale === "zh") return __zh.chat_history_start(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_history_start(inputs)
	if (locale === "hi") return __hi.chat_history_start(inputs)
	if (locale === "ar") return __ar.chat_history_start(inputs)
	if (locale === "pt") return __pt.chat_history_start(inputs)
	if (locale === "de") return __de.chat_history_start(inputs)
	if (locale === "ja") return __ja.chat_history_start(inputs)
	if (locale === "ko") return __ko.chat_history_start(inputs)
	if (locale === "it") return __it.chat_history_start(inputs)
	if (locale === "tr") return __tr.chat_history_start(inputs)
	if (locale === "pl") return __pl.chat_history_start(inputs)
	if (locale === "uk") return __uk.chat_history_start(inputs)
	if (locale === "nl") return __nl.chat_history_start(inputs)
	if (locale === "vi") return __vi.chat_history_start(inputs)
	if (locale === "id") return __id.chat_history_start(inputs)
	if (locale === "ms") return __ms.chat_history_start(inputs)
	if (locale === "th") return __th.chat_history_start(inputs)
	if (locale === "fa") return __fa.chat_history_start(inputs)
	if (locale === "ur") return __ur.chat_history_start(inputs)
	if (locale === "bn") return __bn.chat_history_start(inputs)
	if (locale === "pa") return __pa.chat_history_start(inputs)
	if (locale === "sw") return __sw.chat_history_start(inputs)
	if (locale === "el") return __el.chat_history_start(inputs)
	if (locale === "cs") return __cs.chat_history_start(inputs)
	if (locale === "ro") return __ro.chat_history_start(inputs)
	if (locale === "hu") return __hu.chat_history_start(inputs)
	if (locale === "sv") return __sv.chat_history_start(inputs)
	if (locale === "he") return __he.chat_history_start(inputs)
	return __ru.chat_history_start(inputs)
});
/**
* | output |
* | --- |
* | "{n} h ago" |
*
* @param {Chat_Hours_AgoInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_hours_ago = /** @type {((inputs: Chat_Hours_AgoInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Hours_AgoInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_hours_ago(inputs)
	if (locale === "fr") return __fr.chat_hours_ago(inputs)
	if (locale === "es") return __es.chat_hours_ago(inputs)
	if (locale === "zh") return __zh.chat_hours_ago(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_hours_ago(inputs)
	if (locale === "hi") return __hi.chat_hours_ago(inputs)
	if (locale === "ar") return __ar.chat_hours_ago(inputs)
	if (locale === "pt") return __pt.chat_hours_ago(inputs)
	if (locale === "de") return __de.chat_hours_ago(inputs)
	if (locale === "ja") return __ja.chat_hours_ago(inputs)
	if (locale === "ko") return __ko.chat_hours_ago(inputs)
	if (locale === "it") return __it.chat_hours_ago(inputs)
	if (locale === "tr") return __tr.chat_hours_ago(inputs)
	if (locale === "pl") return __pl.chat_hours_ago(inputs)
	if (locale === "uk") return __uk.chat_hours_ago(inputs)
	if (locale === "nl") return __nl.chat_hours_ago(inputs)
	if (locale === "vi") return __vi.chat_hours_ago(inputs)
	if (locale === "id") return __id.chat_hours_ago(inputs)
	if (locale === "ms") return __ms.chat_hours_ago(inputs)
	if (locale === "th") return __th.chat_hours_ago(inputs)
	if (locale === "fa") return __fa.chat_hours_ago(inputs)
	if (locale === "ur") return __ur.chat_hours_ago(inputs)
	if (locale === "bn") return __bn.chat_hours_ago(inputs)
	if (locale === "pa") return __pa.chat_hours_ago(inputs)
	if (locale === "sw") return __sw.chat_hours_ago(inputs)
	if (locale === "el") return __el.chat_hours_ago(inputs)
	if (locale === "cs") return __cs.chat_hours_ago(inputs)
	if (locale === "ro") return __ro.chat_hours_ago(inputs)
	if (locale === "hu") return __hu.chat_hours_ago(inputs)
	if (locale === "sv") return __sv.chat_hours_ago(inputs)
	if (locale === "he") return __he.chat_hours_ago(inputs)
	return __ru.chat_hours_ago(inputs)
});
/**
* | output |
* | --- |
* | "just now" |
*
* @param {Chat_Just_NowInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_just_now = /** @type {((inputs?: Chat_Just_NowInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Just_NowInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_just_now(inputs)
	if (locale === "fr") return __fr.chat_just_now(inputs)
	if (locale === "es") return __es.chat_just_now(inputs)
	if (locale === "zh") return __zh.chat_just_now(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_just_now(inputs)
	if (locale === "hi") return __hi.chat_just_now(inputs)
	if (locale === "ar") return __ar.chat_just_now(inputs)
	if (locale === "pt") return __pt.chat_just_now(inputs)
	if (locale === "de") return __de.chat_just_now(inputs)
	if (locale === "ja") return __ja.chat_just_now(inputs)
	if (locale === "ko") return __ko.chat_just_now(inputs)
	if (locale === "it") return __it.chat_just_now(inputs)
	if (locale === "tr") return __tr.chat_just_now(inputs)
	if (locale === "pl") return __pl.chat_just_now(inputs)
	if (locale === "uk") return __uk.chat_just_now(inputs)
	if (locale === "nl") return __nl.chat_just_now(inputs)
	if (locale === "vi") return __vi.chat_just_now(inputs)
	if (locale === "id") return __id.chat_just_now(inputs)
	if (locale === "ms") return __ms.chat_just_now(inputs)
	if (locale === "th") return __th.chat_just_now(inputs)
	if (locale === "fa") return __fa.chat_just_now(inputs)
	if (locale === "ur") return __ur.chat_just_now(inputs)
	if (locale === "bn") return __bn.chat_just_now(inputs)
	if (locale === "pa") return __pa.chat_just_now(inputs)
	if (locale === "sw") return __sw.chat_just_now(inputs)
	if (locale === "el") return __el.chat_just_now(inputs)
	if (locale === "cs") return __cs.chat_just_now(inputs)
	if (locale === "ro") return __ro.chat_just_now(inputs)
	if (locale === "hu") return __hu.chat_just_now(inputs)
	if (locale === "sv") return __sv.chat_just_now(inputs)
	if (locale === "he") return __he.chat_just_now(inputs)
	return __ru.chat_just_now(inputs)
});
/**
* | output |
* | --- |
* | "last seen {when}" |
*
* @param {Chat_Last_SeenInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_last_seen = /** @type {((inputs: Chat_Last_SeenInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Last_SeenInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_last_seen(inputs)
	if (locale === "fr") return __fr.chat_last_seen(inputs)
	if (locale === "es") return __es.chat_last_seen(inputs)
	if (locale === "zh") return __zh.chat_last_seen(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_last_seen(inputs)
	if (locale === "hi") return __hi.chat_last_seen(inputs)
	if (locale === "ar") return __ar.chat_last_seen(inputs)
	if (locale === "pt") return __pt.chat_last_seen(inputs)
	if (locale === "de") return __de.chat_last_seen(inputs)
	if (locale === "ja") return __ja.chat_last_seen(inputs)
	if (locale === "ko") return __ko.chat_last_seen(inputs)
	if (locale === "it") return __it.chat_last_seen(inputs)
	if (locale === "tr") return __tr.chat_last_seen(inputs)
	if (locale === "pl") return __pl.chat_last_seen(inputs)
	if (locale === "uk") return __uk.chat_last_seen(inputs)
	if (locale === "nl") return __nl.chat_last_seen(inputs)
	if (locale === "vi") return __vi.chat_last_seen(inputs)
	if (locale === "id") return __id.chat_last_seen(inputs)
	if (locale === "ms") return __ms.chat_last_seen(inputs)
	if (locale === "th") return __th.chat_last_seen(inputs)
	if (locale === "fa") return __fa.chat_last_seen(inputs)
	if (locale === "ur") return __ur.chat_last_seen(inputs)
	if (locale === "bn") return __bn.chat_last_seen(inputs)
	if (locale === "pa") return __pa.chat_last_seen(inputs)
	if (locale === "sw") return __sw.chat_last_seen(inputs)
	if (locale === "el") return __el.chat_last_seen(inputs)
	if (locale === "cs") return __cs.chat_last_seen(inputs)
	if (locale === "ro") return __ro.chat_last_seen(inputs)
	if (locale === "hu") return __hu.chat_last_seen(inputs)
	if (locale === "sv") return __sv.chat_last_seen(inputs)
	if (locale === "he") return __he.chat_last_seen(inputs)
	return __ru.chat_last_seen(inputs)
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
* | "off" |
*
* @param {Chat_Link_OffInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_link_off = /** @type {((inputs?: Chat_Link_OffInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Link_OffInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_link_off(inputs)
	if (locale === "fr") return __fr.chat_link_off(inputs)
	if (locale === "es") return __es.chat_link_off(inputs)
	if (locale === "zh") return __zh.chat_link_off(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_link_off(inputs)
	if (locale === "hi") return __hi.chat_link_off(inputs)
	if (locale === "ar") return __ar.chat_link_off(inputs)
	if (locale === "pt") return __pt.chat_link_off(inputs)
	if (locale === "de") return __de.chat_link_off(inputs)
	if (locale === "ja") return __ja.chat_link_off(inputs)
	if (locale === "ko") return __ko.chat_link_off(inputs)
	if (locale === "it") return __it.chat_link_off(inputs)
	if (locale === "tr") return __tr.chat_link_off(inputs)
	if (locale === "pl") return __pl.chat_link_off(inputs)
	if (locale === "uk") return __uk.chat_link_off(inputs)
	if (locale === "nl") return __nl.chat_link_off(inputs)
	if (locale === "vi") return __vi.chat_link_off(inputs)
	if (locale === "id") return __id.chat_link_off(inputs)
	if (locale === "ms") return __ms.chat_link_off(inputs)
	if (locale === "th") return __th.chat_link_off(inputs)
	if (locale === "fa") return __fa.chat_link_off(inputs)
	if (locale === "ur") return __ur.chat_link_off(inputs)
	if (locale === "bn") return __bn.chat_link_off(inputs)
	if (locale === "pa") return __pa.chat_link_off(inputs)
	if (locale === "sw") return __sw.chat_link_off(inputs)
	if (locale === "el") return __el.chat_link_off(inputs)
	if (locale === "cs") return __cs.chat_link_off(inputs)
	if (locale === "ro") return __ro.chat_link_off(inputs)
	if (locale === "hu") return __hu.chat_link_off(inputs)
	if (locale === "sv") return __sv.chat_link_off(inputs)
	if (locale === "he") return __he.chat_link_off(inputs)
	return __ru.chat_link_off(inputs)
});
/**
* | output |
* | --- |
* | "live" |
*
* @param {Chat_Link_OkInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_link_ok = /** @type {((inputs?: Chat_Link_OkInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Link_OkInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_link_ok(inputs)
	if (locale === "fr") return __fr.chat_link_ok(inputs)
	if (locale === "es") return __es.chat_link_ok(inputs)
	if (locale === "zh") return __zh.chat_link_ok(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_link_ok(inputs)
	if (locale === "hi") return __hi.chat_link_ok(inputs)
	if (locale === "ar") return __ar.chat_link_ok(inputs)
	if (locale === "pt") return __pt.chat_link_ok(inputs)
	if (locale === "de") return __de.chat_link_ok(inputs)
	if (locale === "ja") return __ja.chat_link_ok(inputs)
	if (locale === "ko") return __ko.chat_link_ok(inputs)
	if (locale === "it") return __it.chat_link_ok(inputs)
	if (locale === "tr") return __tr.chat_link_ok(inputs)
	if (locale === "pl") return __pl.chat_link_ok(inputs)
	if (locale === "uk") return __uk.chat_link_ok(inputs)
	if (locale === "nl") return __nl.chat_link_ok(inputs)
	if (locale === "vi") return __vi.chat_link_ok(inputs)
	if (locale === "id") return __id.chat_link_ok(inputs)
	if (locale === "ms") return __ms.chat_link_ok(inputs)
	if (locale === "th") return __th.chat_link_ok(inputs)
	if (locale === "fa") return __fa.chat_link_ok(inputs)
	if (locale === "ur") return __ur.chat_link_ok(inputs)
	if (locale === "bn") return __bn.chat_link_ok(inputs)
	if (locale === "pa") return __pa.chat_link_ok(inputs)
	if (locale === "sw") return __sw.chat_link_ok(inputs)
	if (locale === "el") return __el.chat_link_ok(inputs)
	if (locale === "cs") return __cs.chat_link_ok(inputs)
	if (locale === "ro") return __ro.chat_link_ok(inputs)
	if (locale === "hu") return __hu.chat_link_ok(inputs)
	if (locale === "sv") return __sv.chat_link_ok(inputs)
	if (locale === "he") return __he.chat_link_ok(inputs)
	return __ru.chat_link_ok(inputs)
});
/**
* | output |
* | --- |
* | "Load earlier messages" |
*
* @param {Chat_Load_OlderInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_load_older = /** @type {((inputs?: Chat_Load_OlderInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Load_OlderInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_load_older(inputs)
	if (locale === "fr") return __fr.chat_load_older(inputs)
	if (locale === "es") return __es.chat_load_older(inputs)
	if (locale === "zh") return __zh.chat_load_older(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_load_older(inputs)
	if (locale === "hi") return __hi.chat_load_older(inputs)
	if (locale === "ar") return __ar.chat_load_older(inputs)
	if (locale === "pt") return __pt.chat_load_older(inputs)
	if (locale === "de") return __de.chat_load_older(inputs)
	if (locale === "ja") return __ja.chat_load_older(inputs)
	if (locale === "ko") return __ko.chat_load_older(inputs)
	if (locale === "it") return __it.chat_load_older(inputs)
	if (locale === "tr") return __tr.chat_load_older(inputs)
	if (locale === "pl") return __pl.chat_load_older(inputs)
	if (locale === "uk") return __uk.chat_load_older(inputs)
	if (locale === "nl") return __nl.chat_load_older(inputs)
	if (locale === "vi") return __vi.chat_load_older(inputs)
	if (locale === "id") return __id.chat_load_older(inputs)
	if (locale === "ms") return __ms.chat_load_older(inputs)
	if (locale === "th") return __th.chat_load_older(inputs)
	if (locale === "fa") return __fa.chat_load_older(inputs)
	if (locale === "ur") return __ur.chat_load_older(inputs)
	if (locale === "bn") return __bn.chat_load_older(inputs)
	if (locale === "pa") return __pa.chat_load_older(inputs)
	if (locale === "sw") return __sw.chat_load_older(inputs)
	if (locale === "el") return __el.chat_load_older(inputs)
	if (locale === "cs") return __cs.chat_load_older(inputs)
	if (locale === "ro") return __ro.chat_load_older(inputs)
	if (locale === "hu") return __hu.chat_load_older(inputs)
	if (locale === "sv") return __sv.chat_load_older(inputs)
	if (locale === "he") return __he.chat_load_older(inputs)
	return __ru.chat_load_older(inputs)
});
/**
* | output |
* | --- |
* | "Loading…" |
*
* @param {Chat_LoadingInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_loading = /** @type {((inputs?: Chat_LoadingInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_LoadingInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_loading(inputs)
	if (locale === "fr") return __fr.chat_loading(inputs)
	if (locale === "es") return __es.chat_loading(inputs)
	if (locale === "zh") return __zh.chat_loading(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_loading(inputs)
	if (locale === "hi") return __hi.chat_loading(inputs)
	if (locale === "ar") return __ar.chat_loading(inputs)
	if (locale === "pt") return __pt.chat_loading(inputs)
	if (locale === "de") return __de.chat_loading(inputs)
	if (locale === "ja") return __ja.chat_loading(inputs)
	if (locale === "ko") return __ko.chat_loading(inputs)
	if (locale === "it") return __it.chat_loading(inputs)
	if (locale === "tr") return __tr.chat_loading(inputs)
	if (locale === "pl") return __pl.chat_loading(inputs)
	if (locale === "uk") return __uk.chat_loading(inputs)
	if (locale === "nl") return __nl.chat_loading(inputs)
	if (locale === "vi") return __vi.chat_loading(inputs)
	if (locale === "id") return __id.chat_loading(inputs)
	if (locale === "ms") return __ms.chat_loading(inputs)
	if (locale === "th") return __th.chat_loading(inputs)
	if (locale === "fa") return __fa.chat_loading(inputs)
	if (locale === "ur") return __ur.chat_loading(inputs)
	if (locale === "bn") return __bn.chat_loading(inputs)
	if (locale === "pa") return __pa.chat_loading(inputs)
	if (locale === "sw") return __sw.chat_loading(inputs)
	if (locale === "el") return __el.chat_loading(inputs)
	if (locale === "cs") return __cs.chat_loading(inputs)
	if (locale === "ro") return __ro.chat_loading(inputs)
	if (locale === "hu") return __hu.chat_loading(inputs)
	if (locale === "sv") return __sv.chat_loading(inputs)
	if (locale === "he") return __he.chat_loading(inputs)
	return __ru.chat_loading(inputs)
});
/**
* | output |
* | --- |
* | "a while ago" |
*
* @param {Chat_Long_AgoInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_long_ago = /** @type {((inputs?: Chat_Long_AgoInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Long_AgoInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_long_ago(inputs)
	if (locale === "fr") return __fr.chat_long_ago(inputs)
	if (locale === "es") return __es.chat_long_ago(inputs)
	if (locale === "zh") return __zh.chat_long_ago(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_long_ago(inputs)
	if (locale === "hi") return __hi.chat_long_ago(inputs)
	if (locale === "ar") return __ar.chat_long_ago(inputs)
	if (locale === "pt") return __pt.chat_long_ago(inputs)
	if (locale === "de") return __de.chat_long_ago(inputs)
	if (locale === "ja") return __ja.chat_long_ago(inputs)
	if (locale === "ko") return __ko.chat_long_ago(inputs)
	if (locale === "it") return __it.chat_long_ago(inputs)
	if (locale === "tr") return __tr.chat_long_ago(inputs)
	if (locale === "pl") return __pl.chat_long_ago(inputs)
	if (locale === "uk") return __uk.chat_long_ago(inputs)
	if (locale === "nl") return __nl.chat_long_ago(inputs)
	if (locale === "vi") return __vi.chat_long_ago(inputs)
	if (locale === "id") return __id.chat_long_ago(inputs)
	if (locale === "ms") return __ms.chat_long_ago(inputs)
	if (locale === "th") return __th.chat_long_ago(inputs)
	if (locale === "fa") return __fa.chat_long_ago(inputs)
	if (locale === "ur") return __ur.chat_long_ago(inputs)
	if (locale === "bn") return __bn.chat_long_ago(inputs)
	if (locale === "pa") return __pa.chat_long_ago(inputs)
	if (locale === "sw") return __sw.chat_long_ago(inputs)
	if (locale === "el") return __el.chat_long_ago(inputs)
	if (locale === "cs") return __cs.chat_long_ago(inputs)
	if (locale === "ro") return __ro.chat_long_ago(inputs)
	if (locale === "hu") return __hu.chat_long_ago(inputs)
	if (locale === "sv") return __sv.chat_long_ago(inputs)
	if (locale === "he") return __he.chat_long_ago(inputs)
	return __ru.chat_long_ago(inputs)
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
* | "Message" |
*
* @param {Chat_MessageInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_message = /** @type {((inputs?: Chat_MessageInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_MessageInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_message(inputs)
	if (locale === "fr") return __fr.chat_message(inputs)
	if (locale === "es") return __es.chat_message(inputs)
	if (locale === "zh") return __zh.chat_message(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_message(inputs)
	if (locale === "hi") return __hi.chat_message(inputs)
	if (locale === "ar") return __ar.chat_message(inputs)
	if (locale === "pt") return __pt.chat_message(inputs)
	if (locale === "de") return __de.chat_message(inputs)
	if (locale === "ja") return __ja.chat_message(inputs)
	if (locale === "ko") return __ko.chat_message(inputs)
	if (locale === "it") return __it.chat_message(inputs)
	if (locale === "tr") return __tr.chat_message(inputs)
	if (locale === "pl") return __pl.chat_message(inputs)
	if (locale === "uk") return __uk.chat_message(inputs)
	if (locale === "nl") return __nl.chat_message(inputs)
	if (locale === "vi") return __vi.chat_message(inputs)
	if (locale === "id") return __id.chat_message(inputs)
	if (locale === "ms") return __ms.chat_message(inputs)
	if (locale === "th") return __th.chat_message(inputs)
	if (locale === "fa") return __fa.chat_message(inputs)
	if (locale === "ur") return __ur.chat_message(inputs)
	if (locale === "bn") return __bn.chat_message(inputs)
	if (locale === "pa") return __pa.chat_message(inputs)
	if (locale === "sw") return __sw.chat_message(inputs)
	if (locale === "el") return __el.chat_message(inputs)
	if (locale === "cs") return __cs.chat_message(inputs)
	if (locale === "ro") return __ro.chat_message(inputs)
	if (locale === "hu") return __hu.chat_message(inputs)
	if (locale === "sv") return __sv.chat_message(inputs)
	if (locale === "he") return __he.chat_message(inputs)
	return __ru.chat_message(inputs)
});
/**
* | output |
* | --- |
* | "Microphone access denied" |
*
* @param {Chat_Mic_DeniedInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_mic_denied = /** @type {((inputs?: Chat_Mic_DeniedInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Mic_DeniedInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_mic_denied(inputs)
	if (locale === "fr") return __fr.chat_mic_denied(inputs)
	if (locale === "es") return __es.chat_mic_denied(inputs)
	if (locale === "zh") return __zh.chat_mic_denied(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_mic_denied(inputs)
	if (locale === "hi") return __hi.chat_mic_denied(inputs)
	if (locale === "ar") return __ar.chat_mic_denied(inputs)
	if (locale === "pt") return __pt.chat_mic_denied(inputs)
	if (locale === "de") return __de.chat_mic_denied(inputs)
	if (locale === "ja") return __ja.chat_mic_denied(inputs)
	if (locale === "ko") return __ko.chat_mic_denied(inputs)
	if (locale === "it") return __it.chat_mic_denied(inputs)
	if (locale === "tr") return __tr.chat_mic_denied(inputs)
	if (locale === "pl") return __pl.chat_mic_denied(inputs)
	if (locale === "uk") return __uk.chat_mic_denied(inputs)
	if (locale === "nl") return __nl.chat_mic_denied(inputs)
	if (locale === "vi") return __vi.chat_mic_denied(inputs)
	if (locale === "id") return __id.chat_mic_denied(inputs)
	if (locale === "ms") return __ms.chat_mic_denied(inputs)
	if (locale === "th") return __th.chat_mic_denied(inputs)
	if (locale === "fa") return __fa.chat_mic_denied(inputs)
	if (locale === "ur") return __ur.chat_mic_denied(inputs)
	if (locale === "bn") return __bn.chat_mic_denied(inputs)
	if (locale === "pa") return __pa.chat_mic_denied(inputs)
	if (locale === "sw") return __sw.chat_mic_denied(inputs)
	if (locale === "el") return __el.chat_mic_denied(inputs)
	if (locale === "cs") return __cs.chat_mic_denied(inputs)
	if (locale === "ro") return __ro.chat_mic_denied(inputs)
	if (locale === "hu") return __hu.chat_mic_denied(inputs)
	if (locale === "sv") return __sv.chat_mic_denied(inputs)
	if (locale === "he") return __he.chat_mic_denied(inputs)
	return __ru.chat_mic_denied(inputs)
});
/**
* | output |
* | --- |
* | "{n} min ago" |
*
* @param {Chat_Mins_AgoInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_mins_ago = /** @type {((inputs: Chat_Mins_AgoInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Mins_AgoInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_mins_ago(inputs)
	if (locale === "fr") return __fr.chat_mins_ago(inputs)
	if (locale === "es") return __es.chat_mins_ago(inputs)
	if (locale === "zh") return __zh.chat_mins_ago(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_mins_ago(inputs)
	if (locale === "hi") return __hi.chat_mins_ago(inputs)
	if (locale === "ar") return __ar.chat_mins_ago(inputs)
	if (locale === "pt") return __pt.chat_mins_ago(inputs)
	if (locale === "de") return __de.chat_mins_ago(inputs)
	if (locale === "ja") return __ja.chat_mins_ago(inputs)
	if (locale === "ko") return __ko.chat_mins_ago(inputs)
	if (locale === "it") return __it.chat_mins_ago(inputs)
	if (locale === "tr") return __tr.chat_mins_ago(inputs)
	if (locale === "pl") return __pl.chat_mins_ago(inputs)
	if (locale === "uk") return __uk.chat_mins_ago(inputs)
	if (locale === "nl") return __nl.chat_mins_ago(inputs)
	if (locale === "vi") return __vi.chat_mins_ago(inputs)
	if (locale === "id") return __id.chat_mins_ago(inputs)
	if (locale === "ms") return __ms.chat_mins_ago(inputs)
	if (locale === "th") return __th.chat_mins_ago(inputs)
	if (locale === "fa") return __fa.chat_mins_ago(inputs)
	if (locale === "ur") return __ur.chat_mins_ago(inputs)
	if (locale === "bn") return __bn.chat_mins_ago(inputs)
	if (locale === "pa") return __pa.chat_mins_ago(inputs)
	if (locale === "sw") return __sw.chat_mins_ago(inputs)
	if (locale === "el") return __el.chat_mins_ago(inputs)
	if (locale === "cs") return __cs.chat_mins_ago(inputs)
	if (locale === "ro") return __ro.chat_mins_ago(inputs)
	if (locale === "hu") return __hu.chat_mins_ago(inputs)
	if (locale === "sv") return __sv.chat_mins_ago(inputs)
	if (locale === "he") return __he.chat_mins_ago(inputs)
	return __ru.chat_mins_ago(inputs)
});
/**
* | output |
* | --- |
* | "New chat" |
*
* @param {Chat_New_DialogInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_new_dialog = /** @type {((inputs?: Chat_New_DialogInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_New_DialogInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_new_dialog(inputs)
	if (locale === "fr") return __fr.chat_new_dialog(inputs)
	if (locale === "es") return __es.chat_new_dialog(inputs)
	if (locale === "zh") return __zh.chat_new_dialog(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_new_dialog(inputs)
	if (locale === "hi") return __hi.chat_new_dialog(inputs)
	if (locale === "ar") return __ar.chat_new_dialog(inputs)
	if (locale === "pt") return __pt.chat_new_dialog(inputs)
	if (locale === "de") return __de.chat_new_dialog(inputs)
	if (locale === "ja") return __ja.chat_new_dialog(inputs)
	if (locale === "ko") return __ko.chat_new_dialog(inputs)
	if (locale === "it") return __it.chat_new_dialog(inputs)
	if (locale === "tr") return __tr.chat_new_dialog(inputs)
	if (locale === "pl") return __pl.chat_new_dialog(inputs)
	if (locale === "uk") return __uk.chat_new_dialog(inputs)
	if (locale === "nl") return __nl.chat_new_dialog(inputs)
	if (locale === "vi") return __vi.chat_new_dialog(inputs)
	if (locale === "id") return __id.chat_new_dialog(inputs)
	if (locale === "ms") return __ms.chat_new_dialog(inputs)
	if (locale === "th") return __th.chat_new_dialog(inputs)
	if (locale === "fa") return __fa.chat_new_dialog(inputs)
	if (locale === "ur") return __ur.chat_new_dialog(inputs)
	if (locale === "bn") return __bn.chat_new_dialog(inputs)
	if (locale === "pa") return __pa.chat_new_dialog(inputs)
	if (locale === "sw") return __sw.chat_new_dialog(inputs)
	if (locale === "el") return __el.chat_new_dialog(inputs)
	if (locale === "cs") return __cs.chat_new_dialog(inputs)
	if (locale === "ro") return __ro.chat_new_dialog(inputs)
	if (locale === "hu") return __hu.chat_new_dialog(inputs)
	if (locale === "sv") return __sv.chat_new_dialog(inputs)
	if (locale === "he") return __he.chat_new_dialog(inputs)
	return __ru.chat_new_dialog(inputs)
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
* | "New group" |
*
* @param {Chat_New_Group_PreviewInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_new_group_preview = /** @type {((inputs?: Chat_New_Group_PreviewInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_New_Group_PreviewInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_new_group_preview(inputs)
	if (locale === "fr") return __fr.chat_new_group_preview(inputs)
	if (locale === "es") return __es.chat_new_group_preview(inputs)
	if (locale === "zh") return __zh.chat_new_group_preview(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_new_group_preview(inputs)
	if (locale === "hi") return __hi.chat_new_group_preview(inputs)
	if (locale === "ar") return __ar.chat_new_group_preview(inputs)
	if (locale === "pt") return __pt.chat_new_group_preview(inputs)
	if (locale === "de") return __de.chat_new_group_preview(inputs)
	if (locale === "ja") return __ja.chat_new_group_preview(inputs)
	if (locale === "ko") return __ko.chat_new_group_preview(inputs)
	if (locale === "it") return __it.chat_new_group_preview(inputs)
	if (locale === "tr") return __tr.chat_new_group_preview(inputs)
	if (locale === "pl") return __pl.chat_new_group_preview(inputs)
	if (locale === "uk") return __uk.chat_new_group_preview(inputs)
	if (locale === "nl") return __nl.chat_new_group_preview(inputs)
	if (locale === "vi") return __vi.chat_new_group_preview(inputs)
	if (locale === "id") return __id.chat_new_group_preview(inputs)
	if (locale === "ms") return __ms.chat_new_group_preview(inputs)
	if (locale === "th") return __th.chat_new_group_preview(inputs)
	if (locale === "fa") return __fa.chat_new_group_preview(inputs)
	if (locale === "ur") return __ur.chat_new_group_preview(inputs)
	if (locale === "bn") return __bn.chat_new_group_preview(inputs)
	if (locale === "pa") return __pa.chat_new_group_preview(inputs)
	if (locale === "sw") return __sw.chat_new_group_preview(inputs)
	if (locale === "el") return __el.chat_new_group_preview(inputs)
	if (locale === "cs") return __cs.chat_new_group_preview(inputs)
	if (locale === "ro") return __ro.chat_new_group_preview(inputs)
	if (locale === "hu") return __hu.chat_new_group_preview(inputs)
	if (locale === "sv") return __sv.chat_new_group_preview(inputs)
	if (locale === "he") return __he.chat_new_group_preview(inputs)
	return __ru.chat_new_group_preview(inputs)
});
/**
* | output |
* | --- |
* | "No network" |
*
* @param {Chat_No_NetworkInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_no_network = /** @type {((inputs?: Chat_No_NetworkInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_No_NetworkInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_no_network(inputs)
	if (locale === "fr") return __fr.chat_no_network(inputs)
	if (locale === "es") return __es.chat_no_network(inputs)
	if (locale === "zh") return __zh.chat_no_network(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_no_network(inputs)
	if (locale === "hi") return __hi.chat_no_network(inputs)
	if (locale === "ar") return __ar.chat_no_network(inputs)
	if (locale === "pt") return __pt.chat_no_network(inputs)
	if (locale === "de") return __de.chat_no_network(inputs)
	if (locale === "ja") return __ja.chat_no_network(inputs)
	if (locale === "ko") return __ko.chat_no_network(inputs)
	if (locale === "it") return __it.chat_no_network(inputs)
	if (locale === "tr") return __tr.chat_no_network(inputs)
	if (locale === "pl") return __pl.chat_no_network(inputs)
	if (locale === "uk") return __uk.chat_no_network(inputs)
	if (locale === "nl") return __nl.chat_no_network(inputs)
	if (locale === "vi") return __vi.chat_no_network(inputs)
	if (locale === "id") return __id.chat_no_network(inputs)
	if (locale === "ms") return __ms.chat_no_network(inputs)
	if (locale === "th") return __th.chat_no_network(inputs)
	if (locale === "fa") return __fa.chat_no_network(inputs)
	if (locale === "ur") return __ur.chat_no_network(inputs)
	if (locale === "bn") return __bn.chat_no_network(inputs)
	if (locale === "pa") return __pa.chat_no_network(inputs)
	if (locale === "sw") return __sw.chat_no_network(inputs)
	if (locale === "el") return __el.chat_no_network(inputs)
	if (locale === "cs") return __cs.chat_no_network(inputs)
	if (locale === "ro") return __ro.chat_no_network(inputs)
	if (locale === "hu") return __hu.chat_no_network(inputs)
	if (locale === "sv") return __sv.chat_no_network(inputs)
	if (locale === "he") return __he.chat_no_network(inputs)
	return __ru.chat_no_network(inputs)
});
/**
* | output |
* | --- |
* | "offline" |
*
* @param {Chat_OfflineInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_offline = /** @type {((inputs?: Chat_OfflineInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_OfflineInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_offline(inputs)
	if (locale === "fr") return __fr.chat_offline(inputs)
	if (locale === "es") return __es.chat_offline(inputs)
	if (locale === "zh") return __zh.chat_offline(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_offline(inputs)
	if (locale === "hi") return __hi.chat_offline(inputs)
	if (locale === "ar") return __ar.chat_offline(inputs)
	if (locale === "pt") return __pt.chat_offline(inputs)
	if (locale === "de") return __de.chat_offline(inputs)
	if (locale === "ja") return __ja.chat_offline(inputs)
	if (locale === "ko") return __ko.chat_offline(inputs)
	if (locale === "it") return __it.chat_offline(inputs)
	if (locale === "tr") return __tr.chat_offline(inputs)
	if (locale === "pl") return __pl.chat_offline(inputs)
	if (locale === "uk") return __uk.chat_offline(inputs)
	if (locale === "nl") return __nl.chat_offline(inputs)
	if (locale === "vi") return __vi.chat_offline(inputs)
	if (locale === "id") return __id.chat_offline(inputs)
	if (locale === "ms") return __ms.chat_offline(inputs)
	if (locale === "th") return __th.chat_offline(inputs)
	if (locale === "fa") return __fa.chat_offline(inputs)
	if (locale === "ur") return __ur.chat_offline(inputs)
	if (locale === "bn") return __bn.chat_offline(inputs)
	if (locale === "pa") return __pa.chat_offline(inputs)
	if (locale === "sw") return __sw.chat_offline(inputs)
	if (locale === "el") return __el.chat_offline(inputs)
	if (locale === "cs") return __cs.chat_offline(inputs)
	if (locale === "ro") return __ro.chat_offline(inputs)
	if (locale === "hu") return __hu.chat_offline(inputs)
	if (locale === "sv") return __sv.chat_offline(inputs)
	if (locale === "he") return __he.chat_offline(inputs)
	return __ru.chat_offline(inputs)
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
* | "Original message" |
*
* @param {Chat_OriginalInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_original = /** @type {((inputs?: Chat_OriginalInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_OriginalInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_original(inputs)
	if (locale === "fr") return __fr.chat_original(inputs)
	if (locale === "es") return __es.chat_original(inputs)
	if (locale === "zh") return __zh.chat_original(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_original(inputs)
	if (locale === "hi") return __hi.chat_original(inputs)
	if (locale === "ar") return __ar.chat_original(inputs)
	if (locale === "pt") return __pt.chat_original(inputs)
	if (locale === "de") return __de.chat_original(inputs)
	if (locale === "ja") return __ja.chat_original(inputs)
	if (locale === "ko") return __ko.chat_original(inputs)
	if (locale === "it") return __it.chat_original(inputs)
	if (locale === "tr") return __tr.chat_original(inputs)
	if (locale === "pl") return __pl.chat_original(inputs)
	if (locale === "uk") return __uk.chat_original(inputs)
	if (locale === "nl") return __nl.chat_original(inputs)
	if (locale === "vi") return __vi.chat_original(inputs)
	if (locale === "id") return __id.chat_original(inputs)
	if (locale === "ms") return __ms.chat_original(inputs)
	if (locale === "th") return __th.chat_original(inputs)
	if (locale === "fa") return __fa.chat_original(inputs)
	if (locale === "ur") return __ur.chat_original(inputs)
	if (locale === "bn") return __bn.chat_original(inputs)
	if (locale === "pa") return __pa.chat_original(inputs)
	if (locale === "sw") return __sw.chat_original(inputs)
	if (locale === "el") return __el.chat_original(inputs)
	if (locale === "cs") return __cs.chat_original(inputs)
	if (locale === "ro") return __ro.chat_original(inputs)
	if (locale === "hu") return __hu.chat_original(inputs)
	if (locale === "sv") return __sv.chat_original(inputs)
	if (locale === "he") return __he.chat_original(inputs)
	return __ru.chat_original(inputs)
});
/**
* | output |
* | --- |
* | "Contact" |
*
* @param {Chat_PeerInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_peer = /** @type {((inputs?: Chat_PeerInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_PeerInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_peer(inputs)
	if (locale === "fr") return __fr.chat_peer(inputs)
	if (locale === "es") return __es.chat_peer(inputs)
	if (locale === "zh") return __zh.chat_peer(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_peer(inputs)
	if (locale === "hi") return __hi.chat_peer(inputs)
	if (locale === "ar") return __ar.chat_peer(inputs)
	if (locale === "pt") return __pt.chat_peer(inputs)
	if (locale === "de") return __de.chat_peer(inputs)
	if (locale === "ja") return __ja.chat_peer(inputs)
	if (locale === "ko") return __ko.chat_peer(inputs)
	if (locale === "it") return __it.chat_peer(inputs)
	if (locale === "tr") return __tr.chat_peer(inputs)
	if (locale === "pl") return __pl.chat_peer(inputs)
	if (locale === "uk") return __uk.chat_peer(inputs)
	if (locale === "nl") return __nl.chat_peer(inputs)
	if (locale === "vi") return __vi.chat_peer(inputs)
	if (locale === "id") return __id.chat_peer(inputs)
	if (locale === "ms") return __ms.chat_peer(inputs)
	if (locale === "th") return __th.chat_peer(inputs)
	if (locale === "fa") return __fa.chat_peer(inputs)
	if (locale === "ur") return __ur.chat_peer(inputs)
	if (locale === "bn") return __bn.chat_peer(inputs)
	if (locale === "pa") return __pa.chat_peer(inputs)
	if (locale === "sw") return __sw.chat_peer(inputs)
	if (locale === "el") return __el.chat_peer(inputs)
	if (locale === "cs") return __cs.chat_peer(inputs)
	if (locale === "ro") return __ro.chat_peer(inputs)
	if (locale === "hu") return __hu.chat_peer(inputs)
	if (locale === "sv") return __sv.chat_peer(inputs)
	if (locale === "he") return __he.chat_peer(inputs)
	return __ru.chat_peer(inputs)
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
* | "Photo error" |
*
* @param {Chat_Photo_ErrorInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_photo_error = /** @type {((inputs?: Chat_Photo_ErrorInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Photo_ErrorInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_photo_error(inputs)
	if (locale === "fr") return __fr.chat_photo_error(inputs)
	if (locale === "es") return __es.chat_photo_error(inputs)
	if (locale === "zh") return __zh.chat_photo_error(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_photo_error(inputs)
	if (locale === "hi") return __hi.chat_photo_error(inputs)
	if (locale === "ar") return __ar.chat_photo_error(inputs)
	if (locale === "pt") return __pt.chat_photo_error(inputs)
	if (locale === "de") return __de.chat_photo_error(inputs)
	if (locale === "ja") return __ja.chat_photo_error(inputs)
	if (locale === "ko") return __ko.chat_photo_error(inputs)
	if (locale === "it") return __it.chat_photo_error(inputs)
	if (locale === "tr") return __tr.chat_photo_error(inputs)
	if (locale === "pl") return __pl.chat_photo_error(inputs)
	if (locale === "uk") return __uk.chat_photo_error(inputs)
	if (locale === "nl") return __nl.chat_photo_error(inputs)
	if (locale === "vi") return __vi.chat_photo_error(inputs)
	if (locale === "id") return __id.chat_photo_error(inputs)
	if (locale === "ms") return __ms.chat_photo_error(inputs)
	if (locale === "th") return __th.chat_photo_error(inputs)
	if (locale === "fa") return __fa.chat_photo_error(inputs)
	if (locale === "ur") return __ur.chat_photo_error(inputs)
	if (locale === "bn") return __bn.chat_photo_error(inputs)
	if (locale === "pa") return __pa.chat_photo_error(inputs)
	if (locale === "sw") return __sw.chat_photo_error(inputs)
	if (locale === "el") return __el.chat_photo_error(inputs)
	if (locale === "cs") return __cs.chat_photo_error(inputs)
	if (locale === "ro") return __ro.chat_photo_error(inputs)
	if (locale === "hu") return __hu.chat_photo_error(inputs)
	if (locale === "sv") return __sv.chat_photo_error(inputs)
	if (locale === "he") return __he.chat_photo_error(inputs)
	return __ru.chat_photo_error(inputs)
});
/**
* | output |
* | --- |
* | "Photo not sent" |
*
* @param {Chat_Photo_FailedInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_photo_failed = /** @type {((inputs?: Chat_Photo_FailedInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Photo_FailedInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_photo_failed(inputs)
	if (locale === "fr") return __fr.chat_photo_failed(inputs)
	if (locale === "es") return __es.chat_photo_failed(inputs)
	if (locale === "zh") return __zh.chat_photo_failed(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_photo_failed(inputs)
	if (locale === "hi") return __hi.chat_photo_failed(inputs)
	if (locale === "ar") return __ar.chat_photo_failed(inputs)
	if (locale === "pt") return __pt.chat_photo_failed(inputs)
	if (locale === "de") return __de.chat_photo_failed(inputs)
	if (locale === "ja") return __ja.chat_photo_failed(inputs)
	if (locale === "ko") return __ko.chat_photo_failed(inputs)
	if (locale === "it") return __it.chat_photo_failed(inputs)
	if (locale === "tr") return __tr.chat_photo_failed(inputs)
	if (locale === "pl") return __pl.chat_photo_failed(inputs)
	if (locale === "uk") return __uk.chat_photo_failed(inputs)
	if (locale === "nl") return __nl.chat_photo_failed(inputs)
	if (locale === "vi") return __vi.chat_photo_failed(inputs)
	if (locale === "id") return __id.chat_photo_failed(inputs)
	if (locale === "ms") return __ms.chat_photo_failed(inputs)
	if (locale === "th") return __th.chat_photo_failed(inputs)
	if (locale === "fa") return __fa.chat_photo_failed(inputs)
	if (locale === "ur") return __ur.chat_photo_failed(inputs)
	if (locale === "bn") return __bn.chat_photo_failed(inputs)
	if (locale === "pa") return __pa.chat_photo_failed(inputs)
	if (locale === "sw") return __sw.chat_photo_failed(inputs)
	if (locale === "el") return __el.chat_photo_failed(inputs)
	if (locale === "cs") return __cs.chat_photo_failed(inputs)
	if (locale === "ro") return __ro.chat_photo_failed(inputs)
	if (locale === "hu") return __hu.chat_photo_failed(inputs)
	if (locale === "sv") return __sv.chat_photo_failed(inputs)
	if (locale === "he") return __he.chat_photo_failed(inputs)
	return __ru.chat_photo_failed(inputs)
});
/**
* | output |
* | --- |
* | "Photo" |
*
* @param {Chat_Photo_LabelInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_photo_label = /** @type {((inputs?: Chat_Photo_LabelInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Photo_LabelInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_photo_label(inputs)
	if (locale === "fr") return __fr.chat_photo_label(inputs)
	if (locale === "es") return __es.chat_photo_label(inputs)
	if (locale === "zh") return __zh.chat_photo_label(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_photo_label(inputs)
	if (locale === "hi") return __hi.chat_photo_label(inputs)
	if (locale === "ar") return __ar.chat_photo_label(inputs)
	if (locale === "pt") return __pt.chat_photo_label(inputs)
	if (locale === "de") return __de.chat_photo_label(inputs)
	if (locale === "ja") return __ja.chat_photo_label(inputs)
	if (locale === "ko") return __ko.chat_photo_label(inputs)
	if (locale === "it") return __it.chat_photo_label(inputs)
	if (locale === "tr") return __tr.chat_photo_label(inputs)
	if (locale === "pl") return __pl.chat_photo_label(inputs)
	if (locale === "uk") return __uk.chat_photo_label(inputs)
	if (locale === "nl") return __nl.chat_photo_label(inputs)
	if (locale === "vi") return __vi.chat_photo_label(inputs)
	if (locale === "id") return __id.chat_photo_label(inputs)
	if (locale === "ms") return __ms.chat_photo_label(inputs)
	if (locale === "th") return __th.chat_photo_label(inputs)
	if (locale === "fa") return __fa.chat_photo_label(inputs)
	if (locale === "ur") return __ur.chat_photo_label(inputs)
	if (locale === "bn") return __bn.chat_photo_label(inputs)
	if (locale === "pa") return __pa.chat_photo_label(inputs)
	if (locale === "sw") return __sw.chat_photo_label(inputs)
	if (locale === "el") return __el.chat_photo_label(inputs)
	if (locale === "cs") return __cs.chat_photo_label(inputs)
	if (locale === "ro") return __ro.chat_photo_label(inputs)
	if (locale === "hu") return __hu.chat_photo_label(inputs)
	if (locale === "sv") return __sv.chat_photo_label(inputs)
	if (locale === "he") return __he.chat_photo_label(inputs)
	return __ru.chat_photo_label(inputs)
});
/**
* | output |
* | --- |
* | "No network — can’t send photo offline" |
*
* @param {Chat_Photo_OfflineInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_photo_offline = /** @type {((inputs?: Chat_Photo_OfflineInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Photo_OfflineInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_photo_offline(inputs)
	if (locale === "fr") return __fr.chat_photo_offline(inputs)
	if (locale === "es") return __es.chat_photo_offline(inputs)
	if (locale === "zh") return __zh.chat_photo_offline(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_photo_offline(inputs)
	if (locale === "hi") return __hi.chat_photo_offline(inputs)
	if (locale === "ar") return __ar.chat_photo_offline(inputs)
	if (locale === "pt") return __pt.chat_photo_offline(inputs)
	if (locale === "de") return __de.chat_photo_offline(inputs)
	if (locale === "ja") return __ja.chat_photo_offline(inputs)
	if (locale === "ko") return __ko.chat_photo_offline(inputs)
	if (locale === "it") return __it.chat_photo_offline(inputs)
	if (locale === "tr") return __tr.chat_photo_offline(inputs)
	if (locale === "pl") return __pl.chat_photo_offline(inputs)
	if (locale === "uk") return __uk.chat_photo_offline(inputs)
	if (locale === "nl") return __nl.chat_photo_offline(inputs)
	if (locale === "vi") return __vi.chat_photo_offline(inputs)
	if (locale === "id") return __id.chat_photo_offline(inputs)
	if (locale === "ms") return __ms.chat_photo_offline(inputs)
	if (locale === "th") return __th.chat_photo_offline(inputs)
	if (locale === "fa") return __fa.chat_photo_offline(inputs)
	if (locale === "ur") return __ur.chat_photo_offline(inputs)
	if (locale === "bn") return __bn.chat_photo_offline(inputs)
	if (locale === "pa") return __pa.chat_photo_offline(inputs)
	if (locale === "sw") return __sw.chat_photo_offline(inputs)
	if (locale === "el") return __el.chat_photo_offline(inputs)
	if (locale === "cs") return __cs.chat_photo_offline(inputs)
	if (locale === "ro") return __ro.chat_photo_offline(inputs)
	if (locale === "hu") return __hu.chat_photo_offline(inputs)
	if (locale === "sv") return __sv.chat_photo_offline(inputs)
	if (locale === "he") return __he.chat_photo_offline(inputs)
	return __ru.chat_photo_offline(inputs)
});
/**
* | output |
* | --- |
* | "Photo over 8 MB" |
*
* @param {Chat_Photo_Over_8mbInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_photo_over_8mb = /** @type {((inputs?: Chat_Photo_Over_8mbInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Photo_Over_8mbInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_photo_over_8mb(inputs)
	if (locale === "fr") return __fr.chat_photo_over_8mb(inputs)
	if (locale === "es") return __es.chat_photo_over_8mb(inputs)
	if (locale === "zh") return __zh.chat_photo_over_8mb(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_photo_over_8mb(inputs)
	if (locale === "hi") return __hi.chat_photo_over_8mb(inputs)
	if (locale === "ar") return __ar.chat_photo_over_8mb(inputs)
	if (locale === "pt") return __pt.chat_photo_over_8mb(inputs)
	if (locale === "de") return __de.chat_photo_over_8mb(inputs)
	if (locale === "ja") return __ja.chat_photo_over_8mb(inputs)
	if (locale === "ko") return __ko.chat_photo_over_8mb(inputs)
	if (locale === "it") return __it.chat_photo_over_8mb(inputs)
	if (locale === "tr") return __tr.chat_photo_over_8mb(inputs)
	if (locale === "pl") return __pl.chat_photo_over_8mb(inputs)
	if (locale === "uk") return __uk.chat_photo_over_8mb(inputs)
	if (locale === "nl") return __nl.chat_photo_over_8mb(inputs)
	if (locale === "vi") return __vi.chat_photo_over_8mb(inputs)
	if (locale === "id") return __id.chat_photo_over_8mb(inputs)
	if (locale === "ms") return __ms.chat_photo_over_8mb(inputs)
	if (locale === "th") return __th.chat_photo_over_8mb(inputs)
	if (locale === "fa") return __fa.chat_photo_over_8mb(inputs)
	if (locale === "ur") return __ur.chat_photo_over_8mb(inputs)
	if (locale === "bn") return __bn.chat_photo_over_8mb(inputs)
	if (locale === "pa") return __pa.chat_photo_over_8mb(inputs)
	if (locale === "sw") return __sw.chat_photo_over_8mb(inputs)
	if (locale === "el") return __el.chat_photo_over_8mb(inputs)
	if (locale === "cs") return __cs.chat_photo_over_8mb(inputs)
	if (locale === "ro") return __ro.chat_photo_over_8mb(inputs)
	if (locale === "hu") return __hu.chat_photo_over_8mb(inputs)
	if (locale === "sv") return __sv.chat_photo_over_8mb(inputs)
	if (locale === "he") return __he.chat_photo_over_8mb(inputs)
	return __ru.chat_photo_over_8mb(inputs)
});
/**
* | output |
* | --- |
* | "Photo too large" |
*
* @param {Chat_Photo_Too_BigInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_photo_too_big = /** @type {((inputs?: Chat_Photo_Too_BigInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Photo_Too_BigInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_photo_too_big(inputs)
	if (locale === "fr") return __fr.chat_photo_too_big(inputs)
	if (locale === "es") return __es.chat_photo_too_big(inputs)
	if (locale === "zh") return __zh.chat_photo_too_big(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_photo_too_big(inputs)
	if (locale === "hi") return __hi.chat_photo_too_big(inputs)
	if (locale === "ar") return __ar.chat_photo_too_big(inputs)
	if (locale === "pt") return __pt.chat_photo_too_big(inputs)
	if (locale === "de") return __de.chat_photo_too_big(inputs)
	if (locale === "ja") return __ja.chat_photo_too_big(inputs)
	if (locale === "ko") return __ko.chat_photo_too_big(inputs)
	if (locale === "it") return __it.chat_photo_too_big(inputs)
	if (locale === "tr") return __tr.chat_photo_too_big(inputs)
	if (locale === "pl") return __pl.chat_photo_too_big(inputs)
	if (locale === "uk") return __uk.chat_photo_too_big(inputs)
	if (locale === "nl") return __nl.chat_photo_too_big(inputs)
	if (locale === "vi") return __vi.chat_photo_too_big(inputs)
	if (locale === "id") return __id.chat_photo_too_big(inputs)
	if (locale === "ms") return __ms.chat_photo_too_big(inputs)
	if (locale === "th") return __th.chat_photo_too_big(inputs)
	if (locale === "fa") return __fa.chat_photo_too_big(inputs)
	if (locale === "ur") return __ur.chat_photo_too_big(inputs)
	if (locale === "bn") return __bn.chat_photo_too_big(inputs)
	if (locale === "pa") return __pa.chat_photo_too_big(inputs)
	if (locale === "sw") return __sw.chat_photo_too_big(inputs)
	if (locale === "el") return __el.chat_photo_too_big(inputs)
	if (locale === "cs") return __cs.chat_photo_too_big(inputs)
	if (locale === "ro") return __ro.chat_photo_too_big(inputs)
	if (locale === "hu") return __hu.chat_photo_too_big(inputs)
	if (locale === "sv") return __sv.chat_photo_too_big(inputs)
	if (locale === "he") return __he.chat_photo_too_big(inputs)
	return __ru.chat_photo_too_big(inputs)
});
/**
* | output |
* | --- |
* | "Profile not found" |
*
* @param {Chat_Profile_MissingInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_profile_missing = /** @type {((inputs?: Chat_Profile_MissingInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Profile_MissingInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_profile_missing(inputs)
	if (locale === "fr") return __fr.chat_profile_missing(inputs)
	if (locale === "es") return __es.chat_profile_missing(inputs)
	if (locale === "zh") return __zh.chat_profile_missing(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_profile_missing(inputs)
	if (locale === "hi") return __hi.chat_profile_missing(inputs)
	if (locale === "ar") return __ar.chat_profile_missing(inputs)
	if (locale === "pt") return __pt.chat_profile_missing(inputs)
	if (locale === "de") return __de.chat_profile_missing(inputs)
	if (locale === "ja") return __ja.chat_profile_missing(inputs)
	if (locale === "ko") return __ko.chat_profile_missing(inputs)
	if (locale === "it") return __it.chat_profile_missing(inputs)
	if (locale === "tr") return __tr.chat_profile_missing(inputs)
	if (locale === "pl") return __pl.chat_profile_missing(inputs)
	if (locale === "uk") return __uk.chat_profile_missing(inputs)
	if (locale === "nl") return __nl.chat_profile_missing(inputs)
	if (locale === "vi") return __vi.chat_profile_missing(inputs)
	if (locale === "id") return __id.chat_profile_missing(inputs)
	if (locale === "ms") return __ms.chat_profile_missing(inputs)
	if (locale === "th") return __th.chat_profile_missing(inputs)
	if (locale === "fa") return __fa.chat_profile_missing(inputs)
	if (locale === "ur") return __ur.chat_profile_missing(inputs)
	if (locale === "bn") return __bn.chat_profile_missing(inputs)
	if (locale === "pa") return __pa.chat_profile_missing(inputs)
	if (locale === "sw") return __sw.chat_profile_missing(inputs)
	if (locale === "el") return __el.chat_profile_missing(inputs)
	if (locale === "cs") return __cs.chat_profile_missing(inputs)
	if (locale === "ro") return __ro.chat_profile_missing(inputs)
	if (locale === "hu") return __hu.chat_profile_missing(inputs)
	if (locale === "sv") return __sv.chat_profile_missing(inputs)
	if (locale === "he") return __he.chat_profile_missing(inputs)
	return __ru.chat_profile_missing(inputs)
});
/**
* | output |
* | --- |
* | "Too fast · wait a bit" |
*
* @param {Chat_Rate_LimitedInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_rate_limited = /** @type {((inputs?: Chat_Rate_LimitedInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Rate_LimitedInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_rate_limited(inputs)
	if (locale === "fr") return __fr.chat_rate_limited(inputs)
	if (locale === "es") return __es.chat_rate_limited(inputs)
	if (locale === "zh") return __zh.chat_rate_limited(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_rate_limited(inputs)
	if (locale === "hi") return __hi.chat_rate_limited(inputs)
	if (locale === "ar") return __ar.chat_rate_limited(inputs)
	if (locale === "pt") return __pt.chat_rate_limited(inputs)
	if (locale === "de") return __de.chat_rate_limited(inputs)
	if (locale === "ja") return __ja.chat_rate_limited(inputs)
	if (locale === "ko") return __ko.chat_rate_limited(inputs)
	if (locale === "it") return __it.chat_rate_limited(inputs)
	if (locale === "tr") return __tr.chat_rate_limited(inputs)
	if (locale === "pl") return __pl.chat_rate_limited(inputs)
	if (locale === "uk") return __uk.chat_rate_limited(inputs)
	if (locale === "nl") return __nl.chat_rate_limited(inputs)
	if (locale === "vi") return __vi.chat_rate_limited(inputs)
	if (locale === "id") return __id.chat_rate_limited(inputs)
	if (locale === "ms") return __ms.chat_rate_limited(inputs)
	if (locale === "th") return __th.chat_rate_limited(inputs)
	if (locale === "fa") return __fa.chat_rate_limited(inputs)
	if (locale === "ur") return __ur.chat_rate_limited(inputs)
	if (locale === "bn") return __bn.chat_rate_limited(inputs)
	if (locale === "pa") return __pa.chat_rate_limited(inputs)
	if (locale === "sw") return __sw.chat_rate_limited(inputs)
	if (locale === "el") return __el.chat_rate_limited(inputs)
	if (locale === "cs") return __cs.chat_rate_limited(inputs)
	if (locale === "ro") return __ro.chat_rate_limited(inputs)
	if (locale === "hu") return __hu.chat_rate_limited(inputs)
	if (locale === "sv") return __sv.chat_rate_limited(inputs)
	if (locale === "he") return __he.chat_rate_limited(inputs)
	return __ru.chat_rate_limited(inputs)
});
/**
* | output |
* | --- |
* | "Recording…" |
*
* @param {Chat_RecordingInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_recording = /** @type {((inputs?: Chat_RecordingInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_RecordingInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_recording(inputs)
	if (locale === "fr") return __fr.chat_recording(inputs)
	if (locale === "es") return __es.chat_recording(inputs)
	if (locale === "zh") return __zh.chat_recording(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_recording(inputs)
	if (locale === "hi") return __hi.chat_recording(inputs)
	if (locale === "ar") return __ar.chat_recording(inputs)
	if (locale === "pt") return __pt.chat_recording(inputs)
	if (locale === "de") return __de.chat_recording(inputs)
	if (locale === "ja") return __ja.chat_recording(inputs)
	if (locale === "ko") return __ko.chat_recording(inputs)
	if (locale === "it") return __it.chat_recording(inputs)
	if (locale === "tr") return __tr.chat_recording(inputs)
	if (locale === "pl") return __pl.chat_recording(inputs)
	if (locale === "uk") return __uk.chat_recording(inputs)
	if (locale === "nl") return __nl.chat_recording(inputs)
	if (locale === "vi") return __vi.chat_recording(inputs)
	if (locale === "id") return __id.chat_recording(inputs)
	if (locale === "ms") return __ms.chat_recording(inputs)
	if (locale === "th") return __th.chat_recording(inputs)
	if (locale === "fa") return __fa.chat_recording(inputs)
	if (locale === "ur") return __ur.chat_recording(inputs)
	if (locale === "bn") return __bn.chat_recording(inputs)
	if (locale === "pa") return __pa.chat_recording(inputs)
	if (locale === "sw") return __sw.chat_recording(inputs)
	if (locale === "el") return __el.chat_recording(inputs)
	if (locale === "cs") return __cs.chat_recording(inputs)
	if (locale === "ro") return __ro.chat_recording(inputs)
	if (locale === "hu") return __hu.chat_recording(inputs)
	if (locale === "sv") return __sv.chat_recording(inputs)
	if (locale === "he") return __he.chat_recording(inputs)
	return __ru.chat_recording(inputs)
});
/**
* | output |
* | --- |
* | "Recording… release to send" |
*
* @param {Chat_Recording_ReleaseInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_recording_release = /** @type {((inputs?: Chat_Recording_ReleaseInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Recording_ReleaseInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_recording_release(inputs)
	if (locale === "fr") return __fr.chat_recording_release(inputs)
	if (locale === "es") return __es.chat_recording_release(inputs)
	if (locale === "zh") return __zh.chat_recording_release(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_recording_release(inputs)
	if (locale === "hi") return __hi.chat_recording_release(inputs)
	if (locale === "ar") return __ar.chat_recording_release(inputs)
	if (locale === "pt") return __pt.chat_recording_release(inputs)
	if (locale === "de") return __de.chat_recording_release(inputs)
	if (locale === "ja") return __ja.chat_recording_release(inputs)
	if (locale === "ko") return __ko.chat_recording_release(inputs)
	if (locale === "it") return __it.chat_recording_release(inputs)
	if (locale === "tr") return __tr.chat_recording_release(inputs)
	if (locale === "pl") return __pl.chat_recording_release(inputs)
	if (locale === "uk") return __uk.chat_recording_release(inputs)
	if (locale === "nl") return __nl.chat_recording_release(inputs)
	if (locale === "vi") return __vi.chat_recording_release(inputs)
	if (locale === "id") return __id.chat_recording_release(inputs)
	if (locale === "ms") return __ms.chat_recording_release(inputs)
	if (locale === "th") return __th.chat_recording_release(inputs)
	if (locale === "fa") return __fa.chat_recording_release(inputs)
	if (locale === "ur") return __ur.chat_recording_release(inputs)
	if (locale === "bn") return __bn.chat_recording_release(inputs)
	if (locale === "pa") return __pa.chat_recording_release(inputs)
	if (locale === "sw") return __sw.chat_recording_release(inputs)
	if (locale === "el") return __el.chat_recording_release(inputs)
	if (locale === "cs") return __cs.chat_recording_release(inputs)
	if (locale === "ro") return __ro.chat_recording_release(inputs)
	if (locale === "hu") return __hu.chat_recording_release(inputs)
	if (locale === "sv") return __sv.chat_recording_release(inputs)
	if (locale === "he") return __he.chat_recording_release(inputs)
	return __ru.chat_recording_release(inputs)
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
* | "Reply" |
*
* @param {Chat_Reply_LabelInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_reply_label = /** @type {((inputs?: Chat_Reply_LabelInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Reply_LabelInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_reply_label(inputs)
	if (locale === "fr") return __fr.chat_reply_label(inputs)
	if (locale === "es") return __es.chat_reply_label(inputs)
	if (locale === "zh") return __zh.chat_reply_label(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_reply_label(inputs)
	if (locale === "hi") return __hi.chat_reply_label(inputs)
	if (locale === "ar") return __ar.chat_reply_label(inputs)
	if (locale === "pt") return __pt.chat_reply_label(inputs)
	if (locale === "de") return __de.chat_reply_label(inputs)
	if (locale === "ja") return __ja.chat_reply_label(inputs)
	if (locale === "ko") return __ko.chat_reply_label(inputs)
	if (locale === "it") return __it.chat_reply_label(inputs)
	if (locale === "tr") return __tr.chat_reply_label(inputs)
	if (locale === "pl") return __pl.chat_reply_label(inputs)
	if (locale === "uk") return __uk.chat_reply_label(inputs)
	if (locale === "nl") return __nl.chat_reply_label(inputs)
	if (locale === "vi") return __vi.chat_reply_label(inputs)
	if (locale === "id") return __id.chat_reply_label(inputs)
	if (locale === "ms") return __ms.chat_reply_label(inputs)
	if (locale === "th") return __th.chat_reply_label(inputs)
	if (locale === "fa") return __fa.chat_reply_label(inputs)
	if (locale === "ur") return __ur.chat_reply_label(inputs)
	if (locale === "bn") return __bn.chat_reply_label(inputs)
	if (locale === "pa") return __pa.chat_reply_label(inputs)
	if (locale === "sw") return __sw.chat_reply_label(inputs)
	if (locale === "el") return __el.chat_reply_label(inputs)
	if (locale === "cs") return __cs.chat_reply_label(inputs)
	if (locale === "ro") return __ro.chat_reply_label(inputs)
	if (locale === "hu") return __hu.chat_reply_label(inputs)
	if (locale === "sv") return __sv.chat_reply_label(inputs)
	if (locale === "he") return __he.chat_reply_label(inputs)
	return __ru.chat_reply_label(inputs)
});
/**
* | output |
* | --- |
* | "Limit · retry in {n}s" |
*
* @param {Chat_Retry_In_SecInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_retry_in_sec = /** @type {((inputs: Chat_Retry_In_SecInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Retry_In_SecInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_retry_in_sec(inputs)
	if (locale === "fr") return __fr.chat_retry_in_sec(inputs)
	if (locale === "es") return __es.chat_retry_in_sec(inputs)
	if (locale === "zh") return __zh.chat_retry_in_sec(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_retry_in_sec(inputs)
	if (locale === "hi") return __hi.chat_retry_in_sec(inputs)
	if (locale === "ar") return __ar.chat_retry_in_sec(inputs)
	if (locale === "pt") return __pt.chat_retry_in_sec(inputs)
	if (locale === "de") return __de.chat_retry_in_sec(inputs)
	if (locale === "ja") return __ja.chat_retry_in_sec(inputs)
	if (locale === "ko") return __ko.chat_retry_in_sec(inputs)
	if (locale === "it") return __it.chat_retry_in_sec(inputs)
	if (locale === "tr") return __tr.chat_retry_in_sec(inputs)
	if (locale === "pl") return __pl.chat_retry_in_sec(inputs)
	if (locale === "uk") return __uk.chat_retry_in_sec(inputs)
	if (locale === "nl") return __nl.chat_retry_in_sec(inputs)
	if (locale === "vi") return __vi.chat_retry_in_sec(inputs)
	if (locale === "id") return __id.chat_retry_in_sec(inputs)
	if (locale === "ms") return __ms.chat_retry_in_sec(inputs)
	if (locale === "th") return __th.chat_retry_in_sec(inputs)
	if (locale === "fa") return __fa.chat_retry_in_sec(inputs)
	if (locale === "ur") return __ur.chat_retry_in_sec(inputs)
	if (locale === "bn") return __bn.chat_retry_in_sec(inputs)
	if (locale === "pa") return __pa.chat_retry_in_sec(inputs)
	if (locale === "sw") return __sw.chat_retry_in_sec(inputs)
	if (locale === "el") return __el.chat_retry_in_sec(inputs)
	if (locale === "cs") return __cs.chat_retry_in_sec(inputs)
	if (locale === "ro") return __ro.chat_retry_in_sec(inputs)
	if (locale === "hu") return __hu.chat_retry_in_sec(inputs)
	if (locale === "sv") return __sv.chat_retry_in_sec(inputs)
	if (locale === "he") return __he.chat_retry_in_sec(inputs)
	return __ru.chat_retry_in_sec(inputs)
});
/**
* | output |
* | --- |
* | "Retrying in a few seconds…" |
*
* @param {Chat_Retry_SoonInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_retry_soon = /** @type {((inputs?: Chat_Retry_SoonInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Retry_SoonInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_retry_soon(inputs)
	if (locale === "fr") return __fr.chat_retry_soon(inputs)
	if (locale === "es") return __es.chat_retry_soon(inputs)
	if (locale === "zh") return __zh.chat_retry_soon(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_retry_soon(inputs)
	if (locale === "hi") return __hi.chat_retry_soon(inputs)
	if (locale === "ar") return __ar.chat_retry_soon(inputs)
	if (locale === "pt") return __pt.chat_retry_soon(inputs)
	if (locale === "de") return __de.chat_retry_soon(inputs)
	if (locale === "ja") return __ja.chat_retry_soon(inputs)
	if (locale === "ko") return __ko.chat_retry_soon(inputs)
	if (locale === "it") return __it.chat_retry_soon(inputs)
	if (locale === "tr") return __tr.chat_retry_soon(inputs)
	if (locale === "pl") return __pl.chat_retry_soon(inputs)
	if (locale === "uk") return __uk.chat_retry_soon(inputs)
	if (locale === "nl") return __nl.chat_retry_soon(inputs)
	if (locale === "vi") return __vi.chat_retry_soon(inputs)
	if (locale === "id") return __id.chat_retry_soon(inputs)
	if (locale === "ms") return __ms.chat_retry_soon(inputs)
	if (locale === "th") return __th.chat_retry_soon(inputs)
	if (locale === "fa") return __fa.chat_retry_soon(inputs)
	if (locale === "ur") return __ur.chat_retry_soon(inputs)
	if (locale === "bn") return __bn.chat_retry_soon(inputs)
	if (locale === "pa") return __pa.chat_retry_soon(inputs)
	if (locale === "sw") return __sw.chat_retry_soon(inputs)
	if (locale === "el") return __el.chat_retry_soon(inputs)
	if (locale === "cs") return __cs.chat_retry_soon(inputs)
	if (locale === "ro") return __ro.chat_retry_soon(inputs)
	if (locale === "hu") return __hu.chat_retry_soon(inputs)
	if (locale === "sv") return __sv.chat_retry_soon(inputs)
	if (locale === "he") return __he.chat_retry_soon(inputs)
	return __ru.chat_retry_soon(inputs)
});
/**
* | output |
* | --- |
* | "Save" |
*
* @param {Chat_SaveInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_save = /** @type {((inputs?: Chat_SaveInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_SaveInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_save(inputs)
	if (locale === "fr") return __fr.chat_save(inputs)
	if (locale === "es") return __es.chat_save(inputs)
	if (locale === "zh") return __zh.chat_save(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_save(inputs)
	if (locale === "hi") return __hi.chat_save(inputs)
	if (locale === "ar") return __ar.chat_save(inputs)
	if (locale === "pt") return __pt.chat_save(inputs)
	if (locale === "de") return __de.chat_save(inputs)
	if (locale === "ja") return __ja.chat_save(inputs)
	if (locale === "ko") return __ko.chat_save(inputs)
	if (locale === "it") return __it.chat_save(inputs)
	if (locale === "tr") return __tr.chat_save(inputs)
	if (locale === "pl") return __pl.chat_save(inputs)
	if (locale === "uk") return __uk.chat_save(inputs)
	if (locale === "nl") return __nl.chat_save(inputs)
	if (locale === "vi") return __vi.chat_save(inputs)
	if (locale === "id") return __id.chat_save(inputs)
	if (locale === "ms") return __ms.chat_save(inputs)
	if (locale === "th") return __th.chat_save(inputs)
	if (locale === "fa") return __fa.chat_save(inputs)
	if (locale === "ur") return __ur.chat_save(inputs)
	if (locale === "bn") return __bn.chat_save(inputs)
	if (locale === "pa") return __pa.chat_save(inputs)
	if (locale === "sw") return __sw.chat_save(inputs)
	if (locale === "el") return __el.chat_save(inputs)
	if (locale === "cs") return __cs.chat_save(inputs)
	if (locale === "ro") return __ro.chat_save(inputs)
	if (locale === "hu") return __hu.chat_save(inputs)
	if (locale === "sv") return __sv.chat_save(inputs)
	if (locale === "he") return __he.chat_save(inputs)
	return __ru.chat_save(inputs)
});
/**
* | output |
* | --- |
* | "Saving…" |
*
* @param {Chat_SavingInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_saving = /** @type {((inputs?: Chat_SavingInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_SavingInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_saving(inputs)
	if (locale === "fr") return __fr.chat_saving(inputs)
	if (locale === "es") return __es.chat_saving(inputs)
	if (locale === "zh") return __zh.chat_saving(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_saving(inputs)
	if (locale === "hi") return __hi.chat_saving(inputs)
	if (locale === "ar") return __ar.chat_saving(inputs)
	if (locale === "pt") return __pt.chat_saving(inputs)
	if (locale === "de") return __de.chat_saving(inputs)
	if (locale === "ja") return __ja.chat_saving(inputs)
	if (locale === "ko") return __ko.chat_saving(inputs)
	if (locale === "it") return __it.chat_saving(inputs)
	if (locale === "tr") return __tr.chat_saving(inputs)
	if (locale === "pl") return __pl.chat_saving(inputs)
	if (locale === "uk") return __uk.chat_saving(inputs)
	if (locale === "nl") return __nl.chat_saving(inputs)
	if (locale === "vi") return __vi.chat_saving(inputs)
	if (locale === "id") return __id.chat_saving(inputs)
	if (locale === "ms") return __ms.chat_saving(inputs)
	if (locale === "th") return __th.chat_saving(inputs)
	if (locale === "fa") return __fa.chat_saving(inputs)
	if (locale === "ur") return __ur.chat_saving(inputs)
	if (locale === "bn") return __bn.chat_saving(inputs)
	if (locale === "pa") return __pa.chat_saving(inputs)
	if (locale === "sw") return __sw.chat_saving(inputs)
	if (locale === "el") return __el.chat_saving(inputs)
	if (locale === "cs") return __cs.chat_saving(inputs)
	if (locale === "ro") return __ro.chat_saving(inputs)
	if (locale === "hu") return __hu.chat_saving(inputs)
	if (locale === "sv") return __sv.chat_saving(inputs)
	if (locale === "he") return __he.chat_saving(inputs)
	return __ru.chat_saving(inputs)
});
/**
* | output |
* | --- |
* | "Send failed" |
*
* @param {Chat_Send_ErrorInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_send_error = /** @type {((inputs?: Chat_Send_ErrorInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Send_ErrorInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_send_error(inputs)
	if (locale === "fr") return __fr.chat_send_error(inputs)
	if (locale === "es") return __es.chat_send_error(inputs)
	if (locale === "zh") return __zh.chat_send_error(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_send_error(inputs)
	if (locale === "hi") return __hi.chat_send_error(inputs)
	if (locale === "ar") return __ar.chat_send_error(inputs)
	if (locale === "pt") return __pt.chat_send_error(inputs)
	if (locale === "de") return __de.chat_send_error(inputs)
	if (locale === "ja") return __ja.chat_send_error(inputs)
	if (locale === "ko") return __ko.chat_send_error(inputs)
	if (locale === "it") return __it.chat_send_error(inputs)
	if (locale === "tr") return __tr.chat_send_error(inputs)
	if (locale === "pl") return __pl.chat_send_error(inputs)
	if (locale === "uk") return __uk.chat_send_error(inputs)
	if (locale === "nl") return __nl.chat_send_error(inputs)
	if (locale === "vi") return __vi.chat_send_error(inputs)
	if (locale === "id") return __id.chat_send_error(inputs)
	if (locale === "ms") return __ms.chat_send_error(inputs)
	if (locale === "th") return __th.chat_send_error(inputs)
	if (locale === "fa") return __fa.chat_send_error(inputs)
	if (locale === "ur") return __ur.chat_send_error(inputs)
	if (locale === "bn") return __bn.chat_send_error(inputs)
	if (locale === "pa") return __pa.chat_send_error(inputs)
	if (locale === "sw") return __sw.chat_send_error(inputs)
	if (locale === "el") return __el.chat_send_error(inputs)
	if (locale === "cs") return __cs.chat_send_error(inputs)
	if (locale === "ro") return __ro.chat_send_error(inputs)
	if (locale === "hu") return __hu.chat_send_error(inputs)
	if (locale === "sv") return __sv.chat_send_error(inputs)
	if (locale === "he") return __he.chat_send_error(inputs)
	return __ru.chat_send_error(inputs)
});
/**
* | output |
* | --- |
* | "Not sent · tap to retry" |
*
* @param {Chat_Send_Failed_RetryInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_send_failed_retry = /** @type {((inputs?: Chat_Send_Failed_RetryInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Send_Failed_RetryInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_send_failed_retry(inputs)
	if (locale === "fr") return __fr.chat_send_failed_retry(inputs)
	if (locale === "es") return __es.chat_send_failed_retry(inputs)
	if (locale === "zh") return __zh.chat_send_failed_retry(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_send_failed_retry(inputs)
	if (locale === "hi") return __hi.chat_send_failed_retry(inputs)
	if (locale === "ar") return __ar.chat_send_failed_retry(inputs)
	if (locale === "pt") return __pt.chat_send_failed_retry(inputs)
	if (locale === "de") return __de.chat_send_failed_retry(inputs)
	if (locale === "ja") return __ja.chat_send_failed_retry(inputs)
	if (locale === "ko") return __ko.chat_send_failed_retry(inputs)
	if (locale === "it") return __it.chat_send_failed_retry(inputs)
	if (locale === "tr") return __tr.chat_send_failed_retry(inputs)
	if (locale === "pl") return __pl.chat_send_failed_retry(inputs)
	if (locale === "uk") return __uk.chat_send_failed_retry(inputs)
	if (locale === "nl") return __nl.chat_send_failed_retry(inputs)
	if (locale === "vi") return __vi.chat_send_failed_retry(inputs)
	if (locale === "id") return __id.chat_send_failed_retry(inputs)
	if (locale === "ms") return __ms.chat_send_failed_retry(inputs)
	if (locale === "th") return __th.chat_send_failed_retry(inputs)
	if (locale === "fa") return __fa.chat_send_failed_retry(inputs)
	if (locale === "ur") return __ur.chat_send_failed_retry(inputs)
	if (locale === "bn") return __bn.chat_send_failed_retry(inputs)
	if (locale === "pa") return __pa.chat_send_failed_retry(inputs)
	if (locale === "sw") return __sw.chat_send_failed_retry(inputs)
	if (locale === "el") return __el.chat_send_failed_retry(inputs)
	if (locale === "cs") return __cs.chat_send_failed_retry(inputs)
	if (locale === "ro") return __ro.chat_send_failed_retry(inputs)
	if (locale === "hu") return __hu.chat_send_failed_retry(inputs)
	if (locale === "sv") return __sv.chat_send_failed_retry(inputs)
	if (locale === "he") return __he.chat_send_failed_retry(inputs)
	return __ru.chat_send_failed_retry(inputs)
});
/**
* | output |
* | --- |
* | "Sending unavailable" |
*
* @param {Chat_Send_UnavailableInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_send_unavailable = /** @type {((inputs?: Chat_Send_UnavailableInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Send_UnavailableInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_send_unavailable(inputs)
	if (locale === "fr") return __fr.chat_send_unavailable(inputs)
	if (locale === "es") return __es.chat_send_unavailable(inputs)
	if (locale === "zh") return __zh.chat_send_unavailable(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_send_unavailable(inputs)
	if (locale === "hi") return __hi.chat_send_unavailable(inputs)
	if (locale === "ar") return __ar.chat_send_unavailable(inputs)
	if (locale === "pt") return __pt.chat_send_unavailable(inputs)
	if (locale === "de") return __de.chat_send_unavailable(inputs)
	if (locale === "ja") return __ja.chat_send_unavailable(inputs)
	if (locale === "ko") return __ko.chat_send_unavailable(inputs)
	if (locale === "it") return __it.chat_send_unavailable(inputs)
	if (locale === "tr") return __tr.chat_send_unavailable(inputs)
	if (locale === "pl") return __pl.chat_send_unavailable(inputs)
	if (locale === "uk") return __uk.chat_send_unavailable(inputs)
	if (locale === "nl") return __nl.chat_send_unavailable(inputs)
	if (locale === "vi") return __vi.chat_send_unavailable(inputs)
	if (locale === "id") return __id.chat_send_unavailable(inputs)
	if (locale === "ms") return __ms.chat_send_unavailable(inputs)
	if (locale === "th") return __th.chat_send_unavailable(inputs)
	if (locale === "fa") return __fa.chat_send_unavailable(inputs)
	if (locale === "ur") return __ur.chat_send_unavailable(inputs)
	if (locale === "bn") return __bn.chat_send_unavailable(inputs)
	if (locale === "pa") return __pa.chat_send_unavailable(inputs)
	if (locale === "sw") return __sw.chat_send_unavailable(inputs)
	if (locale === "el") return __el.chat_send_unavailable(inputs)
	if (locale === "cs") return __cs.chat_send_unavailable(inputs)
	if (locale === "ro") return __ro.chat_send_unavailable(inputs)
	if (locale === "hu") return __hu.chat_send_unavailable(inputs)
	if (locale === "sv") return __sv.chat_send_unavailable(inputs)
	if (locale === "he") return __he.chat_send_unavailable(inputs)
	return __ru.chat_send_unavailable(inputs)
});
/**
* | output |
* | --- |
* | "Sending…" |
*
* @param {Chat_SendingInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_sending = /** @type {((inputs?: Chat_SendingInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_SendingInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_sending(inputs)
	if (locale === "fr") return __fr.chat_sending(inputs)
	if (locale === "es") return __es.chat_sending(inputs)
	if (locale === "zh") return __zh.chat_sending(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_sending(inputs)
	if (locale === "hi") return __hi.chat_sending(inputs)
	if (locale === "ar") return __ar.chat_sending(inputs)
	if (locale === "pt") return __pt.chat_sending(inputs)
	if (locale === "de") return __de.chat_sending(inputs)
	if (locale === "ja") return __ja.chat_sending(inputs)
	if (locale === "ko") return __ko.chat_sending(inputs)
	if (locale === "it") return __it.chat_sending(inputs)
	if (locale === "tr") return __tr.chat_sending(inputs)
	if (locale === "pl") return __pl.chat_sending(inputs)
	if (locale === "uk") return __uk.chat_sending(inputs)
	if (locale === "nl") return __nl.chat_sending(inputs)
	if (locale === "vi") return __vi.chat_sending(inputs)
	if (locale === "id") return __id.chat_sending(inputs)
	if (locale === "ms") return __ms.chat_sending(inputs)
	if (locale === "th") return __th.chat_sending(inputs)
	if (locale === "fa") return __fa.chat_sending(inputs)
	if (locale === "ur") return __ur.chat_sending(inputs)
	if (locale === "bn") return __bn.chat_sending(inputs)
	if (locale === "pa") return __pa.chat_sending(inputs)
	if (locale === "sw") return __sw.chat_sending(inputs)
	if (locale === "el") return __el.chat_sending(inputs)
	if (locale === "cs") return __cs.chat_sending(inputs)
	if (locale === "ro") return __ro.chat_sending(inputs)
	if (locale === "hu") return __hu.chat_sending(inputs)
	if (locale === "sv") return __sv.chat_sending(inputs)
	if (locale === "he") return __he.chat_sending(inputs)
	return __ru.chat_sending(inputs)
});
/**
* | output |
* | --- |
* | "Sending · {n} left" |
*
* @param {Chat_Sending_LeftInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_sending_left = /** @type {((inputs: Chat_Sending_LeftInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Sending_LeftInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_sending_left(inputs)
	if (locale === "fr") return __fr.chat_sending_left(inputs)
	if (locale === "es") return __es.chat_sending_left(inputs)
	if (locale === "zh") return __zh.chat_sending_left(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_sending_left(inputs)
	if (locale === "hi") return __hi.chat_sending_left(inputs)
	if (locale === "ar") return __ar.chat_sending_left(inputs)
	if (locale === "pt") return __pt.chat_sending_left(inputs)
	if (locale === "de") return __de.chat_sending_left(inputs)
	if (locale === "ja") return __ja.chat_sending_left(inputs)
	if (locale === "ko") return __ko.chat_sending_left(inputs)
	if (locale === "it") return __it.chat_sending_left(inputs)
	if (locale === "tr") return __tr.chat_sending_left(inputs)
	if (locale === "pl") return __pl.chat_sending_left(inputs)
	if (locale === "uk") return __uk.chat_sending_left(inputs)
	if (locale === "nl") return __nl.chat_sending_left(inputs)
	if (locale === "vi") return __vi.chat_sending_left(inputs)
	if (locale === "id") return __id.chat_sending_left(inputs)
	if (locale === "ms") return __ms.chat_sending_left(inputs)
	if (locale === "th") return __th.chat_sending_left(inputs)
	if (locale === "fa") return __fa.chat_sending_left(inputs)
	if (locale === "ur") return __ur.chat_sending_left(inputs)
	if (locale === "bn") return __bn.chat_sending_left(inputs)
	if (locale === "pa") return __pa.chat_sending_left(inputs)
	if (locale === "sw") return __sw.chat_sending_left(inputs)
	if (locale === "el") return __el.chat_sending_left(inputs)
	if (locale === "cs") return __cs.chat_sending_left(inputs)
	if (locale === "ro") return __ro.chat_sending_left(inputs)
	if (locale === "hu") return __hu.chat_sending_left(inputs)
	if (locale === "sv") return __sv.chat_sending_left(inputs)
	if (locale === "he") return __he.chat_sending_left(inputs)
	return __ru.chat_sending_left(inputs)
});
/**
* | output |
* | --- |
* | "Sending photo…" |
*
* @param {Chat_Sending_PhotoInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_sending_photo = /** @type {((inputs?: Chat_Sending_PhotoInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Sending_PhotoInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_sending_photo(inputs)
	if (locale === "fr") return __fr.chat_sending_photo(inputs)
	if (locale === "es") return __es.chat_sending_photo(inputs)
	if (locale === "zh") return __zh.chat_sending_photo(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_sending_photo(inputs)
	if (locale === "hi") return __hi.chat_sending_photo(inputs)
	if (locale === "ar") return __ar.chat_sending_photo(inputs)
	if (locale === "pt") return __pt.chat_sending_photo(inputs)
	if (locale === "de") return __de.chat_sending_photo(inputs)
	if (locale === "ja") return __ja.chat_sending_photo(inputs)
	if (locale === "ko") return __ko.chat_sending_photo(inputs)
	if (locale === "it") return __it.chat_sending_photo(inputs)
	if (locale === "tr") return __tr.chat_sending_photo(inputs)
	if (locale === "pl") return __pl.chat_sending_photo(inputs)
	if (locale === "uk") return __uk.chat_sending_photo(inputs)
	if (locale === "nl") return __nl.chat_sending_photo(inputs)
	if (locale === "vi") return __vi.chat_sending_photo(inputs)
	if (locale === "id") return __id.chat_sending_photo(inputs)
	if (locale === "ms") return __ms.chat_sending_photo(inputs)
	if (locale === "th") return __th.chat_sending_photo(inputs)
	if (locale === "fa") return __fa.chat_sending_photo(inputs)
	if (locale === "ur") return __ur.chat_sending_photo(inputs)
	if (locale === "bn") return __bn.chat_sending_photo(inputs)
	if (locale === "pa") return __pa.chat_sending_photo(inputs)
	if (locale === "sw") return __sw.chat_sending_photo(inputs)
	if (locale === "el") return __el.chat_sending_photo(inputs)
	if (locale === "cs") return __cs.chat_sending_photo(inputs)
	if (locale === "ro") return __ro.chat_sending_photo(inputs)
	if (locale === "hu") return __hu.chat_sending_photo(inputs)
	if (locale === "sv") return __sv.chat_sending_photo(inputs)
	if (locale === "he") return __he.chat_sending_photo(inputs)
	return __ru.chat_sending_photo(inputs)
});
/**
* | output |
* | --- |
* | "Sending voice…" |
*
* @param {Chat_Sending_VoiceInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_sending_voice = /** @type {((inputs?: Chat_Sending_VoiceInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Sending_VoiceInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_sending_voice(inputs)
	if (locale === "fr") return __fr.chat_sending_voice(inputs)
	if (locale === "es") return __es.chat_sending_voice(inputs)
	if (locale === "zh") return __zh.chat_sending_voice(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_sending_voice(inputs)
	if (locale === "hi") return __hi.chat_sending_voice(inputs)
	if (locale === "ar") return __ar.chat_sending_voice(inputs)
	if (locale === "pt") return __pt.chat_sending_voice(inputs)
	if (locale === "de") return __de.chat_sending_voice(inputs)
	if (locale === "ja") return __ja.chat_sending_voice(inputs)
	if (locale === "ko") return __ko.chat_sending_voice(inputs)
	if (locale === "it") return __it.chat_sending_voice(inputs)
	if (locale === "tr") return __tr.chat_sending_voice(inputs)
	if (locale === "pl") return __pl.chat_sending_voice(inputs)
	if (locale === "uk") return __uk.chat_sending_voice(inputs)
	if (locale === "nl") return __nl.chat_sending_voice(inputs)
	if (locale === "vi") return __vi.chat_sending_voice(inputs)
	if (locale === "id") return __id.chat_sending_voice(inputs)
	if (locale === "ms") return __ms.chat_sending_voice(inputs)
	if (locale === "th") return __th.chat_sending_voice(inputs)
	if (locale === "fa") return __fa.chat_sending_voice(inputs)
	if (locale === "ur") return __ur.chat_sending_voice(inputs)
	if (locale === "bn") return __bn.chat_sending_voice(inputs)
	if (locale === "pa") return __pa.chat_sending_voice(inputs)
	if (locale === "sw") return __sw.chat_sending_voice(inputs)
	if (locale === "el") return __el.chat_sending_voice(inputs)
	if (locale === "cs") return __cs.chat_sending_voice(inputs)
	if (locale === "ro") return __ro.chat_sending_voice(inputs)
	if (locale === "hu") return __hu.chat_sending_voice(inputs)
	if (locale === "sv") return __sv.chat_sending_voice(inputs)
	if (locale === "he") return __he.chat_sending_voice(inputs)
	return __ru.chat_sending_voice(inputs)
});
/**
* | output |
* | --- |
* | "Sent · Enter to send" |
*
* @param {Chat_Sent_HintInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_sent_hint = /** @type {((inputs?: Chat_Sent_HintInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Sent_HintInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_sent_hint(inputs)
	if (locale === "fr") return __fr.chat_sent_hint(inputs)
	if (locale === "es") return __es.chat_sent_hint(inputs)
	if (locale === "zh") return __zh.chat_sent_hint(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_sent_hint(inputs)
	if (locale === "hi") return __hi.chat_sent_hint(inputs)
	if (locale === "ar") return __ar.chat_sent_hint(inputs)
	if (locale === "pt") return __pt.chat_sent_hint(inputs)
	if (locale === "de") return __de.chat_sent_hint(inputs)
	if (locale === "ja") return __ja.chat_sent_hint(inputs)
	if (locale === "ko") return __ko.chat_sent_hint(inputs)
	if (locale === "it") return __it.chat_sent_hint(inputs)
	if (locale === "tr") return __tr.chat_sent_hint(inputs)
	if (locale === "pl") return __pl.chat_sent_hint(inputs)
	if (locale === "uk") return __uk.chat_sent_hint(inputs)
	if (locale === "nl") return __nl.chat_sent_hint(inputs)
	if (locale === "vi") return __vi.chat_sent_hint(inputs)
	if (locale === "id") return __id.chat_sent_hint(inputs)
	if (locale === "ms") return __ms.chat_sent_hint(inputs)
	if (locale === "th") return __th.chat_sent_hint(inputs)
	if (locale === "fa") return __fa.chat_sent_hint(inputs)
	if (locale === "ur") return __ur.chat_sent_hint(inputs)
	if (locale === "bn") return __bn.chat_sent_hint(inputs)
	if (locale === "pa") return __pa.chat_sent_hint(inputs)
	if (locale === "sw") return __sw.chat_sent_hint(inputs)
	if (locale === "el") return __el.chat_sent_hint(inputs)
	if (locale === "cs") return __cs.chat_sent_hint(inputs)
	if (locale === "ro") return __ro.chat_sent_hint(inputs)
	if (locale === "hu") return __hu.chat_sent_hint(inputs)
	if (locale === "sv") return __sv.chat_sent_hint(inputs)
	if (locale === "he") return __he.chat_sent_hint(inputs)
	return __ru.chat_sent_hint(inputs)
});
/**
* | output |
* | --- |
* | "Session expired" |
*
* @param {Chat_Session_ExpiredInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_session_expired = /** @type {((inputs?: Chat_Session_ExpiredInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Session_ExpiredInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_session_expired(inputs)
	if (locale === "fr") return __fr.chat_session_expired(inputs)
	if (locale === "es") return __es.chat_session_expired(inputs)
	if (locale === "zh") return __zh.chat_session_expired(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_session_expired(inputs)
	if (locale === "hi") return __hi.chat_session_expired(inputs)
	if (locale === "ar") return __ar.chat_session_expired(inputs)
	if (locale === "pt") return __pt.chat_session_expired(inputs)
	if (locale === "de") return __de.chat_session_expired(inputs)
	if (locale === "ja") return __ja.chat_session_expired(inputs)
	if (locale === "ko") return __ko.chat_session_expired(inputs)
	if (locale === "it") return __it.chat_session_expired(inputs)
	if (locale === "tr") return __tr.chat_session_expired(inputs)
	if (locale === "pl") return __pl.chat_session_expired(inputs)
	if (locale === "uk") return __uk.chat_session_expired(inputs)
	if (locale === "nl") return __nl.chat_session_expired(inputs)
	if (locale === "vi") return __vi.chat_session_expired(inputs)
	if (locale === "id") return __id.chat_session_expired(inputs)
	if (locale === "ms") return __ms.chat_session_expired(inputs)
	if (locale === "th") return __th.chat_session_expired(inputs)
	if (locale === "fa") return __fa.chat_session_expired(inputs)
	if (locale === "ur") return __ur.chat_session_expired(inputs)
	if (locale === "bn") return __bn.chat_session_expired(inputs)
	if (locale === "pa") return __pa.chat_session_expired(inputs)
	if (locale === "sw") return __sw.chat_session_expired(inputs)
	if (locale === "el") return __el.chat_session_expired(inputs)
	if (locale === "cs") return __cs.chat_session_expired(inputs)
	if (locale === "ro") return __ro.chat_session_expired(inputs)
	if (locale === "hu") return __hu.chat_session_expired(inputs)
	if (locale === "sv") return __sv.chat_session_expired(inputs)
	if (locale === "he") return __he.chat_session_expired(inputs)
	return __ru.chat_session_expired(inputs)
});
/**
* | output |
* | --- |
* | "Sending" |
*
* @param {Chat_Status_SendingInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_status_sending = /** @type {((inputs?: Chat_Status_SendingInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Status_SendingInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_status_sending(inputs)
	if (locale === "fr") return __fr.chat_status_sending(inputs)
	if (locale === "es") return __es.chat_status_sending(inputs)
	if (locale === "zh") return __zh.chat_status_sending(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_status_sending(inputs)
	if (locale === "hi") return __hi.chat_status_sending(inputs)
	if (locale === "ar") return __ar.chat_status_sending(inputs)
	if (locale === "pt") return __pt.chat_status_sending(inputs)
	if (locale === "de") return __de.chat_status_sending(inputs)
	if (locale === "ja") return __ja.chat_status_sending(inputs)
	if (locale === "ko") return __ko.chat_status_sending(inputs)
	if (locale === "it") return __it.chat_status_sending(inputs)
	if (locale === "tr") return __tr.chat_status_sending(inputs)
	if (locale === "pl") return __pl.chat_status_sending(inputs)
	if (locale === "uk") return __uk.chat_status_sending(inputs)
	if (locale === "nl") return __nl.chat_status_sending(inputs)
	if (locale === "vi") return __vi.chat_status_sending(inputs)
	if (locale === "id") return __id.chat_status_sending(inputs)
	if (locale === "ms") return __ms.chat_status_sending(inputs)
	if (locale === "th") return __th.chat_status_sending(inputs)
	if (locale === "fa") return __fa.chat_status_sending(inputs)
	if (locale === "ur") return __ur.chat_status_sending(inputs)
	if (locale === "bn") return __bn.chat_status_sending(inputs)
	if (locale === "pa") return __pa.chat_status_sending(inputs)
	if (locale === "sw") return __sw.chat_status_sending(inputs)
	if (locale === "el") return __el.chat_status_sending(inputs)
	if (locale === "cs") return __cs.chat_status_sending(inputs)
	if (locale === "ro") return __ro.chat_status_sending(inputs)
	if (locale === "hu") return __hu.chat_status_sending(inputs)
	if (locale === "sv") return __sv.chat_status_sending(inputs)
	if (locale === "he") return __he.chat_status_sending(inputs)
	return __ru.chat_status_sending(inputs)
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
* | "User unavailable" |
*
* @param {Chat_User_UnavailableInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_user_unavailable = /** @type {((inputs?: Chat_User_UnavailableInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_User_UnavailableInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_user_unavailable(inputs)
	if (locale === "fr") return __fr.chat_user_unavailable(inputs)
	if (locale === "es") return __es.chat_user_unavailable(inputs)
	if (locale === "zh") return __zh.chat_user_unavailable(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_user_unavailable(inputs)
	if (locale === "hi") return __hi.chat_user_unavailable(inputs)
	if (locale === "ar") return __ar.chat_user_unavailable(inputs)
	if (locale === "pt") return __pt.chat_user_unavailable(inputs)
	if (locale === "de") return __de.chat_user_unavailable(inputs)
	if (locale === "ja") return __ja.chat_user_unavailable(inputs)
	if (locale === "ko") return __ko.chat_user_unavailable(inputs)
	if (locale === "it") return __it.chat_user_unavailable(inputs)
	if (locale === "tr") return __tr.chat_user_unavailable(inputs)
	if (locale === "pl") return __pl.chat_user_unavailable(inputs)
	if (locale === "uk") return __uk.chat_user_unavailable(inputs)
	if (locale === "nl") return __nl.chat_user_unavailable(inputs)
	if (locale === "vi") return __vi.chat_user_unavailable(inputs)
	if (locale === "id") return __id.chat_user_unavailable(inputs)
	if (locale === "ms") return __ms.chat_user_unavailable(inputs)
	if (locale === "th") return __th.chat_user_unavailable(inputs)
	if (locale === "fa") return __fa.chat_user_unavailable(inputs)
	if (locale === "ur") return __ur.chat_user_unavailable(inputs)
	if (locale === "bn") return __bn.chat_user_unavailable(inputs)
	if (locale === "pa") return __pa.chat_user_unavailable(inputs)
	if (locale === "sw") return __sw.chat_user_unavailable(inputs)
	if (locale === "el") return __el.chat_user_unavailable(inputs)
	if (locale === "cs") return __cs.chat_user_unavailable(inputs)
	if (locale === "ro") return __ro.chat_user_unavailable(inputs)
	if (locale === "hu") return __hu.chat_user_unavailable(inputs)
	if (locale === "sv") return __sv.chat_user_unavailable(inputs)
	if (locale === "he") return __he.chat_user_unavailable(inputs)
	return __ru.chat_user_unavailable(inputs)
});
/**
* | output |
* | --- |
* | "Voice message" |
*
* @param {Chat_VoiceInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_voice = /** @type {((inputs?: Chat_VoiceInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_VoiceInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_voice(inputs)
	if (locale === "fr") return __fr.chat_voice(inputs)
	if (locale === "es") return __es.chat_voice(inputs)
	if (locale === "zh") return __zh.chat_voice(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_voice(inputs)
	if (locale === "hi") return __hi.chat_voice(inputs)
	if (locale === "ar") return __ar.chat_voice(inputs)
	if (locale === "pt") return __pt.chat_voice(inputs)
	if (locale === "de") return __de.chat_voice(inputs)
	if (locale === "ja") return __ja.chat_voice(inputs)
	if (locale === "ko") return __ko.chat_voice(inputs)
	if (locale === "it") return __it.chat_voice(inputs)
	if (locale === "tr") return __tr.chat_voice(inputs)
	if (locale === "pl") return __pl.chat_voice(inputs)
	if (locale === "uk") return __uk.chat_voice(inputs)
	if (locale === "nl") return __nl.chat_voice(inputs)
	if (locale === "vi") return __vi.chat_voice(inputs)
	if (locale === "id") return __id.chat_voice(inputs)
	if (locale === "ms") return __ms.chat_voice(inputs)
	if (locale === "th") return __th.chat_voice(inputs)
	if (locale === "fa") return __fa.chat_voice(inputs)
	if (locale === "ur") return __ur.chat_voice(inputs)
	if (locale === "bn") return __bn.chat_voice(inputs)
	if (locale === "pa") return __pa.chat_voice(inputs)
	if (locale === "sw") return __sw.chat_voice(inputs)
	if (locale === "el") return __el.chat_voice(inputs)
	if (locale === "cs") return __cs.chat_voice(inputs)
	if (locale === "ro") return __ro.chat_voice(inputs)
	if (locale === "hu") return __hu.chat_voice(inputs)
	if (locale === "sv") return __sv.chat_voice(inputs)
	if (locale === "he") return __he.chat_voice(inputs)
	return __ru.chat_voice(inputs)
});
/**
* | output |
* | --- |
* | "Voice error" |
*
* @param {Chat_Voice_ErrorInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_voice_error = /** @type {((inputs?: Chat_Voice_ErrorInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Voice_ErrorInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_voice_error(inputs)
	if (locale === "fr") return __fr.chat_voice_error(inputs)
	if (locale === "es") return __es.chat_voice_error(inputs)
	if (locale === "zh") return __zh.chat_voice_error(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_voice_error(inputs)
	if (locale === "hi") return __hi.chat_voice_error(inputs)
	if (locale === "ar") return __ar.chat_voice_error(inputs)
	if (locale === "pt") return __pt.chat_voice_error(inputs)
	if (locale === "de") return __de.chat_voice_error(inputs)
	if (locale === "ja") return __ja.chat_voice_error(inputs)
	if (locale === "ko") return __ko.chat_voice_error(inputs)
	if (locale === "it") return __it.chat_voice_error(inputs)
	if (locale === "tr") return __tr.chat_voice_error(inputs)
	if (locale === "pl") return __pl.chat_voice_error(inputs)
	if (locale === "uk") return __uk.chat_voice_error(inputs)
	if (locale === "nl") return __nl.chat_voice_error(inputs)
	if (locale === "vi") return __vi.chat_voice_error(inputs)
	if (locale === "id") return __id.chat_voice_error(inputs)
	if (locale === "ms") return __ms.chat_voice_error(inputs)
	if (locale === "th") return __th.chat_voice_error(inputs)
	if (locale === "fa") return __fa.chat_voice_error(inputs)
	if (locale === "ur") return __ur.chat_voice_error(inputs)
	if (locale === "bn") return __bn.chat_voice_error(inputs)
	if (locale === "pa") return __pa.chat_voice_error(inputs)
	if (locale === "sw") return __sw.chat_voice_error(inputs)
	if (locale === "el") return __el.chat_voice_error(inputs)
	if (locale === "cs") return __cs.chat_voice_error(inputs)
	if (locale === "ro") return __ro.chat_voice_error(inputs)
	if (locale === "hu") return __hu.chat_voice_error(inputs)
	if (locale === "sv") return __sv.chat_voice_error(inputs)
	if (locale === "he") return __he.chat_voice_error(inputs)
	return __ru.chat_voice_error(inputs)
});
/**
* | output |
* | --- |
* | "Voice not sent" |
*
* @param {Chat_Voice_FailedInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_voice_failed = /** @type {((inputs?: Chat_Voice_FailedInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Voice_FailedInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_voice_failed(inputs)
	if (locale === "fr") return __fr.chat_voice_failed(inputs)
	if (locale === "es") return __es.chat_voice_failed(inputs)
	if (locale === "zh") return __zh.chat_voice_failed(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_voice_failed(inputs)
	if (locale === "hi") return __hi.chat_voice_failed(inputs)
	if (locale === "ar") return __ar.chat_voice_failed(inputs)
	if (locale === "pt") return __pt.chat_voice_failed(inputs)
	if (locale === "de") return __de.chat_voice_failed(inputs)
	if (locale === "ja") return __ja.chat_voice_failed(inputs)
	if (locale === "ko") return __ko.chat_voice_failed(inputs)
	if (locale === "it") return __it.chat_voice_failed(inputs)
	if (locale === "tr") return __tr.chat_voice_failed(inputs)
	if (locale === "pl") return __pl.chat_voice_failed(inputs)
	if (locale === "uk") return __uk.chat_voice_failed(inputs)
	if (locale === "nl") return __nl.chat_voice_failed(inputs)
	if (locale === "vi") return __vi.chat_voice_failed(inputs)
	if (locale === "id") return __id.chat_voice_failed(inputs)
	if (locale === "ms") return __ms.chat_voice_failed(inputs)
	if (locale === "th") return __th.chat_voice_failed(inputs)
	if (locale === "fa") return __fa.chat_voice_failed(inputs)
	if (locale === "ur") return __ur.chat_voice_failed(inputs)
	if (locale === "bn") return __bn.chat_voice_failed(inputs)
	if (locale === "pa") return __pa.chat_voice_failed(inputs)
	if (locale === "sw") return __sw.chat_voice_failed(inputs)
	if (locale === "el") return __el.chat_voice_failed(inputs)
	if (locale === "cs") return __cs.chat_voice_failed(inputs)
	if (locale === "ro") return __ro.chat_voice_failed(inputs)
	if (locale === "hu") return __hu.chat_voice_failed(inputs)
	if (locale === "sv") return __sv.chat_voice_failed(inputs)
	if (locale === "he") return __he.chat_voice_failed(inputs)
	return __ru.chat_voice_failed(inputs)
});
/**
* | output |
* | --- |
* | "No network — can’t send voice offline" |
*
* @param {Chat_Voice_OfflineInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_voice_offline = /** @type {((inputs?: Chat_Voice_OfflineInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Voice_OfflineInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_voice_offline(inputs)
	if (locale === "fr") return __fr.chat_voice_offline(inputs)
	if (locale === "es") return __es.chat_voice_offline(inputs)
	if (locale === "zh") return __zh.chat_voice_offline(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_voice_offline(inputs)
	if (locale === "hi") return __hi.chat_voice_offline(inputs)
	if (locale === "ar") return __ar.chat_voice_offline(inputs)
	if (locale === "pt") return __pt.chat_voice_offline(inputs)
	if (locale === "de") return __de.chat_voice_offline(inputs)
	if (locale === "ja") return __ja.chat_voice_offline(inputs)
	if (locale === "ko") return __ko.chat_voice_offline(inputs)
	if (locale === "it") return __it.chat_voice_offline(inputs)
	if (locale === "tr") return __tr.chat_voice_offline(inputs)
	if (locale === "pl") return __pl.chat_voice_offline(inputs)
	if (locale === "uk") return __uk.chat_voice_offline(inputs)
	if (locale === "nl") return __nl.chat_voice_offline(inputs)
	if (locale === "vi") return __vi.chat_voice_offline(inputs)
	if (locale === "id") return __id.chat_voice_offline(inputs)
	if (locale === "ms") return __ms.chat_voice_offline(inputs)
	if (locale === "th") return __th.chat_voice_offline(inputs)
	if (locale === "fa") return __fa.chat_voice_offline(inputs)
	if (locale === "ur") return __ur.chat_voice_offline(inputs)
	if (locale === "bn") return __bn.chat_voice_offline(inputs)
	if (locale === "pa") return __pa.chat_voice_offline(inputs)
	if (locale === "sw") return __sw.chat_voice_offline(inputs)
	if (locale === "el") return __el.chat_voice_offline(inputs)
	if (locale === "cs") return __cs.chat_voice_offline(inputs)
	if (locale === "ro") return __ro.chat_voice_offline(inputs)
	if (locale === "hu") return __hu.chat_voice_offline(inputs)
	if (locale === "sv") return __sv.chat_voice_offline(inputs)
	if (locale === "he") return __he.chat_voice_offline(inputs)
	return __ru.chat_voice_offline(inputs)
});
/**
* | output |
* | --- |
* | "Recording too short" |
*
* @param {Chat_Voice_Too_ShortInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_voice_too_short = /** @type {((inputs?: Chat_Voice_Too_ShortInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Voice_Too_ShortInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_voice_too_short(inputs)
	if (locale === "fr") return __fr.chat_voice_too_short(inputs)
	if (locale === "es") return __es.chat_voice_too_short(inputs)
	if (locale === "zh") return __zh.chat_voice_too_short(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_voice_too_short(inputs)
	if (locale === "hi") return __hi.chat_voice_too_short(inputs)
	if (locale === "ar") return __ar.chat_voice_too_short(inputs)
	if (locale === "pt") return __pt.chat_voice_too_short(inputs)
	if (locale === "de") return __de.chat_voice_too_short(inputs)
	if (locale === "ja") return __ja.chat_voice_too_short(inputs)
	if (locale === "ko") return __ko.chat_voice_too_short(inputs)
	if (locale === "it") return __it.chat_voice_too_short(inputs)
	if (locale === "tr") return __tr.chat_voice_too_short(inputs)
	if (locale === "pl") return __pl.chat_voice_too_short(inputs)
	if (locale === "uk") return __uk.chat_voice_too_short(inputs)
	if (locale === "nl") return __nl.chat_voice_too_short(inputs)
	if (locale === "vi") return __vi.chat_voice_too_short(inputs)
	if (locale === "id") return __id.chat_voice_too_short(inputs)
	if (locale === "ms") return __ms.chat_voice_too_short(inputs)
	if (locale === "th") return __th.chat_voice_too_short(inputs)
	if (locale === "fa") return __fa.chat_voice_too_short(inputs)
	if (locale === "ur") return __ur.chat_voice_too_short(inputs)
	if (locale === "bn") return __bn.chat_voice_too_short(inputs)
	if (locale === "pa") return __pa.chat_voice_too_short(inputs)
	if (locale === "sw") return __sw.chat_voice_too_short(inputs)
	if (locale === "el") return __el.chat_voice_too_short(inputs)
	if (locale === "cs") return __cs.chat_voice_too_short(inputs)
	if (locale === "ro") return __ro.chat_voice_too_short(inputs)
	if (locale === "hu") return __hu.chat_voice_too_short(inputs)
	if (locale === "sv") return __sv.chat_voice_too_short(inputs)
	if (locale === "he") return __he.chat_voice_too_short(inputs)
	return __ru.chat_voice_too_short(inputs)
});
/**
* | output |
* | --- |
* | "Voice recording isn’t supported in this browser" |
*
* @param {Chat_Voice_UnsupportedInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_voice_unsupported = /** @type {((inputs?: Chat_Voice_UnsupportedInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_Voice_UnsupportedInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_voice_unsupported(inputs)
	if (locale === "fr") return __fr.chat_voice_unsupported(inputs)
	if (locale === "es") return __es.chat_voice_unsupported(inputs)
	if (locale === "zh") return __zh.chat_voice_unsupported(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_voice_unsupported(inputs)
	if (locale === "hi") return __hi.chat_voice_unsupported(inputs)
	if (locale === "ar") return __ar.chat_voice_unsupported(inputs)
	if (locale === "pt") return __pt.chat_voice_unsupported(inputs)
	if (locale === "de") return __de.chat_voice_unsupported(inputs)
	if (locale === "ja") return __ja.chat_voice_unsupported(inputs)
	if (locale === "ko") return __ko.chat_voice_unsupported(inputs)
	if (locale === "it") return __it.chat_voice_unsupported(inputs)
	if (locale === "tr") return __tr.chat_voice_unsupported(inputs)
	if (locale === "pl") return __pl.chat_voice_unsupported(inputs)
	if (locale === "uk") return __uk.chat_voice_unsupported(inputs)
	if (locale === "nl") return __nl.chat_voice_unsupported(inputs)
	if (locale === "vi") return __vi.chat_voice_unsupported(inputs)
	if (locale === "id") return __id.chat_voice_unsupported(inputs)
	if (locale === "ms") return __ms.chat_voice_unsupported(inputs)
	if (locale === "th") return __th.chat_voice_unsupported(inputs)
	if (locale === "fa") return __fa.chat_voice_unsupported(inputs)
	if (locale === "ur") return __ur.chat_voice_unsupported(inputs)
	if (locale === "bn") return __bn.chat_voice_unsupported(inputs)
	if (locale === "pa") return __pa.chat_voice_unsupported(inputs)
	if (locale === "sw") return __sw.chat_voice_unsupported(inputs)
	if (locale === "el") return __el.chat_voice_unsupported(inputs)
	if (locale === "cs") return __cs.chat_voice_unsupported(inputs)
	if (locale === "ro") return __ro.chat_voice_unsupported(inputs)
	if (locale === "hu") return __hu.chat_voice_unsupported(inputs)
	if (locale === "sv") return __sv.chat_voice_unsupported(inputs)
	if (locale === "he") return __he.chat_voice_unsupported(inputs)
	return __ru.chat_voice_unsupported(inputs)
});
/**
* | output |
* | --- |
* | "You" |
*
* @param {Chat_YouInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const chat_you = /** @type {((inputs?: Chat_YouInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Chat_YouInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.chat_you(inputs)
	if (locale === "fr") return __fr.chat_you(inputs)
	if (locale === "es") return __es.chat_you(inputs)
	if (locale === "zh") return __zh.chat_you(inputs)
	if (locale === "zh-TW") return __zh_tw2.chat_you(inputs)
	if (locale === "hi") return __hi.chat_you(inputs)
	if (locale === "ar") return __ar.chat_you(inputs)
	if (locale === "pt") return __pt.chat_you(inputs)
	if (locale === "de") return __de.chat_you(inputs)
	if (locale === "ja") return __ja.chat_you(inputs)
	if (locale === "ko") return __ko.chat_you(inputs)
	if (locale === "it") return __it.chat_you(inputs)
	if (locale === "tr") return __tr.chat_you(inputs)
	if (locale === "pl") return __pl.chat_you(inputs)
	if (locale === "uk") return __uk.chat_you(inputs)
	if (locale === "nl") return __nl.chat_you(inputs)
	if (locale === "vi") return __vi.chat_you(inputs)
	if (locale === "id") return __id.chat_you(inputs)
	if (locale === "ms") return __ms.chat_you(inputs)
	if (locale === "th") return __th.chat_you(inputs)
	if (locale === "fa") return __fa.chat_you(inputs)
	if (locale === "ur") return __ur.chat_you(inputs)
	if (locale === "bn") return __bn.chat_you(inputs)
	if (locale === "pa") return __pa.chat_you(inputs)
	if (locale === "sw") return __sw.chat_you(inputs)
	if (locale === "el") return __el.chat_you(inputs)
	if (locale === "cs") return __cs.chat_you(inputs)
	if (locale === "ro") return __ro.chat_you(inputs)
	if (locale === "hu") return __hu.chat_you(inputs)
	if (locale === "sv") return __sv.chat_you(inputs)
	if (locale === "he") return __he.chat_you(inputs)
	return __ru.chat_you(inputs)
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
* | "All" |
*
* @param {Common_AllInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_all = /** @type {((inputs?: Common_AllInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_AllInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_all(inputs)
	if (locale === "fr") return __fr.common_all(inputs)
	if (locale === "es") return __es.common_all(inputs)
	if (locale === "zh") return __zh.common_all(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_all(inputs)
	if (locale === "hi") return __hi.common_all(inputs)
	if (locale === "ar") return __ar.common_all(inputs)
	if (locale === "pt") return __pt.common_all(inputs)
	if (locale === "de") return __de.common_all(inputs)
	if (locale === "ja") return __ja.common_all(inputs)
	if (locale === "ko") return __ko.common_all(inputs)
	if (locale === "it") return __it.common_all(inputs)
	if (locale === "tr") return __tr.common_all(inputs)
	if (locale === "pl") return __pl.common_all(inputs)
	if (locale === "uk") return __uk.common_all(inputs)
	if (locale === "nl") return __nl.common_all(inputs)
	if (locale === "vi") return __vi.common_all(inputs)
	if (locale === "id") return __id.common_all(inputs)
	if (locale === "ms") return __ms.common_all(inputs)
	if (locale === "th") return __th.common_all(inputs)
	if (locale === "fa") return __fa.common_all(inputs)
	if (locale === "ur") return __ur.common_all(inputs)
	if (locale === "bn") return __bn.common_all(inputs)
	if (locale === "pa") return __pa.common_all(inputs)
	if (locale === "sw") return __sw.common_all(inputs)
	if (locale === "el") return __el.common_all(inputs)
	if (locale === "cs") return __cs.common_all(inputs)
	if (locale === "ro") return __ro.common_all(inputs)
	if (locale === "hu") return __hu.common_all(inputs)
	if (locale === "sv") return __sv.common_all(inputs)
	if (locale === "he") return __he.common_all(inputs)
	return __ru.common_all(inputs)
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
* | "Business" |
*
* @param {Common_BusinessInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_business = /** @type {((inputs?: Common_BusinessInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_BusinessInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_business(inputs)
	if (locale === "fr") return __fr.common_business(inputs)
	if (locale === "es") return __es.common_business(inputs)
	if (locale === "zh") return __zh.common_business(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_business(inputs)
	if (locale === "hi") return __hi.common_business(inputs)
	if (locale === "ar") return __ar.common_business(inputs)
	if (locale === "pt") return __pt.common_business(inputs)
	if (locale === "de") return __de.common_business(inputs)
	if (locale === "ja") return __ja.common_business(inputs)
	if (locale === "ko") return __ko.common_business(inputs)
	if (locale === "it") return __it.common_business(inputs)
	if (locale === "tr") return __tr.common_business(inputs)
	if (locale === "pl") return __pl.common_business(inputs)
	if (locale === "uk") return __uk.common_business(inputs)
	if (locale === "nl") return __nl.common_business(inputs)
	if (locale === "vi") return __vi.common_business(inputs)
	if (locale === "id") return __id.common_business(inputs)
	if (locale === "ms") return __ms.common_business(inputs)
	if (locale === "th") return __th.common_business(inputs)
	if (locale === "fa") return __fa.common_business(inputs)
	if (locale === "ur") return __ur.common_business(inputs)
	if (locale === "bn") return __bn.common_business(inputs)
	if (locale === "pa") return __pa.common_business(inputs)
	if (locale === "sw") return __sw.common_business(inputs)
	if (locale === "el") return __el.common_business(inputs)
	if (locale === "cs") return __cs.common_business(inputs)
	if (locale === "ro") return __ro.common_business(inputs)
	if (locale === "hu") return __hu.common_business(inputs)
	if (locale === "sv") return __sv.common_business(inputs)
	if (locale === "he") return __he.common_business(inputs)
	return __ru.common_business(inputs)
});
/**
* | output |
* | --- |
* | "Clear" |
*
* @param {Common_ClearInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_clear = /** @type {((inputs?: Common_ClearInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ClearInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_clear(inputs)
	if (locale === "fr") return __fr.common_clear(inputs)
	if (locale === "es") return __es.common_clear(inputs)
	if (locale === "zh") return __zh.common_clear(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_clear(inputs)
	if (locale === "hi") return __hi.common_clear(inputs)
	if (locale === "ar") return __ar.common_clear(inputs)
	if (locale === "pt") return __pt.common_clear(inputs)
	if (locale === "de") return __de.common_clear(inputs)
	if (locale === "ja") return __ja.common_clear(inputs)
	if (locale === "ko") return __ko.common_clear(inputs)
	if (locale === "it") return __it.common_clear(inputs)
	if (locale === "tr") return __tr.common_clear(inputs)
	if (locale === "pl") return __pl.common_clear(inputs)
	if (locale === "uk") return __uk.common_clear(inputs)
	if (locale === "nl") return __nl.common_clear(inputs)
	if (locale === "vi") return __vi.common_clear(inputs)
	if (locale === "id") return __id.common_clear(inputs)
	if (locale === "ms") return __ms.common_clear(inputs)
	if (locale === "th") return __th.common_clear(inputs)
	if (locale === "fa") return __fa.common_clear(inputs)
	if (locale === "ur") return __ur.common_clear(inputs)
	if (locale === "bn") return __bn.common_clear(inputs)
	if (locale === "pa") return __pa.common_clear(inputs)
	if (locale === "sw") return __sw.common_clear(inputs)
	if (locale === "el") return __el.common_clear(inputs)
	if (locale === "cs") return __cs.common_clear(inputs)
	if (locale === "ro") return __ro.common_clear(inputs)
	if (locale === "hu") return __hu.common_clear(inputs)
	if (locale === "sv") return __sv.common_clear(inputs)
	if (locale === "he") return __he.common_clear(inputs)
	return __ru.common_clear(inputs)
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
* | "Listing" |
*
* @param {Common_ListingInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_listing = /** @type {((inputs?: Common_ListingInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ListingInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_listing(inputs)
	if (locale === "fr") return __fr.common_listing(inputs)
	if (locale === "es") return __es.common_listing(inputs)
	if (locale === "zh") return __zh.common_listing(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_listing(inputs)
	if (locale === "hi") return __hi.common_listing(inputs)
	if (locale === "ar") return __ar.common_listing(inputs)
	if (locale === "pt") return __pt.common_listing(inputs)
	if (locale === "de") return __de.common_listing(inputs)
	if (locale === "ja") return __ja.common_listing(inputs)
	if (locale === "ko") return __ko.common_listing(inputs)
	if (locale === "it") return __it.common_listing(inputs)
	if (locale === "tr") return __tr.common_listing(inputs)
	if (locale === "pl") return __pl.common_listing(inputs)
	if (locale === "uk") return __uk.common_listing(inputs)
	if (locale === "nl") return __nl.common_listing(inputs)
	if (locale === "vi") return __vi.common_listing(inputs)
	if (locale === "id") return __id.common_listing(inputs)
	if (locale === "ms") return __ms.common_listing(inputs)
	if (locale === "th") return __th.common_listing(inputs)
	if (locale === "fa") return __fa.common_listing(inputs)
	if (locale === "ur") return __ur.common_listing(inputs)
	if (locale === "bn") return __bn.common_listing(inputs)
	if (locale === "pa") return __pa.common_listing(inputs)
	if (locale === "sw") return __sw.common_listing(inputs)
	if (locale === "el") return __el.common_listing(inputs)
	if (locale === "cs") return __cs.common_listing(inputs)
	if (locale === "ro") return __ro.common_listing(inputs)
	if (locale === "hu") return __hu.common_listing(inputs)
	if (locale === "sv") return __sv.common_listing(inputs)
	if (locale === "he") return __he.common_listing(inputs)
	return __ru.common_listing(inputs)
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
* | "Job offer" |
*
* @param {Common_OfferInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_offer = /** @type {((inputs?: Common_OfferInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_OfferInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_offer(inputs)
	if (locale === "fr") return __fr.common_offer(inputs)
	if (locale === "es") return __es.common_offer(inputs)
	if (locale === "zh") return __zh.common_offer(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_offer(inputs)
	if (locale === "hi") return __hi.common_offer(inputs)
	if (locale === "ar") return __ar.common_offer(inputs)
	if (locale === "pt") return __pt.common_offer(inputs)
	if (locale === "de") return __de.common_offer(inputs)
	if (locale === "ja") return __ja.common_offer(inputs)
	if (locale === "ko") return __ko.common_offer(inputs)
	if (locale === "it") return __it.common_offer(inputs)
	if (locale === "tr") return __tr.common_offer(inputs)
	if (locale === "pl") return __pl.common_offer(inputs)
	if (locale === "uk") return __uk.common_offer(inputs)
	if (locale === "nl") return __nl.common_offer(inputs)
	if (locale === "vi") return __vi.common_offer(inputs)
	if (locale === "id") return __id.common_offer(inputs)
	if (locale === "ms") return __ms.common_offer(inputs)
	if (locale === "th") return __th.common_offer(inputs)
	if (locale === "fa") return __fa.common_offer(inputs)
	if (locale === "ur") return __ur.common_offer(inputs)
	if (locale === "bn") return __bn.common_offer(inputs)
	if (locale === "pa") return __pa.common_offer(inputs)
	if (locale === "sw") return __sw.common_offer(inputs)
	if (locale === "el") return __el.common_offer(inputs)
	if (locale === "cs") return __cs.common_offer(inputs)
	if (locale === "ro") return __ro.common_offer(inputs)
	if (locale === "hu") return __hu.common_offer(inputs)
	if (locale === "sv") return __sv.common_offer(inputs)
	if (locale === "he") return __he.common_offer(inputs)
	return __ru.common_offer(inputs)
});
/**
* | output |
* | --- |
* | "Online" |
*
* @param {Common_OnlineInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_online = /** @type {((inputs?: Common_OnlineInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_OnlineInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_online(inputs)
	if (locale === "fr") return __fr.common_online(inputs)
	if (locale === "es") return __es.common_online(inputs)
	if (locale === "zh") return __zh.common_online(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_online(inputs)
	if (locale === "hi") return __hi.common_online(inputs)
	if (locale === "ar") return __ar.common_online(inputs)
	if (locale === "pt") return __pt.common_online(inputs)
	if (locale === "de") return __de.common_online(inputs)
	if (locale === "ja") return __ja.common_online(inputs)
	if (locale === "ko") return __ko.common_online(inputs)
	if (locale === "it") return __it.common_online(inputs)
	if (locale === "tr") return __tr.common_online(inputs)
	if (locale === "pl") return __pl.common_online(inputs)
	if (locale === "uk") return __uk.common_online(inputs)
	if (locale === "nl") return __nl.common_online(inputs)
	if (locale === "vi") return __vi.common_online(inputs)
	if (locale === "id") return __id.common_online(inputs)
	if (locale === "ms") return __ms.common_online(inputs)
	if (locale === "th") return __th.common_online(inputs)
	if (locale === "fa") return __fa.common_online(inputs)
	if (locale === "ur") return __ur.common_online(inputs)
	if (locale === "bn") return __bn.common_online(inputs)
	if (locale === "pa") return __pa.common_online(inputs)
	if (locale === "sw") return __sw.common_online(inputs)
	if (locale === "el") return __el.common_online(inputs)
	if (locale === "cs") return __cs.common_online(inputs)
	if (locale === "ro") return __ro.common_online(inputs)
	if (locale === "hu") return __hu.common_online(inputs)
	if (locale === "sv") return __sv.common_online(inputs)
	if (locale === "he") return __he.common_online(inputs)
	return __ru.common_online(inputs)
});
/**
* | output |
* | --- |
* | "online" |
*
* @param {Common_Online_ShortInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_online_short = /** @type {((inputs?: Common_Online_ShortInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Online_ShortInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_online_short(inputs)
	if (locale === "fr") return __fr.common_online_short(inputs)
	if (locale === "es") return __es.common_online_short(inputs)
	if (locale === "zh") return __zh.common_online_short(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_online_short(inputs)
	if (locale === "hi") return __hi.common_online_short(inputs)
	if (locale === "ar") return __ar.common_online_short(inputs)
	if (locale === "pt") return __pt.common_online_short(inputs)
	if (locale === "de") return __de.common_online_short(inputs)
	if (locale === "ja") return __ja.common_online_short(inputs)
	if (locale === "ko") return __ko.common_online_short(inputs)
	if (locale === "it") return __it.common_online_short(inputs)
	if (locale === "tr") return __tr.common_online_short(inputs)
	if (locale === "pl") return __pl.common_online_short(inputs)
	if (locale === "uk") return __uk.common_online_short(inputs)
	if (locale === "nl") return __nl.common_online_short(inputs)
	if (locale === "vi") return __vi.common_online_short(inputs)
	if (locale === "id") return __id.common_online_short(inputs)
	if (locale === "ms") return __ms.common_online_short(inputs)
	if (locale === "th") return __th.common_online_short(inputs)
	if (locale === "fa") return __fa.common_online_short(inputs)
	if (locale === "ur") return __ur.common_online_short(inputs)
	if (locale === "bn") return __bn.common_online_short(inputs)
	if (locale === "pa") return __pa.common_online_short(inputs)
	if (locale === "sw") return __sw.common_online_short(inputs)
	if (locale === "el") return __el.common_online_short(inputs)
	if (locale === "cs") return __cs.common_online_short(inputs)
	if (locale === "ro") return __ro.common_online_short(inputs)
	if (locale === "hu") return __hu.common_online_short(inputs)
	if (locale === "sv") return __sv.common_online_short(inputs)
	if (locale === "he") return __he.common_online_short(inputs)
	return __ru.common_online_short(inputs)
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
* | "Premium" |
*
* @param {Common_PremiumInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_premium = /** @type {((inputs?: Common_PremiumInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_PremiumInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_premium(inputs)
	if (locale === "fr") return __fr.common_premium(inputs)
	if (locale === "es") return __es.common_premium(inputs)
	if (locale === "zh") return __zh.common_premium(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_premium(inputs)
	if (locale === "hi") return __hi.common_premium(inputs)
	if (locale === "ar") return __ar.common_premium(inputs)
	if (locale === "pt") return __pt.common_premium(inputs)
	if (locale === "de") return __de.common_premium(inputs)
	if (locale === "ja") return __ja.common_premium(inputs)
	if (locale === "ko") return __ko.common_premium(inputs)
	if (locale === "it") return __it.common_premium(inputs)
	if (locale === "tr") return __tr.common_premium(inputs)
	if (locale === "pl") return __pl.common_premium(inputs)
	if (locale === "uk") return __uk.common_premium(inputs)
	if (locale === "nl") return __nl.common_premium(inputs)
	if (locale === "vi") return __vi.common_premium(inputs)
	if (locale === "id") return __id.common_premium(inputs)
	if (locale === "ms") return __ms.common_premium(inputs)
	if (locale === "th") return __th.common_premium(inputs)
	if (locale === "fa") return __fa.common_premium(inputs)
	if (locale === "ur") return __ur.common_premium(inputs)
	if (locale === "bn") return __bn.common_premium(inputs)
	if (locale === "pa") return __pa.common_premium(inputs)
	if (locale === "sw") return __sw.common_premium(inputs)
	if (locale === "el") return __el.common_premium(inputs)
	if (locale === "cs") return __cs.common_premium(inputs)
	if (locale === "ro") return __ro.common_premium(inputs)
	if (locale === "hu") return __hu.common_premium(inputs)
	if (locale === "sv") return __sv.common_premium(inputs)
	if (locale === "he") return __he.common_premium(inputs)
	return __ru.common_premium(inputs)
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
* | "Rating {rating} · {votes}" |
*
* @param {Common_RatingInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_rating = /** @type {((inputs: Common_RatingInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_RatingInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_rating(inputs)
	if (locale === "fr") return __fr.common_rating(inputs)
	if (locale === "es") return __es.common_rating(inputs)
	if (locale === "zh") return __zh.common_rating(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_rating(inputs)
	if (locale === "hi") return __hi.common_rating(inputs)
	if (locale === "ar") return __ar.common_rating(inputs)
	if (locale === "pt") return __pt.common_rating(inputs)
	if (locale === "de") return __de.common_rating(inputs)
	if (locale === "ja") return __ja.common_rating(inputs)
	if (locale === "ko") return __ko.common_rating(inputs)
	if (locale === "it") return __it.common_rating(inputs)
	if (locale === "tr") return __tr.common_rating(inputs)
	if (locale === "pl") return __pl.common_rating(inputs)
	if (locale === "uk") return __uk.common_rating(inputs)
	if (locale === "nl") return __nl.common_rating(inputs)
	if (locale === "vi") return __vi.common_rating(inputs)
	if (locale === "id") return __id.common_rating(inputs)
	if (locale === "ms") return __ms.common_rating(inputs)
	if (locale === "th") return __th.common_rating(inputs)
	if (locale === "fa") return __fa.common_rating(inputs)
	if (locale === "ur") return __ur.common_rating(inputs)
	if (locale === "bn") return __bn.common_rating(inputs)
	if (locale === "pa") return __pa.common_rating(inputs)
	if (locale === "sw") return __sw.common_rating(inputs)
	if (locale === "el") return __el.common_rating(inputs)
	if (locale === "cs") return __cs.common_rating(inputs)
	if (locale === "ro") return __ro.common_rating(inputs)
	if (locale === "hu") return __hu.common_rating(inputs)
	if (locale === "sv") return __sv.common_rating(inputs)
	if (locale === "he") return __he.common_rating(inputs)
	return __ru.common_rating(inputs)
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
* | "Looking for work" |
*
* @param {Common_SeekerInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_seeker = /** @type {((inputs?: Common_SeekerInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_SeekerInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_seeker(inputs)
	if (locale === "fr") return __fr.common_seeker(inputs)
	if (locale === "es") return __es.common_seeker(inputs)
	if (locale === "zh") return __zh.common_seeker(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_seeker(inputs)
	if (locale === "hi") return __hi.common_seeker(inputs)
	if (locale === "ar") return __ar.common_seeker(inputs)
	if (locale === "pt") return __pt.common_seeker(inputs)
	if (locale === "de") return __de.common_seeker(inputs)
	if (locale === "ja") return __ja.common_seeker(inputs)
	if (locale === "ko") return __ko.common_seeker(inputs)
	if (locale === "it") return __it.common_seeker(inputs)
	if (locale === "tr") return __tr.common_seeker(inputs)
	if (locale === "pl") return __pl.common_seeker(inputs)
	if (locale === "uk") return __uk.common_seeker(inputs)
	if (locale === "nl") return __nl.common_seeker(inputs)
	if (locale === "vi") return __vi.common_seeker(inputs)
	if (locale === "id") return __id.common_seeker(inputs)
	if (locale === "ms") return __ms.common_seeker(inputs)
	if (locale === "th") return __th.common_seeker(inputs)
	if (locale === "fa") return __fa.common_seeker(inputs)
	if (locale === "ur") return __ur.common_seeker(inputs)
	if (locale === "bn") return __bn.common_seeker(inputs)
	if (locale === "pa") return __pa.common_seeker(inputs)
	if (locale === "sw") return __sw.common_seeker(inputs)
	if (locale === "el") return __el.common_seeker(inputs)
	if (locale === "cs") return __cs.common_seeker(inputs)
	if (locale === "ro") return __ro.common_seeker(inputs)
	if (locale === "hu") return __hu.common_seeker(inputs)
	if (locale === "sv") return __sv.common_seeker(inputs)
	if (locale === "he") return __he.common_seeker(inputs)
	return __ru.common_seeker(inputs)
});
/**
* | output |
* | --- |
* | "Share" |
*
* @param {Common_ShareInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_share = /** @type {((inputs?: Common_ShareInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_ShareInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_share(inputs)
	if (locale === "fr") return __fr.common_share(inputs)
	if (locale === "es") return __es.common_share(inputs)
	if (locale === "zh") return __zh.common_share(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_share(inputs)
	if (locale === "hi") return __hi.common_share(inputs)
	if (locale === "ar") return __ar.common_share(inputs)
	if (locale === "pt") return __pt.common_share(inputs)
	if (locale === "de") return __de.common_share(inputs)
	if (locale === "ja") return __ja.common_share(inputs)
	if (locale === "ko") return __ko.common_share(inputs)
	if (locale === "it") return __it.common_share(inputs)
	if (locale === "tr") return __tr.common_share(inputs)
	if (locale === "pl") return __pl.common_share(inputs)
	if (locale === "uk") return __uk.common_share(inputs)
	if (locale === "nl") return __nl.common_share(inputs)
	if (locale === "vi") return __vi.common_share(inputs)
	if (locale === "id") return __id.common_share(inputs)
	if (locale === "ms") return __ms.common_share(inputs)
	if (locale === "th") return __th.common_share(inputs)
	if (locale === "fa") return __fa.common_share(inputs)
	if (locale === "ur") return __ur.common_share(inputs)
	if (locale === "bn") return __bn.common_share(inputs)
	if (locale === "pa") return __pa.common_share(inputs)
	if (locale === "sw") return __sw.common_share(inputs)
	if (locale === "el") return __el.common_share(inputs)
	if (locale === "cs") return __cs.common_share(inputs)
	if (locale === "ro") return __ro.common_share(inputs)
	if (locale === "hu") return __hu.common_share(inputs)
	if (locale === "sv") return __sv.common_share(inputs)
	if (locale === "he") return __he.common_share(inputs)
	return __ru.common_share(inputs)
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
* | "Verified" |
*
* @param {Common_VerifiedInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_verified = /** @type {((inputs?: Common_VerifiedInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_VerifiedInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_verified(inputs)
	if (locale === "fr") return __fr.common_verified(inputs)
	if (locale === "es") return __es.common_verified(inputs)
	if (locale === "zh") return __zh.common_verified(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_verified(inputs)
	if (locale === "hi") return __hi.common_verified(inputs)
	if (locale === "ar") return __ar.common_verified(inputs)
	if (locale === "pt") return __pt.common_verified(inputs)
	if (locale === "de") return __de.common_verified(inputs)
	if (locale === "ja") return __ja.common_verified(inputs)
	if (locale === "ko") return __ko.common_verified(inputs)
	if (locale === "it") return __it.common_verified(inputs)
	if (locale === "tr") return __tr.common_verified(inputs)
	if (locale === "pl") return __pl.common_verified(inputs)
	if (locale === "uk") return __uk.common_verified(inputs)
	if (locale === "nl") return __nl.common_verified(inputs)
	if (locale === "vi") return __vi.common_verified(inputs)
	if (locale === "id") return __id.common_verified(inputs)
	if (locale === "ms") return __ms.common_verified(inputs)
	if (locale === "th") return __th.common_verified(inputs)
	if (locale === "fa") return __fa.common_verified(inputs)
	if (locale === "ur") return __ur.common_verified(inputs)
	if (locale === "bn") return __bn.common_verified(inputs)
	if (locale === "pa") return __pa.common_verified(inputs)
	if (locale === "sw") return __sw.common_verified(inputs)
	if (locale === "el") return __el.common_verified(inputs)
	if (locale === "cs") return __cs.common_verified(inputs)
	if (locale === "ro") return __ro.common_verified(inputs)
	if (locale === "hu") return __hu.common_verified(inputs)
	if (locale === "sv") return __sv.common_verified(inputs)
	if (locale === "he") return __he.common_verified(inputs)
	return __ru.common_verified(inputs)
});
/**
* | output |
* | --- |
* | "Recently active" |
*
* @param {Common_Was_RecentlyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_was_recently = /** @type {((inputs?: Common_Was_RecentlyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_Was_RecentlyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_was_recently(inputs)
	if (locale === "fr") return __fr.common_was_recently(inputs)
	if (locale === "es") return __es.common_was_recently(inputs)
	if (locale === "zh") return __zh.common_was_recently(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_was_recently(inputs)
	if (locale === "hi") return __hi.common_was_recently(inputs)
	if (locale === "ar") return __ar.common_was_recently(inputs)
	if (locale === "pt") return __pt.common_was_recently(inputs)
	if (locale === "de") return __de.common_was_recently(inputs)
	if (locale === "ja") return __ja.common_was_recently(inputs)
	if (locale === "ko") return __ko.common_was_recently(inputs)
	if (locale === "it") return __it.common_was_recently(inputs)
	if (locale === "tr") return __tr.common_was_recently(inputs)
	if (locale === "pl") return __pl.common_was_recently(inputs)
	if (locale === "uk") return __uk.common_was_recently(inputs)
	if (locale === "nl") return __nl.common_was_recently(inputs)
	if (locale === "vi") return __vi.common_was_recently(inputs)
	if (locale === "id") return __id.common_was_recently(inputs)
	if (locale === "ms") return __ms.common_was_recently(inputs)
	if (locale === "th") return __th.common_was_recently(inputs)
	if (locale === "fa") return __fa.common_was_recently(inputs)
	if (locale === "ur") return __ur.common_was_recently(inputs)
	if (locale === "bn") return __bn.common_was_recently(inputs)
	if (locale === "pa") return __pa.common_was_recently(inputs)
	if (locale === "sw") return __sw.common_was_recently(inputs)
	if (locale === "el") return __el.common_was_recently(inputs)
	if (locale === "cs") return __cs.common_was_recently(inputs)
	if (locale === "ro") return __ro.common_was_recently(inputs)
	if (locale === "hu") return __hu.common_was_recently(inputs)
	if (locale === "sv") return __sv.common_was_recently(inputs)
	if (locale === "he") return __he.common_was_recently(inputs)
	return __ru.common_was_recently(inputs)
});
/**
* | output |
* | --- |
* | "Jobs" |
*
* @param {Common_WorkInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_work = /** @type {((inputs?: Common_WorkInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_WorkInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_work(inputs)
	if (locale === "fr") return __fr.common_work(inputs)
	if (locale === "es") return __es.common_work(inputs)
	if (locale === "zh") return __zh.common_work(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_work(inputs)
	if (locale === "hi") return __hi.common_work(inputs)
	if (locale === "ar") return __ar.common_work(inputs)
	if (locale === "pt") return __pt.common_work(inputs)
	if (locale === "de") return __de.common_work(inputs)
	if (locale === "ja") return __ja.common_work(inputs)
	if (locale === "ko") return __ko.common_work(inputs)
	if (locale === "it") return __it.common_work(inputs)
	if (locale === "tr") return __tr.common_work(inputs)
	if (locale === "pl") return __pl.common_work(inputs)
	if (locale === "uk") return __uk.common_work(inputs)
	if (locale === "nl") return __nl.common_work(inputs)
	if (locale === "vi") return __vi.common_work(inputs)
	if (locale === "id") return __id.common_work(inputs)
	if (locale === "ms") return __ms.common_work(inputs)
	if (locale === "th") return __th.common_work(inputs)
	if (locale === "fa") return __fa.common_work(inputs)
	if (locale === "ur") return __ur.common_work(inputs)
	if (locale === "bn") return __bn.common_work(inputs)
	if (locale === "pa") return __pa.common_work(inputs)
	if (locale === "sw") return __sw.common_work(inputs)
	if (locale === "el") return __el.common_work(inputs)
	if (locale === "cs") return __cs.common_work(inputs)
	if (locale === "ro") return __ro.common_work(inputs)
	if (locale === "hu") return __hu.common_work(inputs)
	if (locale === "sv") return __sv.common_work(inputs)
	if (locale === "he") return __he.common_work(inputs)
	return __ru.common_work(inputs)
});
/**
* | output |
* | --- |
* | "Workers" |
*
* @param {Common_WorkersInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_workers = /** @type {((inputs?: Common_WorkersInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_WorkersInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_workers(inputs)
	if (locale === "fr") return __fr.common_workers(inputs)
	if (locale === "es") return __es.common_workers(inputs)
	if (locale === "zh") return __zh.common_workers(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_workers(inputs)
	if (locale === "hi") return __hi.common_workers(inputs)
	if (locale === "ar") return __ar.common_workers(inputs)
	if (locale === "pt") return __pt.common_workers(inputs)
	if (locale === "de") return __de.common_workers(inputs)
	if (locale === "ja") return __ja.common_workers(inputs)
	if (locale === "ko") return __ko.common_workers(inputs)
	if (locale === "it") return __it.common_workers(inputs)
	if (locale === "tr") return __tr.common_workers(inputs)
	if (locale === "pl") return __pl.common_workers(inputs)
	if (locale === "uk") return __uk.common_workers(inputs)
	if (locale === "nl") return __nl.common_workers(inputs)
	if (locale === "vi") return __vi.common_workers(inputs)
	if (locale === "id") return __id.common_workers(inputs)
	if (locale === "ms") return __ms.common_workers(inputs)
	if (locale === "th") return __th.common_workers(inputs)
	if (locale === "fa") return __fa.common_workers(inputs)
	if (locale === "ur") return __ur.common_workers(inputs)
	if (locale === "bn") return __bn.common_workers(inputs)
	if (locale === "pa") return __pa.common_workers(inputs)
	if (locale === "sw") return __sw.common_workers(inputs)
	if (locale === "el") return __el.common_workers(inputs)
	if (locale === "cs") return __cs.common_workers(inputs)
	if (locale === "ro") return __ro.common_workers(inputs)
	if (locale === "hu") return __hu.common_workers(inputs)
	if (locale === "sv") return __sv.common_workers(inputs)
	if (locale === "he") return __he.common_workers(inputs)
	return __ru.common_workers(inputs)
});
/**
* | output |
* | --- |
* | "Message" |
*
* @param {Common_WriteInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const common_write = /** @type {((inputs?: Common_WriteInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Common_WriteInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.common_write(inputs)
	if (locale === "fr") return __fr.common_write(inputs)
	if (locale === "es") return __es.common_write(inputs)
	if (locale === "zh") return __zh.common_write(inputs)
	if (locale === "zh-TW") return __zh_tw2.common_write(inputs)
	if (locale === "hi") return __hi.common_write(inputs)
	if (locale === "ar") return __ar.common_write(inputs)
	if (locale === "pt") return __pt.common_write(inputs)
	if (locale === "de") return __de.common_write(inputs)
	if (locale === "ja") return __ja.common_write(inputs)
	if (locale === "ko") return __ko.common_write(inputs)
	if (locale === "it") return __it.common_write(inputs)
	if (locale === "tr") return __tr.common_write(inputs)
	if (locale === "pl") return __pl.common_write(inputs)
	if (locale === "uk") return __uk.common_write(inputs)
	if (locale === "nl") return __nl.common_write(inputs)
	if (locale === "vi") return __vi.common_write(inputs)
	if (locale === "id") return __id.common_write(inputs)
	if (locale === "ms") return __ms.common_write(inputs)
	if (locale === "th") return __th.common_write(inputs)
	if (locale === "fa") return __fa.common_write(inputs)
	if (locale === "ur") return __ur.common_write(inputs)
	if (locale === "bn") return __bn.common_write(inputs)
	if (locale === "pa") return __pa.common_write(inputs)
	if (locale === "sw") return __sw.common_write(inputs)
	if (locale === "el") return __el.common_write(inputs)
	if (locale === "cs") return __cs.common_write(inputs)
	if (locale === "ro") return __ro.common_write(inputs)
	if (locale === "hu") return __hu.common_write(inputs)
	if (locale === "sv") return __sv.common_write(inputs)
	if (locale === "he") return __he.common_write(inputs)
	return __ru.common_write(inputs)
});
/**
* | output |
* | --- |
* | "Nothing found. Press Enter for full search." |
*
* @param {Explore_EmptyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const explore_empty = /** @type {((inputs?: Explore_EmptyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Explore_EmptyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.explore_empty(inputs)
	if (locale === "fr") return __fr.explore_empty(inputs)
	if (locale === "es") return __es.explore_empty(inputs)
	if (locale === "zh") return __zh.explore_empty(inputs)
	if (locale === "zh-TW") return __zh_tw2.explore_empty(inputs)
	if (locale === "hi") return __hi.explore_empty(inputs)
	if (locale === "ar") return __ar.explore_empty(inputs)
	if (locale === "pt") return __pt.explore_empty(inputs)
	if (locale === "de") return __de.explore_empty(inputs)
	if (locale === "ja") return __ja.explore_empty(inputs)
	if (locale === "ko") return __ko.explore_empty(inputs)
	if (locale === "it") return __it.explore_empty(inputs)
	if (locale === "tr") return __tr.explore_empty(inputs)
	if (locale === "pl") return __pl.explore_empty(inputs)
	if (locale === "uk") return __uk.explore_empty(inputs)
	if (locale === "nl") return __nl.explore_empty(inputs)
	if (locale === "vi") return __vi.explore_empty(inputs)
	if (locale === "id") return __id.explore_empty(inputs)
	if (locale === "ms") return __ms.explore_empty(inputs)
	if (locale === "th") return __th.explore_empty(inputs)
	if (locale === "fa") return __fa.explore_empty(inputs)
	if (locale === "ur") return __ur.explore_empty(inputs)
	if (locale === "bn") return __bn.explore_empty(inputs)
	if (locale === "pa") return __pa.explore_empty(inputs)
	if (locale === "sw") return __sw.explore_empty(inputs)
	if (locale === "el") return __el.explore_empty(inputs)
	if (locale === "cs") return __cs.explore_empty(inputs)
	if (locale === "ro") return __ro.explore_empty(inputs)
	if (locale === "hu") return __hu.explore_empty(inputs)
	if (locale === "sv") return __sv.explore_empty(inputs)
	if (locale === "he") return __he.explore_empty(inputs)
	return __ru.explore_empty(inputs)
});
/**
* | output |
* | --- |
* | "Biz" |
*
* @param {Explore_Icon_BizInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const explore_icon_biz = /** @type {((inputs?: Explore_Icon_BizInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Explore_Icon_BizInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.explore_icon_biz(inputs)
	if (locale === "fr") return __fr.explore_icon_biz(inputs)
	if (locale === "es") return __es.explore_icon_biz(inputs)
	if (locale === "zh") return __zh.explore_icon_biz(inputs)
	if (locale === "zh-TW") return __zh_tw2.explore_icon_biz(inputs)
	if (locale === "hi") return __hi.explore_icon_biz(inputs)
	if (locale === "ar") return __ar.explore_icon_biz(inputs)
	if (locale === "pt") return __pt.explore_icon_biz(inputs)
	if (locale === "de") return __de.explore_icon_biz(inputs)
	if (locale === "ja") return __ja.explore_icon_biz(inputs)
	if (locale === "ko") return __ko.explore_icon_biz(inputs)
	if (locale === "it") return __it.explore_icon_biz(inputs)
	if (locale === "tr") return __tr.explore_icon_biz(inputs)
	if (locale === "pl") return __pl.explore_icon_biz(inputs)
	if (locale === "uk") return __uk.explore_icon_biz(inputs)
	if (locale === "nl") return __nl.explore_icon_biz(inputs)
	if (locale === "vi") return __vi.explore_icon_biz(inputs)
	if (locale === "id") return __id.explore_icon_biz(inputs)
	if (locale === "ms") return __ms.explore_icon_biz(inputs)
	if (locale === "th") return __th.explore_icon_biz(inputs)
	if (locale === "fa") return __fa.explore_icon_biz(inputs)
	if (locale === "ur") return __ur.explore_icon_biz(inputs)
	if (locale === "bn") return __bn.explore_icon_biz(inputs)
	if (locale === "pa") return __pa.explore_icon_biz(inputs)
	if (locale === "sw") return __sw.explore_icon_biz(inputs)
	if (locale === "el") return __el.explore_icon_biz(inputs)
	if (locale === "cs") return __cs.explore_icon_biz(inputs)
	if (locale === "ro") return __ro.explore_icon_biz(inputs)
	if (locale === "hu") return __hu.explore_icon_biz(inputs)
	if (locale === "sv") return __sv.explore_icon_biz(inputs)
	if (locale === "he") return __he.explore_icon_biz(inputs)
	return __ru.explore_icon_biz(inputs)
});
/**
* | output |
* | --- |
* | "City" |
*
* @param {Explore_Icon_CityInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const explore_icon_city = /** @type {((inputs?: Explore_Icon_CityInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Explore_Icon_CityInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.explore_icon_city(inputs)
	if (locale === "fr") return __fr.explore_icon_city(inputs)
	if (locale === "es") return __es.explore_icon_city(inputs)
	if (locale === "zh") return __zh.explore_icon_city(inputs)
	if (locale === "zh-TW") return __zh_tw2.explore_icon_city(inputs)
	if (locale === "hi") return __hi.explore_icon_city(inputs)
	if (locale === "ar") return __ar.explore_icon_city(inputs)
	if (locale === "pt") return __pt.explore_icon_city(inputs)
	if (locale === "de") return __de.explore_icon_city(inputs)
	if (locale === "ja") return __ja.explore_icon_city(inputs)
	if (locale === "ko") return __ko.explore_icon_city(inputs)
	if (locale === "it") return __it.explore_icon_city(inputs)
	if (locale === "tr") return __tr.explore_icon_city(inputs)
	if (locale === "pl") return __pl.explore_icon_city(inputs)
	if (locale === "uk") return __uk.explore_icon_city(inputs)
	if (locale === "nl") return __nl.explore_icon_city(inputs)
	if (locale === "vi") return __vi.explore_icon_city(inputs)
	if (locale === "id") return __id.explore_icon_city(inputs)
	if (locale === "ms") return __ms.explore_icon_city(inputs)
	if (locale === "th") return __th.explore_icon_city(inputs)
	if (locale === "fa") return __fa.explore_icon_city(inputs)
	if (locale === "ur") return __ur.explore_icon_city(inputs)
	if (locale === "bn") return __bn.explore_icon_city(inputs)
	if (locale === "pa") return __pa.explore_icon_city(inputs)
	if (locale === "sw") return __sw.explore_icon_city(inputs)
	if (locale === "el") return __el.explore_icon_city(inputs)
	if (locale === "cs") return __cs.explore_icon_city(inputs)
	if (locale === "ro") return __ro.explore_icon_city(inputs)
	if (locale === "hu") return __hu.explore_icon_city(inputs)
	if (locale === "sv") return __sv.explore_icon_city(inputs)
	if (locale === "he") return __he.explore_icon_city(inputs)
	return __ru.explore_icon_city(inputs)
});
/**
* | output |
* | --- |
* | "Ctry" |
*
* @param {Explore_Icon_CountryInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const explore_icon_country = /** @type {((inputs?: Explore_Icon_CountryInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Explore_Icon_CountryInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.explore_icon_country(inputs)
	if (locale === "fr") return __fr.explore_icon_country(inputs)
	if (locale === "es") return __es.explore_icon_country(inputs)
	if (locale === "zh") return __zh.explore_icon_country(inputs)
	if (locale === "zh-TW") return __zh_tw2.explore_icon_country(inputs)
	if (locale === "hi") return __hi.explore_icon_country(inputs)
	if (locale === "ar") return __ar.explore_icon_country(inputs)
	if (locale === "pt") return __pt.explore_icon_country(inputs)
	if (locale === "de") return __de.explore_icon_country(inputs)
	if (locale === "ja") return __ja.explore_icon_country(inputs)
	if (locale === "ko") return __ko.explore_icon_country(inputs)
	if (locale === "it") return __it.explore_icon_country(inputs)
	if (locale === "tr") return __tr.explore_icon_country(inputs)
	if (locale === "pl") return __pl.explore_icon_country(inputs)
	if (locale === "uk") return __uk.explore_icon_country(inputs)
	if (locale === "nl") return __nl.explore_icon_country(inputs)
	if (locale === "vi") return __vi.explore_icon_country(inputs)
	if (locale === "id") return __id.explore_icon_country(inputs)
	if (locale === "ms") return __ms.explore_icon_country(inputs)
	if (locale === "th") return __th.explore_icon_country(inputs)
	if (locale === "fa") return __fa.explore_icon_country(inputs)
	if (locale === "ur") return __ur.explore_icon_country(inputs)
	if (locale === "bn") return __bn.explore_icon_country(inputs)
	if (locale === "pa") return __pa.explore_icon_country(inputs)
	if (locale === "sw") return __sw.explore_icon_country(inputs)
	if (locale === "el") return __el.explore_icon_country(inputs)
	if (locale === "cs") return __cs.explore_icon_country(inputs)
	if (locale === "ro") return __ro.explore_icon_country(inputs)
	if (locale === "hu") return __hu.explore_icon_country(inputs)
	if (locale === "sv") return __sv.explore_icon_country(inputs)
	if (locale === "he") return __he.explore_icon_country(inputs)
	return __ru.explore_icon_country(inputs)
});
/**
* | output |
* | --- |
* | "Ppl" |
*
* @param {Explore_Icon_PeopleInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const explore_icon_people = /** @type {((inputs?: Explore_Icon_PeopleInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Explore_Icon_PeopleInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.explore_icon_people(inputs)
	if (locale === "fr") return __fr.explore_icon_people(inputs)
	if (locale === "es") return __es.explore_icon_people(inputs)
	if (locale === "zh") return __zh.explore_icon_people(inputs)
	if (locale === "zh-TW") return __zh_tw2.explore_icon_people(inputs)
	if (locale === "hi") return __hi.explore_icon_people(inputs)
	if (locale === "ar") return __ar.explore_icon_people(inputs)
	if (locale === "pt") return __pt.explore_icon_people(inputs)
	if (locale === "de") return __de.explore_icon_people(inputs)
	if (locale === "ja") return __ja.explore_icon_people(inputs)
	if (locale === "ko") return __ko.explore_icon_people(inputs)
	if (locale === "it") return __it.explore_icon_people(inputs)
	if (locale === "tr") return __tr.explore_icon_people(inputs)
	if (locale === "pl") return __pl.explore_icon_people(inputs)
	if (locale === "uk") return __uk.explore_icon_people(inputs)
	if (locale === "nl") return __nl.explore_icon_people(inputs)
	if (locale === "vi") return __vi.explore_icon_people(inputs)
	if (locale === "id") return __id.explore_icon_people(inputs)
	if (locale === "ms") return __ms.explore_icon_people(inputs)
	if (locale === "th") return __th.explore_icon_people(inputs)
	if (locale === "fa") return __fa.explore_icon_people(inputs)
	if (locale === "ur") return __ur.explore_icon_people(inputs)
	if (locale === "bn") return __bn.explore_icon_people(inputs)
	if (locale === "pa") return __pa.explore_icon_people(inputs)
	if (locale === "sw") return __sw.explore_icon_people(inputs)
	if (locale === "el") return __el.explore_icon_people(inputs)
	if (locale === "cs") return __cs.explore_icon_people(inputs)
	if (locale === "ro") return __ro.explore_icon_people(inputs)
	if (locale === "hu") return __hu.explore_icon_people(inputs)
	if (locale === "sv") return __sv.explore_icon_people(inputs)
	if (locale === "he") return __he.explore_icon_people(inputs)
	return __ru.explore_icon_people(inputs)
});
/**
* | output |
* | --- |
* | "Pro" |
*
* @param {Explore_Icon_ProInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const explore_icon_pro = /** @type {((inputs?: Explore_Icon_ProInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Explore_Icon_ProInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.explore_icon_pro(inputs)
	if (locale === "fr") return __fr.explore_icon_pro(inputs)
	if (locale === "es") return __es.explore_icon_pro(inputs)
	if (locale === "zh") return __zh.explore_icon_pro(inputs)
	if (locale === "zh-TW") return __zh_tw2.explore_icon_pro(inputs)
	if (locale === "hi") return __hi.explore_icon_pro(inputs)
	if (locale === "ar") return __ar.explore_icon_pro(inputs)
	if (locale === "pt") return __pt.explore_icon_pro(inputs)
	if (locale === "de") return __de.explore_icon_pro(inputs)
	if (locale === "ja") return __ja.explore_icon_pro(inputs)
	if (locale === "ko") return __ko.explore_icon_pro(inputs)
	if (locale === "it") return __it.explore_icon_pro(inputs)
	if (locale === "tr") return __tr.explore_icon_pro(inputs)
	if (locale === "pl") return __pl.explore_icon_pro(inputs)
	if (locale === "uk") return __uk.explore_icon_pro(inputs)
	if (locale === "nl") return __nl.explore_icon_pro(inputs)
	if (locale === "vi") return __vi.explore_icon_pro(inputs)
	if (locale === "id") return __id.explore_icon_pro(inputs)
	if (locale === "ms") return __ms.explore_icon_pro(inputs)
	if (locale === "th") return __th.explore_icon_pro(inputs)
	if (locale === "fa") return __fa.explore_icon_pro(inputs)
	if (locale === "ur") return __ur.explore_icon_pro(inputs)
	if (locale === "bn") return __bn.explore_icon_pro(inputs)
	if (locale === "pa") return __pa.explore_icon_pro(inputs)
	if (locale === "sw") return __sw.explore_icon_pro(inputs)
	if (locale === "el") return __el.explore_icon_pro(inputs)
	if (locale === "cs") return __cs.explore_icon_pro(inputs)
	if (locale === "ro") return __ro.explore_icon_pro(inputs)
	if (locale === "hu") return __hu.explore_icon_pro(inputs)
	if (locale === "sv") return __sv.explore_icon_pro(inputs)
	if (locale === "he") return __he.explore_icon_pro(inputs)
	return __ru.explore_icon_pro(inputs)
});
/**
* | output |
* | --- |
* | "Job" |
*
* @param {Explore_Icon_WorkInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const explore_icon_work = /** @type {((inputs?: Explore_Icon_WorkInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Explore_Icon_WorkInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.explore_icon_work(inputs)
	if (locale === "fr") return __fr.explore_icon_work(inputs)
	if (locale === "es") return __es.explore_icon_work(inputs)
	if (locale === "zh") return __zh.explore_icon_work(inputs)
	if (locale === "zh-TW") return __zh_tw2.explore_icon_work(inputs)
	if (locale === "hi") return __hi.explore_icon_work(inputs)
	if (locale === "ar") return __ar.explore_icon_work(inputs)
	if (locale === "pt") return __pt.explore_icon_work(inputs)
	if (locale === "de") return __de.explore_icon_work(inputs)
	if (locale === "ja") return __ja.explore_icon_work(inputs)
	if (locale === "ko") return __ko.explore_icon_work(inputs)
	if (locale === "it") return __it.explore_icon_work(inputs)
	if (locale === "tr") return __tr.explore_icon_work(inputs)
	if (locale === "pl") return __pl.explore_icon_work(inputs)
	if (locale === "uk") return __uk.explore_icon_work(inputs)
	if (locale === "nl") return __nl.explore_icon_work(inputs)
	if (locale === "vi") return __vi.explore_icon_work(inputs)
	if (locale === "id") return __id.explore_icon_work(inputs)
	if (locale === "ms") return __ms.explore_icon_work(inputs)
	if (locale === "th") return __th.explore_icon_work(inputs)
	if (locale === "fa") return __fa.explore_icon_work(inputs)
	if (locale === "ur") return __ur.explore_icon_work(inputs)
	if (locale === "bn") return __bn.explore_icon_work(inputs)
	if (locale === "pa") return __pa.explore_icon_work(inputs)
	if (locale === "sw") return __sw.explore_icon_work(inputs)
	if (locale === "el") return __el.explore_icon_work(inputs)
	if (locale === "cs") return __cs.explore_icon_work(inputs)
	if (locale === "ro") return __ro.explore_icon_work(inputs)
	if (locale === "hu") return __hu.explore_icon_work(inputs)
	if (locale === "sv") return __sv.explore_icon_work(inputs)
	if (locale === "he") return __he.explore_icon_work(inputs)
	return __ru.explore_icon_work(inputs)
});
/**
* | output |
* | --- |
* | "World" |
*
* @param {Explore_Icon_WorldInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const explore_icon_world = /** @type {((inputs?: Explore_Icon_WorldInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Explore_Icon_WorldInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.explore_icon_world(inputs)
	if (locale === "fr") return __fr.explore_icon_world(inputs)
	if (locale === "es") return __es.explore_icon_world(inputs)
	if (locale === "zh") return __zh.explore_icon_world(inputs)
	if (locale === "zh-TW") return __zh_tw2.explore_icon_world(inputs)
	if (locale === "hi") return __hi.explore_icon_world(inputs)
	if (locale === "ar") return __ar.explore_icon_world(inputs)
	if (locale === "pt") return __pt.explore_icon_world(inputs)
	if (locale === "de") return __de.explore_icon_world(inputs)
	if (locale === "ja") return __ja.explore_icon_world(inputs)
	if (locale === "ko") return __ko.explore_icon_world(inputs)
	if (locale === "it") return __it.explore_icon_world(inputs)
	if (locale === "tr") return __tr.explore_icon_world(inputs)
	if (locale === "pl") return __pl.explore_icon_world(inputs)
	if (locale === "uk") return __uk.explore_icon_world(inputs)
	if (locale === "nl") return __nl.explore_icon_world(inputs)
	if (locale === "vi") return __vi.explore_icon_world(inputs)
	if (locale === "id") return __id.explore_icon_world(inputs)
	if (locale === "ms") return __ms.explore_icon_world(inputs)
	if (locale === "th") return __th.explore_icon_world(inputs)
	if (locale === "fa") return __fa.explore_icon_world(inputs)
	if (locale === "ur") return __ur.explore_icon_world(inputs)
	if (locale === "bn") return __bn.explore_icon_world(inputs)
	if (locale === "pa") return __pa.explore_icon_world(inputs)
	if (locale === "sw") return __sw.explore_icon_world(inputs)
	if (locale === "el") return __el.explore_icon_world(inputs)
	if (locale === "cs") return __cs.explore_icon_world(inputs)
	if (locale === "ro") return __ro.explore_icon_world(inputs)
	if (locale === "hu") return __hu.explore_icon_world(inputs)
	if (locale === "sv") return __sv.explore_icon_world(inputs)
	if (locale === "he") return __he.explore_icon_world(inputs)
	return __ru.explore_icon_world(inputs)
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
* | "Open a member’s profile to start a chat, or create a group." |
*
* @param {Inbox_Empty_BodyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const inbox_empty_body = /** @type {((inputs?: Inbox_Empty_BodyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inbox_Empty_BodyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.inbox_empty_body(inputs)
	if (locale === "fr") return __fr.inbox_empty_body(inputs)
	if (locale === "es") return __es.inbox_empty_body(inputs)
	if (locale === "zh") return __zh.inbox_empty_body(inputs)
	if (locale === "zh-TW") return __zh_tw2.inbox_empty_body(inputs)
	if (locale === "hi") return __hi.inbox_empty_body(inputs)
	if (locale === "ar") return __ar.inbox_empty_body(inputs)
	if (locale === "pt") return __pt.inbox_empty_body(inputs)
	if (locale === "de") return __de.inbox_empty_body(inputs)
	if (locale === "ja") return __ja.inbox_empty_body(inputs)
	if (locale === "ko") return __ko.inbox_empty_body(inputs)
	if (locale === "it") return __it.inbox_empty_body(inputs)
	if (locale === "tr") return __tr.inbox_empty_body(inputs)
	if (locale === "pl") return __pl.inbox_empty_body(inputs)
	if (locale === "uk") return __uk.inbox_empty_body(inputs)
	if (locale === "nl") return __nl.inbox_empty_body(inputs)
	if (locale === "vi") return __vi.inbox_empty_body(inputs)
	if (locale === "id") return __id.inbox_empty_body(inputs)
	if (locale === "ms") return __ms.inbox_empty_body(inputs)
	if (locale === "th") return __th.inbox_empty_body(inputs)
	if (locale === "fa") return __fa.inbox_empty_body(inputs)
	if (locale === "ur") return __ur.inbox_empty_body(inputs)
	if (locale === "bn") return __bn.inbox_empty_body(inputs)
	if (locale === "pa") return __pa.inbox_empty_body(inputs)
	if (locale === "sw") return __sw.inbox_empty_body(inputs)
	if (locale === "el") return __el.inbox_empty_body(inputs)
	if (locale === "cs") return __cs.inbox_empty_body(inputs)
	if (locale === "ro") return __ro.inbox_empty_body(inputs)
	if (locale === "hu") return __hu.inbox_empty_body(inputs)
	if (locale === "sv") return __sv.inbox_empty_body(inputs)
	if (locale === "he") return __he.inbox_empty_body(inputs)
	return __ru.inbox_empty_body(inputs)
});
/**
* | output |
* | --- |
* | "No chats" |
*
* @param {Inbox_Empty_TitleInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const inbox_empty_title = /** @type {((inputs?: Inbox_Empty_TitleInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inbox_Empty_TitleInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.inbox_empty_title(inputs)
	if (locale === "fr") return __fr.inbox_empty_title(inputs)
	if (locale === "es") return __es.inbox_empty_title(inputs)
	if (locale === "zh") return __zh.inbox_empty_title(inputs)
	if (locale === "zh-TW") return __zh_tw2.inbox_empty_title(inputs)
	if (locale === "hi") return __hi.inbox_empty_title(inputs)
	if (locale === "ar") return __ar.inbox_empty_title(inputs)
	if (locale === "pt") return __pt.inbox_empty_title(inputs)
	if (locale === "de") return __de.inbox_empty_title(inputs)
	if (locale === "ja") return __ja.inbox_empty_title(inputs)
	if (locale === "ko") return __ko.inbox_empty_title(inputs)
	if (locale === "it") return __it.inbox_empty_title(inputs)
	if (locale === "tr") return __tr.inbox_empty_title(inputs)
	if (locale === "pl") return __pl.inbox_empty_title(inputs)
	if (locale === "uk") return __uk.inbox_empty_title(inputs)
	if (locale === "nl") return __nl.inbox_empty_title(inputs)
	if (locale === "vi") return __vi.inbox_empty_title(inputs)
	if (locale === "id") return __id.inbox_empty_title(inputs)
	if (locale === "ms") return __ms.inbox_empty_title(inputs)
	if (locale === "th") return __th.inbox_empty_title(inputs)
	if (locale === "fa") return __fa.inbox_empty_title(inputs)
	if (locale === "ur") return __ur.inbox_empty_title(inputs)
	if (locale === "bn") return __bn.inbox_empty_title(inputs)
	if (locale === "pa") return __pa.inbox_empty_title(inputs)
	if (locale === "sw") return __sw.inbox_empty_title(inputs)
	if (locale === "el") return __el.inbox_empty_title(inputs)
	if (locale === "cs") return __cs.inbox_empty_title(inputs)
	if (locale === "ro") return __ro.inbox_empty_title(inputs)
	if (locale === "hu") return __hu.inbox_empty_title(inputs)
	if (locale === "sv") return __sv.inbox_empty_title(inputs)
	if (locale === "he") return __he.inbox_empty_title(inputs)
	return __ru.inbox_empty_title(inputs)
});
/**
* | output |
* | --- |
* | "Find people" |
*
* @param {Inbox_Find_PeopleInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const inbox_find_people = /** @type {((inputs?: Inbox_Find_PeopleInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inbox_Find_PeopleInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.inbox_find_people(inputs)
	if (locale === "fr") return __fr.inbox_find_people(inputs)
	if (locale === "es") return __es.inbox_find_people(inputs)
	if (locale === "zh") return __zh.inbox_find_people(inputs)
	if (locale === "zh-TW") return __zh_tw2.inbox_find_people(inputs)
	if (locale === "hi") return __hi.inbox_find_people(inputs)
	if (locale === "ar") return __ar.inbox_find_people(inputs)
	if (locale === "pt") return __pt.inbox_find_people(inputs)
	if (locale === "de") return __de.inbox_find_people(inputs)
	if (locale === "ja") return __ja.inbox_find_people(inputs)
	if (locale === "ko") return __ko.inbox_find_people(inputs)
	if (locale === "it") return __it.inbox_find_people(inputs)
	if (locale === "tr") return __tr.inbox_find_people(inputs)
	if (locale === "pl") return __pl.inbox_find_people(inputs)
	if (locale === "uk") return __uk.inbox_find_people(inputs)
	if (locale === "nl") return __nl.inbox_find_people(inputs)
	if (locale === "vi") return __vi.inbox_find_people(inputs)
	if (locale === "id") return __id.inbox_find_people(inputs)
	if (locale === "ms") return __ms.inbox_find_people(inputs)
	if (locale === "th") return __th.inbox_find_people(inputs)
	if (locale === "fa") return __fa.inbox_find_people(inputs)
	if (locale === "ur") return __ur.inbox_find_people(inputs)
	if (locale === "bn") return __bn.inbox_find_people(inputs)
	if (locale === "pa") return __pa.inbox_find_people(inputs)
	if (locale === "sw") return __sw.inbox_find_people(inputs)
	if (locale === "el") return __el.inbox_find_people(inputs)
	if (locale === "cs") return __cs.inbox_find_people(inputs)
	if (locale === "ro") return __ro.inbox_find_people(inputs)
	if (locale === "hu") return __hu.inbox_find_people(inputs)
	if (locale === "sv") return __sv.inbox_find_people(inputs)
	if (locale === "he") return __he.inbox_find_people(inputs)
	return __ru.inbox_find_people(inputs)
});
/**
* | output |
* | --- |
* | "{n} unread" |
*
* @param {Inbox_Unread_ManyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const inbox_unread_many = /** @type {((inputs: Inbox_Unread_ManyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inbox_Unread_ManyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.inbox_unread_many(inputs)
	if (locale === "fr") return __fr.inbox_unread_many(inputs)
	if (locale === "es") return __es.inbox_unread_many(inputs)
	if (locale === "zh") return __zh.inbox_unread_many(inputs)
	if (locale === "zh-TW") return __zh_tw2.inbox_unread_many(inputs)
	if (locale === "hi") return __hi.inbox_unread_many(inputs)
	if (locale === "ar") return __ar.inbox_unread_many(inputs)
	if (locale === "pt") return __pt.inbox_unread_many(inputs)
	if (locale === "de") return __de.inbox_unread_many(inputs)
	if (locale === "ja") return __ja.inbox_unread_many(inputs)
	if (locale === "ko") return __ko.inbox_unread_many(inputs)
	if (locale === "it") return __it.inbox_unread_many(inputs)
	if (locale === "tr") return __tr.inbox_unread_many(inputs)
	if (locale === "pl") return __pl.inbox_unread_many(inputs)
	if (locale === "uk") return __uk.inbox_unread_many(inputs)
	if (locale === "nl") return __nl.inbox_unread_many(inputs)
	if (locale === "vi") return __vi.inbox_unread_many(inputs)
	if (locale === "id") return __id.inbox_unread_many(inputs)
	if (locale === "ms") return __ms.inbox_unread_many(inputs)
	if (locale === "th") return __th.inbox_unread_many(inputs)
	if (locale === "fa") return __fa.inbox_unread_many(inputs)
	if (locale === "ur") return __ur.inbox_unread_many(inputs)
	if (locale === "bn") return __bn.inbox_unread_many(inputs)
	if (locale === "pa") return __pa.inbox_unread_many(inputs)
	if (locale === "sw") return __sw.inbox_unread_many(inputs)
	if (locale === "el") return __el.inbox_unread_many(inputs)
	if (locale === "cs") return __cs.inbox_unread_many(inputs)
	if (locale === "ro") return __ro.inbox_unread_many(inputs)
	if (locale === "hu") return __hu.inbox_unread_many(inputs)
	if (locale === "sv") return __sv.inbox_unread_many(inputs)
	if (locale === "he") return __he.inbox_unread_many(inputs)
	return __ru.inbox_unread_many(inputs)
});
/**
* | output |
* | --- |
* | "{n} unread" |
*
* @param {Inbox_Unread_OneInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const inbox_unread_one = /** @type {((inputs: Inbox_Unread_OneInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Inbox_Unread_OneInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.inbox_unread_one(inputs)
	if (locale === "fr") return __fr.inbox_unread_one(inputs)
	if (locale === "es") return __es.inbox_unread_one(inputs)
	if (locale === "zh") return __zh.inbox_unread_one(inputs)
	if (locale === "zh-TW") return __zh_tw2.inbox_unread_one(inputs)
	if (locale === "hi") return __hi.inbox_unread_one(inputs)
	if (locale === "ar") return __ar.inbox_unread_one(inputs)
	if (locale === "pt") return __pt.inbox_unread_one(inputs)
	if (locale === "de") return __de.inbox_unread_one(inputs)
	if (locale === "ja") return __ja.inbox_unread_one(inputs)
	if (locale === "ko") return __ko.inbox_unread_one(inputs)
	if (locale === "it") return __it.inbox_unread_one(inputs)
	if (locale === "tr") return __tr.inbox_unread_one(inputs)
	if (locale === "pl") return __pl.inbox_unread_one(inputs)
	if (locale === "uk") return __uk.inbox_unread_one(inputs)
	if (locale === "nl") return __nl.inbox_unread_one(inputs)
	if (locale === "vi") return __vi.inbox_unread_one(inputs)
	if (locale === "id") return __id.inbox_unread_one(inputs)
	if (locale === "ms") return __ms.inbox_unread_one(inputs)
	if (locale === "th") return __th.inbox_unread_one(inputs)
	if (locale === "fa") return __fa.inbox_unread_one(inputs)
	if (locale === "ur") return __ur.inbox_unread_one(inputs)
	if (locale === "bn") return __bn.inbox_unread_one(inputs)
	if (locale === "pa") return __pa.inbox_unread_one(inputs)
	if (locale === "sw") return __sw.inbox_unread_one(inputs)
	if (locale === "el") return __el.inbox_unread_one(inputs)
	if (locale === "cs") return __cs.inbox_unread_one(inputs)
	if (locale === "ro") return __ro.inbox_unread_one(inputs)
	if (locale === "hu") return __hu.inbox_unread_one(inputs)
	if (locale === "sv") return __sv.inbox_unread_one(inputs)
	if (locale === "he") return __he.inbox_unread_one(inputs)
	return __ru.inbox_unread_one(inputs)
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
* | "All continents" |
*
* @param {Map_All_ContinentsInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_all_continents = /** @type {((inputs?: Map_All_ContinentsInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_All_ContinentsInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_all_continents(inputs)
	if (locale === "fr") return __fr.map_all_continents(inputs)
	if (locale === "es") return __es.map_all_continents(inputs)
	if (locale === "zh") return __zh.map_all_continents(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_all_continents(inputs)
	if (locale === "hi") return __hi.map_all_continents(inputs)
	if (locale === "ar") return __ar.map_all_continents(inputs)
	if (locale === "pt") return __pt.map_all_continents(inputs)
	if (locale === "de") return __de.map_all_continents(inputs)
	if (locale === "ja") return __ja.map_all_continents(inputs)
	if (locale === "ko") return __ko.map_all_continents(inputs)
	if (locale === "it") return __it.map_all_continents(inputs)
	if (locale === "tr") return __tr.map_all_continents(inputs)
	if (locale === "pl") return __pl.map_all_continents(inputs)
	if (locale === "uk") return __uk.map_all_continents(inputs)
	if (locale === "nl") return __nl.map_all_continents(inputs)
	if (locale === "vi") return __vi.map_all_continents(inputs)
	if (locale === "id") return __id.map_all_continents(inputs)
	if (locale === "ms") return __ms.map_all_continents(inputs)
	if (locale === "th") return __th.map_all_continents(inputs)
	if (locale === "fa") return __fa.map_all_continents(inputs)
	if (locale === "ur") return __ur.map_all_continents(inputs)
	if (locale === "bn") return __bn.map_all_continents(inputs)
	if (locale === "pa") return __pa.map_all_continents(inputs)
	if (locale === "sw") return __sw.map_all_continents(inputs)
	if (locale === "el") return __el.map_all_continents(inputs)
	if (locale === "cs") return __cs.map_all_continents(inputs)
	if (locale === "ro") return __ro.map_all_continents(inputs)
	if (locale === "hu") return __hu.map_all_continents(inputs)
	if (locale === "sv") return __sv.map_all_continents(inputs)
	if (locale === "he") return __he.map_all_continents(inputs)
	return __ru.map_all_continents(inputs)
});
/**
* | output |
* | --- |
* | "Back to cities" |
*
* @param {Map_Back_To_CitiesInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_back_to_cities = /** @type {((inputs?: Map_Back_To_CitiesInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Back_To_CitiesInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_back_to_cities(inputs)
	if (locale === "fr") return __fr.map_back_to_cities(inputs)
	if (locale === "es") return __es.map_back_to_cities(inputs)
	if (locale === "zh") return __zh.map_back_to_cities(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_back_to_cities(inputs)
	if (locale === "hi") return __hi.map_back_to_cities(inputs)
	if (locale === "ar") return __ar.map_back_to_cities(inputs)
	if (locale === "pt") return __pt.map_back_to_cities(inputs)
	if (locale === "de") return __de.map_back_to_cities(inputs)
	if (locale === "ja") return __ja.map_back_to_cities(inputs)
	if (locale === "ko") return __ko.map_back_to_cities(inputs)
	if (locale === "it") return __it.map_back_to_cities(inputs)
	if (locale === "tr") return __tr.map_back_to_cities(inputs)
	if (locale === "pl") return __pl.map_back_to_cities(inputs)
	if (locale === "uk") return __uk.map_back_to_cities(inputs)
	if (locale === "nl") return __nl.map_back_to_cities(inputs)
	if (locale === "vi") return __vi.map_back_to_cities(inputs)
	if (locale === "id") return __id.map_back_to_cities(inputs)
	if (locale === "ms") return __ms.map_back_to_cities(inputs)
	if (locale === "th") return __th.map_back_to_cities(inputs)
	if (locale === "fa") return __fa.map_back_to_cities(inputs)
	if (locale === "ur") return __ur.map_back_to_cities(inputs)
	if (locale === "bn") return __bn.map_back_to_cities(inputs)
	if (locale === "pa") return __pa.map_back_to_cities(inputs)
	if (locale === "sw") return __sw.map_back_to_cities(inputs)
	if (locale === "el") return __el.map_back_to_cities(inputs)
	if (locale === "cs") return __cs.map_back_to_cities(inputs)
	if (locale === "ro") return __ro.map_back_to_cities(inputs)
	if (locale === "hu") return __hu.map_back_to_cities(inputs)
	if (locale === "sv") return __sv.map_back_to_cities(inputs)
	if (locale === "he") return __he.map_back_to_cities(inputs)
	return __ru.map_back_to_cities(inputs)
});
/**
* | output |
* | --- |
* | "Back to countries" |
*
* @param {Map_Back_To_CountriesInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_back_to_countries = /** @type {((inputs?: Map_Back_To_CountriesInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Back_To_CountriesInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_back_to_countries(inputs)
	if (locale === "fr") return __fr.map_back_to_countries(inputs)
	if (locale === "es") return __es.map_back_to_countries(inputs)
	if (locale === "zh") return __zh.map_back_to_countries(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_back_to_countries(inputs)
	if (locale === "hi") return __hi.map_back_to_countries(inputs)
	if (locale === "ar") return __ar.map_back_to_countries(inputs)
	if (locale === "pt") return __pt.map_back_to_countries(inputs)
	if (locale === "de") return __de.map_back_to_countries(inputs)
	if (locale === "ja") return __ja.map_back_to_countries(inputs)
	if (locale === "ko") return __ko.map_back_to_countries(inputs)
	if (locale === "it") return __it.map_back_to_countries(inputs)
	if (locale === "tr") return __tr.map_back_to_countries(inputs)
	if (locale === "pl") return __pl.map_back_to_countries(inputs)
	if (locale === "uk") return __uk.map_back_to_countries(inputs)
	if (locale === "nl") return __nl.map_back_to_countries(inputs)
	if (locale === "vi") return __vi.map_back_to_countries(inputs)
	if (locale === "id") return __id.map_back_to_countries(inputs)
	if (locale === "ms") return __ms.map_back_to_countries(inputs)
	if (locale === "th") return __th.map_back_to_countries(inputs)
	if (locale === "fa") return __fa.map_back_to_countries(inputs)
	if (locale === "ur") return __ur.map_back_to_countries(inputs)
	if (locale === "bn") return __bn.map_back_to_countries(inputs)
	if (locale === "pa") return __pa.map_back_to_countries(inputs)
	if (locale === "sw") return __sw.map_back_to_countries(inputs)
	if (locale === "el") return __el.map_back_to_countries(inputs)
	if (locale === "cs") return __cs.map_back_to_countries(inputs)
	if (locale === "ro") return __ro.map_back_to_countries(inputs)
	if (locale === "hu") return __hu.map_back_to_countries(inputs)
	if (locale === "sv") return __sv.map_back_to_countries(inputs)
	if (locale === "he") return __he.map_back_to_countries(inputs)
	return __ru.map_back_to_countries(inputs)
});
/**
* | output |
* | --- |
* | "Back to map" |
*
* @param {Map_Back_To_MapInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_back_to_map = /** @type {((inputs?: Map_Back_To_MapInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Back_To_MapInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_back_to_map(inputs)
	if (locale === "fr") return __fr.map_back_to_map(inputs)
	if (locale === "es") return __es.map_back_to_map(inputs)
	if (locale === "zh") return __zh.map_back_to_map(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_back_to_map(inputs)
	if (locale === "hi") return __hi.map_back_to_map(inputs)
	if (locale === "ar") return __ar.map_back_to_map(inputs)
	if (locale === "pt") return __pt.map_back_to_map(inputs)
	if (locale === "de") return __de.map_back_to_map(inputs)
	if (locale === "ja") return __ja.map_back_to_map(inputs)
	if (locale === "ko") return __ko.map_back_to_map(inputs)
	if (locale === "it") return __it.map_back_to_map(inputs)
	if (locale === "tr") return __tr.map_back_to_map(inputs)
	if (locale === "pl") return __pl.map_back_to_map(inputs)
	if (locale === "uk") return __uk.map_back_to_map(inputs)
	if (locale === "nl") return __nl.map_back_to_map(inputs)
	if (locale === "vi") return __vi.map_back_to_map(inputs)
	if (locale === "id") return __id.map_back_to_map(inputs)
	if (locale === "ms") return __ms.map_back_to_map(inputs)
	if (locale === "th") return __th.map_back_to_map(inputs)
	if (locale === "fa") return __fa.map_back_to_map(inputs)
	if (locale === "ur") return __ur.map_back_to_map(inputs)
	if (locale === "bn") return __bn.map_back_to_map(inputs)
	if (locale === "pa") return __pa.map_back_to_map(inputs)
	if (locale === "sw") return __sw.map_back_to_map(inputs)
	if (locale === "el") return __el.map_back_to_map(inputs)
	if (locale === "cs") return __cs.map_back_to_map(inputs)
	if (locale === "ro") return __ro.map_back_to_map(inputs)
	if (locale === "hu") return __hu.map_back_to_map(inputs)
	if (locale === "sv") return __sv.map_back_to_map(inputs)
	if (locale === "he") return __he.map_back_to_map(inputs)
	return __ru.map_back_to_map(inputs)
});
/**
* | output |
* | --- |
* | "Back to sections" |
*
* @param {Map_Back_To_SectionsInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_back_to_sections = /** @type {((inputs?: Map_Back_To_SectionsInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Back_To_SectionsInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_back_to_sections(inputs)
	if (locale === "fr") return __fr.map_back_to_sections(inputs)
	if (locale === "es") return __es.map_back_to_sections(inputs)
	if (locale === "zh") return __zh.map_back_to_sections(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_back_to_sections(inputs)
	if (locale === "hi") return __hi.map_back_to_sections(inputs)
	if (locale === "ar") return __ar.map_back_to_sections(inputs)
	if (locale === "pt") return __pt.map_back_to_sections(inputs)
	if (locale === "de") return __de.map_back_to_sections(inputs)
	if (locale === "ja") return __ja.map_back_to_sections(inputs)
	if (locale === "ko") return __ko.map_back_to_sections(inputs)
	if (locale === "it") return __it.map_back_to_sections(inputs)
	if (locale === "tr") return __tr.map_back_to_sections(inputs)
	if (locale === "pl") return __pl.map_back_to_sections(inputs)
	if (locale === "uk") return __uk.map_back_to_sections(inputs)
	if (locale === "nl") return __nl.map_back_to_sections(inputs)
	if (locale === "vi") return __vi.map_back_to_sections(inputs)
	if (locale === "id") return __id.map_back_to_sections(inputs)
	if (locale === "ms") return __ms.map_back_to_sections(inputs)
	if (locale === "th") return __th.map_back_to_sections(inputs)
	if (locale === "fa") return __fa.map_back_to_sections(inputs)
	if (locale === "ur") return __ur.map_back_to_sections(inputs)
	if (locale === "bn") return __bn.map_back_to_sections(inputs)
	if (locale === "pa") return __pa.map_back_to_sections(inputs)
	if (locale === "sw") return __sw.map_back_to_sections(inputs)
	if (locale === "el") return __el.map_back_to_sections(inputs)
	if (locale === "cs") return __cs.map_back_to_sections(inputs)
	if (locale === "ro") return __ro.map_back_to_sections(inputs)
	if (locale === "hu") return __hu.map_back_to_sections(inputs)
	if (locale === "sv") return __sv.map_back_to_sections(inputs)
	if (locale === "he") return __he.map_back_to_sections(inputs)
	return __ru.map_back_to_sections(inputs)
});
/**
* | output |
* | --- |
* | "Couldn’t open the catalog. Try again." |
*
* @param {Map_Catalog_ErrorInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_catalog_error = /** @type {((inputs?: Map_Catalog_ErrorInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Catalog_ErrorInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_catalog_error(inputs)
	if (locale === "fr") return __fr.map_catalog_error(inputs)
	if (locale === "es") return __es.map_catalog_error(inputs)
	if (locale === "zh") return __zh.map_catalog_error(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_catalog_error(inputs)
	if (locale === "hi") return __hi.map_catalog_error(inputs)
	if (locale === "ar") return __ar.map_catalog_error(inputs)
	if (locale === "pt") return __pt.map_catalog_error(inputs)
	if (locale === "de") return __de.map_catalog_error(inputs)
	if (locale === "ja") return __ja.map_catalog_error(inputs)
	if (locale === "ko") return __ko.map_catalog_error(inputs)
	if (locale === "it") return __it.map_catalog_error(inputs)
	if (locale === "tr") return __tr.map_catalog_error(inputs)
	if (locale === "pl") return __pl.map_catalog_error(inputs)
	if (locale === "uk") return __uk.map_catalog_error(inputs)
	if (locale === "nl") return __nl.map_catalog_error(inputs)
	if (locale === "vi") return __vi.map_catalog_error(inputs)
	if (locale === "id") return __id.map_catalog_error(inputs)
	if (locale === "ms") return __ms.map_catalog_error(inputs)
	if (locale === "th") return __th.map_catalog_error(inputs)
	if (locale === "fa") return __fa.map_catalog_error(inputs)
	if (locale === "ur") return __ur.map_catalog_error(inputs)
	if (locale === "bn") return __bn.map_catalog_error(inputs)
	if (locale === "pa") return __pa.map_catalog_error(inputs)
	if (locale === "sw") return __sw.map_catalog_error(inputs)
	if (locale === "el") return __el.map_catalog_error(inputs)
	if (locale === "cs") return __cs.map_catalog_error(inputs)
	if (locale === "ro") return __ro.map_catalog_error(inputs)
	if (locale === "hu") return __hu.map_catalog_error(inputs)
	if (locale === "sv") return __sv.map_catalog_error(inputs)
	if (locale === "he") return __he.map_catalog_error(inputs)
	return __ru.map_catalog_error(inputs)
});
/**
* | output |
* | --- |
* | "Found in full catalog: {n}" |
*
* @param {Map_Catalog_FoundInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_catalog_found = /** @type {((inputs: Map_Catalog_FoundInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Catalog_FoundInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_catalog_found(inputs)
	if (locale === "fr") return __fr.map_catalog_found(inputs)
	if (locale === "es") return __es.map_catalog_found(inputs)
	if (locale === "zh") return __zh.map_catalog_found(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_catalog_found(inputs)
	if (locale === "hi") return __hi.map_catalog_found(inputs)
	if (locale === "ar") return __ar.map_catalog_found(inputs)
	if (locale === "pt") return __pt.map_catalog_found(inputs)
	if (locale === "de") return __de.map_catalog_found(inputs)
	if (locale === "ja") return __ja.map_catalog_found(inputs)
	if (locale === "ko") return __ko.map_catalog_found(inputs)
	if (locale === "it") return __it.map_catalog_found(inputs)
	if (locale === "tr") return __tr.map_catalog_found(inputs)
	if (locale === "pl") return __pl.map_catalog_found(inputs)
	if (locale === "uk") return __uk.map_catalog_found(inputs)
	if (locale === "nl") return __nl.map_catalog_found(inputs)
	if (locale === "vi") return __vi.map_catalog_found(inputs)
	if (locale === "id") return __id.map_catalog_found(inputs)
	if (locale === "ms") return __ms.map_catalog_found(inputs)
	if (locale === "th") return __th.map_catalog_found(inputs)
	if (locale === "fa") return __fa.map_catalog_found(inputs)
	if (locale === "ur") return __ur.map_catalog_found(inputs)
	if (locale === "bn") return __bn.map_catalog_found(inputs)
	if (locale === "pa") return __pa.map_catalog_found(inputs)
	if (locale === "sw") return __sw.map_catalog_found(inputs)
	if (locale === "el") return __el.map_catalog_found(inputs)
	if (locale === "cs") return __cs.map_catalog_found(inputs)
	if (locale === "ro") return __ro.map_catalog_found(inputs)
	if (locale === "hu") return __hu.map_catalog_found(inputs)
	if (locale === "sv") return __sv.map_catalog_found(inputs)
	if (locale === "he") return __he.map_catalog_found(inputs)
	return __ru.map_catalog_found(inputs)
});
/**
* | output |
* | --- |
* | "Pick a section below or start typing" |
*
* @param {Map_Catalog_HintInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_catalog_hint = /** @type {((inputs?: Map_Catalog_HintInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Catalog_HintInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_catalog_hint(inputs)
	if (locale === "fr") return __fr.map_catalog_hint(inputs)
	if (locale === "es") return __es.map_catalog_hint(inputs)
	if (locale === "zh") return __zh.map_catalog_hint(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_catalog_hint(inputs)
	if (locale === "hi") return __hi.map_catalog_hint(inputs)
	if (locale === "ar") return __ar.map_catalog_hint(inputs)
	if (locale === "pt") return __pt.map_catalog_hint(inputs)
	if (locale === "de") return __de.map_catalog_hint(inputs)
	if (locale === "ja") return __ja.map_catalog_hint(inputs)
	if (locale === "ko") return __ko.map_catalog_hint(inputs)
	if (locale === "it") return __it.map_catalog_hint(inputs)
	if (locale === "tr") return __tr.map_catalog_hint(inputs)
	if (locale === "pl") return __pl.map_catalog_hint(inputs)
	if (locale === "uk") return __uk.map_catalog_hint(inputs)
	if (locale === "nl") return __nl.map_catalog_hint(inputs)
	if (locale === "vi") return __vi.map_catalog_hint(inputs)
	if (locale === "id") return __id.map_catalog_hint(inputs)
	if (locale === "ms") return __ms.map_catalog_hint(inputs)
	if (locale === "th") return __th.map_catalog_hint(inputs)
	if (locale === "fa") return __fa.map_catalog_hint(inputs)
	if (locale === "ur") return __ur.map_catalog_hint(inputs)
	if (locale === "bn") return __bn.map_catalog_hint(inputs)
	if (locale === "pa") return __pa.map_catalog_hint(inputs)
	if (locale === "sw") return __sw.map_catalog_hint(inputs)
	if (locale === "el") return __el.map_catalog_hint(inputs)
	if (locale === "cs") return __cs.map_catalog_hint(inputs)
	if (locale === "ro") return __ro.map_catalog_hint(inputs)
	if (locale === "hu") return __hu.map_catalog_hint(inputs)
	if (locale === "sv") return __sv.map_catalog_hint(inputs)
	if (locale === "he") return __he.map_catalog_hint(inputs)
	return __ru.map_catalog_hint(inputs)
});
/**
* | output |
* | --- |
* | "No such field in the catalog yet" |
*
* @param {Map_Catalog_NoneInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_catalog_none = /** @type {((inputs?: Map_Catalog_NoneInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Catalog_NoneInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_catalog_none(inputs)
	if (locale === "fr") return __fr.map_catalog_none(inputs)
	if (locale === "es") return __es.map_catalog_none(inputs)
	if (locale === "zh") return __zh.map_catalog_none(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_catalog_none(inputs)
	if (locale === "hi") return __hi.map_catalog_none(inputs)
	if (locale === "ar") return __ar.map_catalog_none(inputs)
	if (locale === "pt") return __pt.map_catalog_none(inputs)
	if (locale === "de") return __de.map_catalog_none(inputs)
	if (locale === "ja") return __ja.map_catalog_none(inputs)
	if (locale === "ko") return __ko.map_catalog_none(inputs)
	if (locale === "it") return __it.map_catalog_none(inputs)
	if (locale === "tr") return __tr.map_catalog_none(inputs)
	if (locale === "pl") return __pl.map_catalog_none(inputs)
	if (locale === "uk") return __uk.map_catalog_none(inputs)
	if (locale === "nl") return __nl.map_catalog_none(inputs)
	if (locale === "vi") return __vi.map_catalog_none(inputs)
	if (locale === "id") return __id.map_catalog_none(inputs)
	if (locale === "ms") return __ms.map_catalog_none(inputs)
	if (locale === "th") return __th.map_catalog_none(inputs)
	if (locale === "fa") return __fa.map_catalog_none(inputs)
	if (locale === "ur") return __ur.map_catalog_none(inputs)
	if (locale === "bn") return __bn.map_catalog_none(inputs)
	if (locale === "pa") return __pa.map_catalog_none(inputs)
	if (locale === "sw") return __sw.map_catalog_none(inputs)
	if (locale === "el") return __el.map_catalog_none(inputs)
	if (locale === "cs") return __cs.map_catalog_none(inputs)
	if (locale === "ro") return __ro.map_catalog_none(inputs)
	if (locale === "hu") return __hu.map_catalog_none(inputs)
	if (locale === "sv") return __sv.map_catalog_none(inputs)
	if (locale === "he") return __he.map_catalog_none(inputs)
	return __ru.map_catalog_none(inputs)
});
/**
* | output |
* | --- |
* | "Searching professions and services…" |
*
* @param {Map_Catalog_SearchingInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_catalog_searching = /** @type {((inputs?: Map_Catalog_SearchingInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Catalog_SearchingInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_catalog_searching(inputs)
	if (locale === "fr") return __fr.map_catalog_searching(inputs)
	if (locale === "es") return __es.map_catalog_searching(inputs)
	if (locale === "zh") return __zh.map_catalog_searching(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_catalog_searching(inputs)
	if (locale === "hi") return __hi.map_catalog_searching(inputs)
	if (locale === "ar") return __ar.map_catalog_searching(inputs)
	if (locale === "pt") return __pt.map_catalog_searching(inputs)
	if (locale === "de") return __de.map_catalog_searching(inputs)
	if (locale === "ja") return __ja.map_catalog_searching(inputs)
	if (locale === "ko") return __ko.map_catalog_searching(inputs)
	if (locale === "it") return __it.map_catalog_searching(inputs)
	if (locale === "tr") return __tr.map_catalog_searching(inputs)
	if (locale === "pl") return __pl.map_catalog_searching(inputs)
	if (locale === "uk") return __uk.map_catalog_searching(inputs)
	if (locale === "nl") return __nl.map_catalog_searching(inputs)
	if (locale === "vi") return __vi.map_catalog_searching(inputs)
	if (locale === "id") return __id.map_catalog_searching(inputs)
	if (locale === "ms") return __ms.map_catalog_searching(inputs)
	if (locale === "th") return __th.map_catalog_searching(inputs)
	if (locale === "fa") return __fa.map_catalog_searching(inputs)
	if (locale === "ur") return __ur.map_catalog_searching(inputs)
	if (locale === "bn") return __bn.map_catalog_searching(inputs)
	if (locale === "pa") return __pa.map_catalog_searching(inputs)
	if (locale === "sw") return __sw.map_catalog_searching(inputs)
	if (locale === "el") return __el.map_catalog_searching(inputs)
	if (locale === "cs") return __cs.map_catalog_searching(inputs)
	if (locale === "ro") return __ro.map_catalog_searching(inputs)
	if (locale === "hu") return __hu.map_catalog_searching(inputs)
	if (locale === "sv") return __sv.map_catalog_searching(inputs)
	if (locale === "he") return __he.map_catalog_searching(inputs)
	return __ru.map_catalog_searching(inputs)
});
/**
* | output |
* | --- |
* | "Cities" |
*
* @param {Map_CitiesInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_cities = /** @type {((inputs?: Map_CitiesInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_CitiesInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_cities(inputs)
	if (locale === "fr") return __fr.map_cities(inputs)
	if (locale === "es") return __es.map_cities(inputs)
	if (locale === "zh") return __zh.map_cities(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_cities(inputs)
	if (locale === "hi") return __hi.map_cities(inputs)
	if (locale === "ar") return __ar.map_cities(inputs)
	if (locale === "pt") return __pt.map_cities(inputs)
	if (locale === "de") return __de.map_cities(inputs)
	if (locale === "ja") return __ja.map_cities(inputs)
	if (locale === "ko") return __ko.map_cities(inputs)
	if (locale === "it") return __it.map_cities(inputs)
	if (locale === "tr") return __tr.map_cities(inputs)
	if (locale === "pl") return __pl.map_cities(inputs)
	if (locale === "uk") return __uk.map_cities(inputs)
	if (locale === "nl") return __nl.map_cities(inputs)
	if (locale === "vi") return __vi.map_cities(inputs)
	if (locale === "id") return __id.map_cities(inputs)
	if (locale === "ms") return __ms.map_cities(inputs)
	if (locale === "th") return __th.map_cities(inputs)
	if (locale === "fa") return __fa.map_cities(inputs)
	if (locale === "ur") return __ur.map_cities(inputs)
	if (locale === "bn") return __bn.map_cities(inputs)
	if (locale === "pa") return __pa.map_cities(inputs)
	if (locale === "sw") return __sw.map_cities(inputs)
	if (locale === "el") return __el.map_cities(inputs)
	if (locale === "cs") return __cs.map_cities(inputs)
	if (locale === "ro") return __ro.map_cities(inputs)
	if (locale === "hu") return __hu.map_cities(inputs)
	if (locale === "sv") return __sv.map_cities(inputs)
	if (locale === "he") return __he.map_cities(inputs)
	return __ru.map_cities(inputs)
});
/**
* | output |
* | --- |
* | "Couldn’t load cities. Try again." |
*
* @param {Map_Cities_Load_ErrorInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_cities_load_error = /** @type {((inputs?: Map_Cities_Load_ErrorInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Cities_Load_ErrorInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_cities_load_error(inputs)
	if (locale === "fr") return __fr.map_cities_load_error(inputs)
	if (locale === "es") return __es.map_cities_load_error(inputs)
	if (locale === "zh") return __zh.map_cities_load_error(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_cities_load_error(inputs)
	if (locale === "hi") return __hi.map_cities_load_error(inputs)
	if (locale === "ar") return __ar.map_cities_load_error(inputs)
	if (locale === "pt") return __pt.map_cities_load_error(inputs)
	if (locale === "de") return __de.map_cities_load_error(inputs)
	if (locale === "ja") return __ja.map_cities_load_error(inputs)
	if (locale === "ko") return __ko.map_cities_load_error(inputs)
	if (locale === "it") return __it.map_cities_load_error(inputs)
	if (locale === "tr") return __tr.map_cities_load_error(inputs)
	if (locale === "pl") return __pl.map_cities_load_error(inputs)
	if (locale === "uk") return __uk.map_cities_load_error(inputs)
	if (locale === "nl") return __nl.map_cities_load_error(inputs)
	if (locale === "vi") return __vi.map_cities_load_error(inputs)
	if (locale === "id") return __id.map_cities_load_error(inputs)
	if (locale === "ms") return __ms.map_cities_load_error(inputs)
	if (locale === "th") return __th.map_cities_load_error(inputs)
	if (locale === "fa") return __fa.map_cities_load_error(inputs)
	if (locale === "ur") return __ur.map_cities_load_error(inputs)
	if (locale === "bn") return __bn.map_cities_load_error(inputs)
	if (locale === "pa") return __pa.map_cities_load_error(inputs)
	if (locale === "sw") return __sw.map_cities_load_error(inputs)
	if (locale === "el") return __el.map_cities_load_error(inputs)
	if (locale === "cs") return __cs.map_cities_load_error(inputs)
	if (locale === "ro") return __ro.map_cities_load_error(inputs)
	if (locale === "hu") return __hu.map_cities_load_error(inputs)
	if (locale === "sv") return __sv.map_cities_load_error(inputs)
	if (locale === "he") return __he.map_cities_load_error(inputs)
	return __ru.map_cities_load_error(inputs)
});
/**
* | output |
* | --- |
* | "Cities and professions" |
*
* @param {Map_Cities_ProfessionsInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_cities_professions = /** @type {((inputs?: Map_Cities_ProfessionsInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Cities_ProfessionsInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_cities_professions(inputs)
	if (locale === "fr") return __fr.map_cities_professions(inputs)
	if (locale === "es") return __es.map_cities_professions(inputs)
	if (locale === "zh") return __zh.map_cities_professions(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_cities_professions(inputs)
	if (locale === "hi") return __hi.map_cities_professions(inputs)
	if (locale === "ar") return __ar.map_cities_professions(inputs)
	if (locale === "pt") return __pt.map_cities_professions(inputs)
	if (locale === "de") return __de.map_cities_professions(inputs)
	if (locale === "ja") return __ja.map_cities_professions(inputs)
	if (locale === "ko") return __ko.map_cities_professions(inputs)
	if (locale === "it") return __it.map_cities_professions(inputs)
	if (locale === "tr") return __tr.map_cities_professions(inputs)
	if (locale === "pl") return __pl.map_cities_professions(inputs)
	if (locale === "uk") return __uk.map_cities_professions(inputs)
	if (locale === "nl") return __nl.map_cities_professions(inputs)
	if (locale === "vi") return __vi.map_cities_professions(inputs)
	if (locale === "id") return __id.map_cities_professions(inputs)
	if (locale === "ms") return __ms.map_cities_professions(inputs)
	if (locale === "th") return __th.map_cities_professions(inputs)
	if (locale === "fa") return __fa.map_cities_professions(inputs)
	if (locale === "ur") return __ur.map_cities_professions(inputs)
	if (locale === "bn") return __bn.map_cities_professions(inputs)
	if (locale === "pa") return __pa.map_cities_professions(inputs)
	if (locale === "sw") return __sw.map_cities_professions(inputs)
	if (locale === "el") return __el.map_cities_professions(inputs)
	if (locale === "cs") return __cs.map_cities_professions(inputs)
	if (locale === "ro") return __ro.map_cities_professions(inputs)
	if (locale === "hu") return __hu.map_cities_professions(inputs)
	if (locale === "sv") return __sv.map_cities_professions(inputs)
	if (locale === "he") return __he.map_cities_professions(inputs)
	return __ru.map_cities_professions(inputs)
});
/**
* | output |
* | --- |
* | "All directions, listings and professions in this city." |
*
* @param {Map_City_All_DirectionsInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_city_all_directions = /** @type {((inputs?: Map_City_All_DirectionsInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_City_All_DirectionsInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_city_all_directions(inputs)
	if (locale === "fr") return __fr.map_city_all_directions(inputs)
	if (locale === "es") return __es.map_city_all_directions(inputs)
	if (locale === "zh") return __zh.map_city_all_directions(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_city_all_directions(inputs)
	if (locale === "hi") return __hi.map_city_all_directions(inputs)
	if (locale === "ar") return __ar.map_city_all_directions(inputs)
	if (locale === "pt") return __pt.map_city_all_directions(inputs)
	if (locale === "de") return __de.map_city_all_directions(inputs)
	if (locale === "ja") return __ja.map_city_all_directions(inputs)
	if (locale === "ko") return __ko.map_city_all_directions(inputs)
	if (locale === "it") return __it.map_city_all_directions(inputs)
	if (locale === "tr") return __tr.map_city_all_directions(inputs)
	if (locale === "pl") return __pl.map_city_all_directions(inputs)
	if (locale === "uk") return __uk.map_city_all_directions(inputs)
	if (locale === "nl") return __nl.map_city_all_directions(inputs)
	if (locale === "vi") return __vi.map_city_all_directions(inputs)
	if (locale === "id") return __id.map_city_all_directions(inputs)
	if (locale === "ms") return __ms.map_city_all_directions(inputs)
	if (locale === "th") return __th.map_city_all_directions(inputs)
	if (locale === "fa") return __fa.map_city_all_directions(inputs)
	if (locale === "ur") return __ur.map_city_all_directions(inputs)
	if (locale === "bn") return __bn.map_city_all_directions(inputs)
	if (locale === "pa") return __pa.map_city_all_directions(inputs)
	if (locale === "sw") return __sw.map_city_all_directions(inputs)
	if (locale === "el") return __el.map_city_all_directions(inputs)
	if (locale === "cs") return __cs.map_city_all_directions(inputs)
	if (locale === "ro") return __ro.map_city_all_directions(inputs)
	if (locale === "hu") return __hu.map_city_all_directions(inputs)
	if (locale === "sv") return __sv.map_city_all_directions(inputs)
	if (locale === "he") return __he.map_city_all_directions(inputs)
	return __ru.map_city_all_directions(inputs)
});
/**
* | output |
* | --- |
* | "{country} · city" |
*
* @param {Map_City_DotInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_city_dot = /** @type {((inputs: Map_City_DotInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_City_DotInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_city_dot(inputs)
	if (locale === "fr") return __fr.map_city_dot(inputs)
	if (locale === "es") return __es.map_city_dot(inputs)
	if (locale === "zh") return __zh.map_city_dot(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_city_dot(inputs)
	if (locale === "hi") return __hi.map_city_dot(inputs)
	if (locale === "ar") return __ar.map_city_dot(inputs)
	if (locale === "pt") return __pt.map_city_dot(inputs)
	if (locale === "de") return __de.map_city_dot(inputs)
	if (locale === "ja") return __ja.map_city_dot(inputs)
	if (locale === "ko") return __ko.map_city_dot(inputs)
	if (locale === "it") return __it.map_city_dot(inputs)
	if (locale === "tr") return __tr.map_city_dot(inputs)
	if (locale === "pl") return __pl.map_city_dot(inputs)
	if (locale === "uk") return __uk.map_city_dot(inputs)
	if (locale === "nl") return __nl.map_city_dot(inputs)
	if (locale === "vi") return __vi.map_city_dot(inputs)
	if (locale === "id") return __id.map_city_dot(inputs)
	if (locale === "ms") return __ms.map_city_dot(inputs)
	if (locale === "th") return __th.map_city_dot(inputs)
	if (locale === "fa") return __fa.map_city_dot(inputs)
	if (locale === "ur") return __ur.map_city_dot(inputs)
	if (locale === "bn") return __bn.map_city_dot(inputs)
	if (locale === "pa") return __pa.map_city_dot(inputs)
	if (locale === "sw") return __sw.map_city_dot(inputs)
	if (locale === "el") return __el.map_city_dot(inputs)
	if (locale === "cs") return __cs.map_city_dot(inputs)
	if (locale === "ro") return __ro.map_city_dot(inputs)
	if (locale === "hu") return __hu.map_city_dot(inputs)
	if (locale === "sv") return __sv.map_city_dot(inputs)
	if (locale === "he") return __he.map_city_dot(inputs)
	return __ru.map_city_dot(inputs)
});
/**
* | output |
* | --- |
* | "City" |
*
* @param {Map_City_LabelInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_city_label = /** @type {((inputs?: Map_City_LabelInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_City_LabelInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_city_label(inputs)
	if (locale === "fr") return __fr.map_city_label(inputs)
	if (locale === "es") return __es.map_city_label(inputs)
	if (locale === "zh") return __zh.map_city_label(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_city_label(inputs)
	if (locale === "hi") return __hi.map_city_label(inputs)
	if (locale === "ar") return __ar.map_city_label(inputs)
	if (locale === "pt") return __pt.map_city_label(inputs)
	if (locale === "de") return __de.map_city_label(inputs)
	if (locale === "ja") return __ja.map_city_label(inputs)
	if (locale === "ko") return __ko.map_city_label(inputs)
	if (locale === "it") return __it.map_city_label(inputs)
	if (locale === "tr") return __tr.map_city_label(inputs)
	if (locale === "pl") return __pl.map_city_label(inputs)
	if (locale === "uk") return __uk.map_city_label(inputs)
	if (locale === "nl") return __nl.map_city_label(inputs)
	if (locale === "vi") return __vi.map_city_label(inputs)
	if (locale === "id") return __id.map_city_label(inputs)
	if (locale === "ms") return __ms.map_city_label(inputs)
	if (locale === "th") return __th.map_city_label(inputs)
	if (locale === "fa") return __fa.map_city_label(inputs)
	if (locale === "ur") return __ur.map_city_label(inputs)
	if (locale === "bn") return __bn.map_city_label(inputs)
	if (locale === "pa") return __pa.map_city_label(inputs)
	if (locale === "sw") return __sw.map_city_label(inputs)
	if (locale === "el") return __el.map_city_label(inputs)
	if (locale === "cs") return __cs.map_city_label(inputs)
	if (locale === "ro") return __ro.map_city_label(inputs)
	if (locale === "hu") return __hu.map_city_label(inputs)
	if (locale === "sv") return __sv.map_city_label(inputs)
	if (locale === "he") return __he.map_city_label(inputs)
	return __ru.map_city_label(inputs)
});
/**
* | output |
* | --- |
* | "City not found in this country" |
*
* @param {Map_City_Not_FoundInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_city_not_found = /** @type {((inputs?: Map_City_Not_FoundInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_City_Not_FoundInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_city_not_found(inputs)
	if (locale === "fr") return __fr.map_city_not_found(inputs)
	if (locale === "es") return __es.map_city_not_found(inputs)
	if (locale === "zh") return __zh.map_city_not_found(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_city_not_found(inputs)
	if (locale === "hi") return __hi.map_city_not_found(inputs)
	if (locale === "ar") return __ar.map_city_not_found(inputs)
	if (locale === "pt") return __pt.map_city_not_found(inputs)
	if (locale === "de") return __de.map_city_not_found(inputs)
	if (locale === "ja") return __ja.map_city_not_found(inputs)
	if (locale === "ko") return __ko.map_city_not_found(inputs)
	if (locale === "it") return __it.map_city_not_found(inputs)
	if (locale === "tr") return __tr.map_city_not_found(inputs)
	if (locale === "pl") return __pl.map_city_not_found(inputs)
	if (locale === "uk") return __uk.map_city_not_found(inputs)
	if (locale === "nl") return __nl.map_city_not_found(inputs)
	if (locale === "vi") return __vi.map_city_not_found(inputs)
	if (locale === "id") return __id.map_city_not_found(inputs)
	if (locale === "ms") return __ms.map_city_not_found(inputs)
	if (locale === "th") return __th.map_city_not_found(inputs)
	if (locale === "fa") return __fa.map_city_not_found(inputs)
	if (locale === "ur") return __ur.map_city_not_found(inputs)
	if (locale === "bn") return __bn.map_city_not_found(inputs)
	if (locale === "pa") return __pa.map_city_not_found(inputs)
	if (locale === "sw") return __sw.map_city_not_found(inputs)
	if (locale === "el") return __el.map_city_not_found(inputs)
	if (locale === "cs") return __cs.map_city_not_found(inputs)
	if (locale === "ro") return __ro.map_city_not_found(inputs)
	if (locale === "hu") return __hu.map_city_not_found(inputs)
	if (locale === "sv") return __sv.map_city_not_found(inputs)
	if (locale === "he") return __he.map_city_not_found(inputs)
	return __ru.map_city_not_found(inputs)
});
/**
* | output |
* | --- |
* | "Choose a city. The list loads in batches without changing order." |
*
* @param {Map_City_Pick_LeadInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_city_pick_lead = /** @type {((inputs?: Map_City_Pick_LeadInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_City_Pick_LeadInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_city_pick_lead(inputs)
	if (locale === "fr") return __fr.map_city_pick_lead(inputs)
	if (locale === "es") return __es.map_city_pick_lead(inputs)
	if (locale === "zh") return __zh.map_city_pick_lead(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_city_pick_lead(inputs)
	if (locale === "hi") return __hi.map_city_pick_lead(inputs)
	if (locale === "ar") return __ar.map_city_pick_lead(inputs)
	if (locale === "pt") return __pt.map_city_pick_lead(inputs)
	if (locale === "de") return __de.map_city_pick_lead(inputs)
	if (locale === "ja") return __ja.map_city_pick_lead(inputs)
	if (locale === "ko") return __ko.map_city_pick_lead(inputs)
	if (locale === "it") return __it.map_city_pick_lead(inputs)
	if (locale === "tr") return __tr.map_city_pick_lead(inputs)
	if (locale === "pl") return __pl.map_city_pick_lead(inputs)
	if (locale === "uk") return __uk.map_city_pick_lead(inputs)
	if (locale === "nl") return __nl.map_city_pick_lead(inputs)
	if (locale === "vi") return __vi.map_city_pick_lead(inputs)
	if (locale === "id") return __id.map_city_pick_lead(inputs)
	if (locale === "ms") return __ms.map_city_pick_lead(inputs)
	if (locale === "th") return __th.map_city_pick_lead(inputs)
	if (locale === "fa") return __fa.map_city_pick_lead(inputs)
	if (locale === "ur") return __ur.map_city_pick_lead(inputs)
	if (locale === "bn") return __bn.map_city_pick_lead(inputs)
	if (locale === "pa") return __pa.map_city_pick_lead(inputs)
	if (locale === "sw") return __sw.map_city_pick_lead(inputs)
	if (locale === "el") return __el.map_city_pick_lead(inputs)
	if (locale === "cs") return __cs.map_city_pick_lead(inputs)
	if (locale === "ro") return __ro.map_city_pick_lead(inputs)
	if (locale === "hu") return __hu.map_city_pick_lead(inputs)
	if (locale === "sv") return __sv.map_city_pick_lead(inputs)
	if (locale === "he") return __he.map_city_pick_lead(inputs)
	return __ru.map_city_pick_lead(inputs)
});
/**
* | output |
* | --- |
* | "Clear search" |
*
* @param {Map_Clear_SearchInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_clear_search = /** @type {((inputs?: Map_Clear_SearchInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Clear_SearchInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_clear_search(inputs)
	if (locale === "fr") return __fr.map_clear_search(inputs)
	if (locale === "es") return __es.map_clear_search(inputs)
	if (locale === "zh") return __zh.map_clear_search(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_clear_search(inputs)
	if (locale === "hi") return __hi.map_clear_search(inputs)
	if (locale === "ar") return __ar.map_clear_search(inputs)
	if (locale === "pt") return __pt.map_clear_search(inputs)
	if (locale === "de") return __de.map_clear_search(inputs)
	if (locale === "ja") return __ja.map_clear_search(inputs)
	if (locale === "ko") return __ko.map_clear_search(inputs)
	if (locale === "it") return __it.map_clear_search(inputs)
	if (locale === "tr") return __tr.map_clear_search(inputs)
	if (locale === "pl") return __pl.map_clear_search(inputs)
	if (locale === "uk") return __uk.map_clear_search(inputs)
	if (locale === "nl") return __nl.map_clear_search(inputs)
	if (locale === "vi") return __vi.map_clear_search(inputs)
	if (locale === "id") return __id.map_clear_search(inputs)
	if (locale === "ms") return __ms.map_clear_search(inputs)
	if (locale === "th") return __th.map_clear_search(inputs)
	if (locale === "fa") return __fa.map_clear_search(inputs)
	if (locale === "ur") return __ur.map_clear_search(inputs)
	if (locale === "bn") return __bn.map_clear_search(inputs)
	if (locale === "pa") return __pa.map_clear_search(inputs)
	if (locale === "sw") return __sw.map_clear_search(inputs)
	if (locale === "el") return __el.map_clear_search(inputs)
	if (locale === "cs") return __cs.map_clear_search(inputs)
	if (locale === "ro") return __ro.map_clear_search(inputs)
	if (locale === "hu") return __hu.map_clear_search(inputs)
	if (locale === "sv") return __sv.map_clear_search(inputs)
	if (locale === "he") return __he.map_clear_search(inputs)
	return __ru.map_clear_search(inputs)
});
/**
* | output |
* | --- |
* | "Continent" |
*
* @param {Map_ContinentInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_continent = /** @type {((inputs?: Map_ContinentInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_ContinentInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_continent(inputs)
	if (locale === "fr") return __fr.map_continent(inputs)
	if (locale === "es") return __es.map_continent(inputs)
	if (locale === "zh") return __zh.map_continent(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_continent(inputs)
	if (locale === "hi") return __hi.map_continent(inputs)
	if (locale === "ar") return __ar.map_continent(inputs)
	if (locale === "pt") return __pt.map_continent(inputs)
	if (locale === "de") return __de.map_continent(inputs)
	if (locale === "ja") return __ja.map_continent(inputs)
	if (locale === "ko") return __ko.map_continent(inputs)
	if (locale === "it") return __it.map_continent(inputs)
	if (locale === "tr") return __tr.map_continent(inputs)
	if (locale === "pl") return __pl.map_continent(inputs)
	if (locale === "uk") return __uk.map_continent(inputs)
	if (locale === "nl") return __nl.map_continent(inputs)
	if (locale === "vi") return __vi.map_continent(inputs)
	if (locale === "id") return __id.map_continent(inputs)
	if (locale === "ms") return __ms.map_continent(inputs)
	if (locale === "th") return __th.map_continent(inputs)
	if (locale === "fa") return __fa.map_continent(inputs)
	if (locale === "ur") return __ur.map_continent(inputs)
	if (locale === "bn") return __bn.map_continent(inputs)
	if (locale === "pa") return __pa.map_continent(inputs)
	if (locale === "sw") return __sw.map_continent(inputs)
	if (locale === "el") return __el.map_continent(inputs)
	if (locale === "cs") return __cs.map_continent(inputs)
	if (locale === "ro") return __ro.map_continent(inputs)
	if (locale === "hu") return __hu.map_continent(inputs)
	if (locale === "sv") return __sv.map_continent(inputs)
	if (locale === "he") return __he.map_continent(inputs)
	return __ru.map_continent(inputs)
});
/**
* | output |
* | --- |
* | "Continents" |
*
* @param {Map_ContinentsInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_continents = /** @type {((inputs?: Map_ContinentsInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_ContinentsInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_continents(inputs)
	if (locale === "fr") return __fr.map_continents(inputs)
	if (locale === "es") return __es.map_continents(inputs)
	if (locale === "zh") return __zh.map_continents(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_continents(inputs)
	if (locale === "hi") return __hi.map_continents(inputs)
	if (locale === "ar") return __ar.map_continents(inputs)
	if (locale === "pt") return __pt.map_continents(inputs)
	if (locale === "de") return __de.map_continents(inputs)
	if (locale === "ja") return __ja.map_continents(inputs)
	if (locale === "ko") return __ko.map_continents(inputs)
	if (locale === "it") return __it.map_continents(inputs)
	if (locale === "tr") return __tr.map_continents(inputs)
	if (locale === "pl") return __pl.map_continents(inputs)
	if (locale === "uk") return __uk.map_continents(inputs)
	if (locale === "nl") return __nl.map_continents(inputs)
	if (locale === "vi") return __vi.map_continents(inputs)
	if (locale === "id") return __id.map_continents(inputs)
	if (locale === "ms") return __ms.map_continents(inputs)
	if (locale === "th") return __th.map_continents(inputs)
	if (locale === "fa") return __fa.map_continents(inputs)
	if (locale === "ur") return __ur.map_continents(inputs)
	if (locale === "bn") return __bn.map_continents(inputs)
	if (locale === "pa") return __pa.map_continents(inputs)
	if (locale === "sw") return __sw.map_continents(inputs)
	if (locale === "el") return __el.map_continents(inputs)
	if (locale === "cs") return __cs.map_continents(inputs)
	if (locale === "ro") return __ro.map_continents(inputs)
	if (locale === "hu") return __hu.map_continents(inputs)
	if (locale === "sv") return __sv.map_continents(inputs)
	if (locale === "he") return __he.map_continents(inputs)
	return __ru.map_continents(inputs)
});
/**
* | output |
* | --- |
* | "Countries" |
*
* @param {Map_CountriesInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_countries = /** @type {((inputs?: Map_CountriesInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_CountriesInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_countries(inputs)
	if (locale === "fr") return __fr.map_countries(inputs)
	if (locale === "es") return __es.map_countries(inputs)
	if (locale === "zh") return __zh.map_countries(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_countries(inputs)
	if (locale === "hi") return __hi.map_countries(inputs)
	if (locale === "ar") return __ar.map_countries(inputs)
	if (locale === "pt") return __pt.map_countries(inputs)
	if (locale === "de") return __de.map_countries(inputs)
	if (locale === "ja") return __ja.map_countries(inputs)
	if (locale === "ko") return __ko.map_countries(inputs)
	if (locale === "it") return __it.map_countries(inputs)
	if (locale === "tr") return __tr.map_countries(inputs)
	if (locale === "pl") return __pl.map_countries(inputs)
	if (locale === "uk") return __uk.map_countries(inputs)
	if (locale === "nl") return __nl.map_countries(inputs)
	if (locale === "vi") return __vi.map_countries(inputs)
	if (locale === "id") return __id.map_countries(inputs)
	if (locale === "ms") return __ms.map_countries(inputs)
	if (locale === "th") return __th.map_countries(inputs)
	if (locale === "fa") return __fa.map_countries(inputs)
	if (locale === "ur") return __ur.map_countries(inputs)
	if (locale === "bn") return __bn.map_countries(inputs)
	if (locale === "pa") return __pa.map_countries(inputs)
	if (locale === "sw") return __sw.map_countries(inputs)
	if (locale === "el") return __el.map_countries(inputs)
	if (locale === "cs") return __cs.map_countries(inputs)
	if (locale === "ro") return __ro.map_countries(inputs)
	if (locale === "hu") return __hu.map_countries(inputs)
	if (locale === "sv") return __sv.map_countries(inputs)
	if (locale === "he") return __he.map_countries(inputs)
	return __ru.map_countries(inputs)
});
/**
* | output |
* | --- |
* | "{n} available" |
*
* @param {Map_Countries_AvailableInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_countries_available = /** @type {((inputs: Map_Countries_AvailableInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Countries_AvailableInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_countries_available(inputs)
	if (locale === "fr") return __fr.map_countries_available(inputs)
	if (locale === "es") return __es.map_countries_available(inputs)
	if (locale === "zh") return __zh.map_countries_available(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_countries_available(inputs)
	if (locale === "hi") return __hi.map_countries_available(inputs)
	if (locale === "ar") return __ar.map_countries_available(inputs)
	if (locale === "pt") return __pt.map_countries_available(inputs)
	if (locale === "de") return __de.map_countries_available(inputs)
	if (locale === "ja") return __ja.map_countries_available(inputs)
	if (locale === "ko") return __ko.map_countries_available(inputs)
	if (locale === "it") return __it.map_countries_available(inputs)
	if (locale === "tr") return __tr.map_countries_available(inputs)
	if (locale === "pl") return __pl.map_countries_available(inputs)
	if (locale === "uk") return __uk.map_countries_available(inputs)
	if (locale === "nl") return __nl.map_countries_available(inputs)
	if (locale === "vi") return __vi.map_countries_available(inputs)
	if (locale === "id") return __id.map_countries_available(inputs)
	if (locale === "ms") return __ms.map_countries_available(inputs)
	if (locale === "th") return __th.map_countries_available(inputs)
	if (locale === "fa") return __fa.map_countries_available(inputs)
	if (locale === "ur") return __ur.map_countries_available(inputs)
	if (locale === "bn") return __bn.map_countries_available(inputs)
	if (locale === "pa") return __pa.map_countries_available(inputs)
	if (locale === "sw") return __sw.map_countries_available(inputs)
	if (locale === "el") return __el.map_countries_available(inputs)
	if (locale === "cs") return __cs.map_countries_available(inputs)
	if (locale === "ro") return __ro.map_countries_available(inputs)
	if (locale === "hu") return __hu.map_countries_available(inputs)
	if (locale === "sv") return __sv.map_countries_available(inputs)
	if (locale === "he") return __he.map_countries_available(inputs)
	return __ru.map_countries_available(inputs)
});
/**
* | output |
* | --- |
* | "{continent} · country" |
*
* @param {Map_Country_DotInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_country_dot = /** @type {((inputs: Map_Country_DotInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Country_DotInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_country_dot(inputs)
	if (locale === "fr") return __fr.map_country_dot(inputs)
	if (locale === "es") return __es.map_country_dot(inputs)
	if (locale === "zh") return __zh.map_country_dot(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_country_dot(inputs)
	if (locale === "hi") return __hi.map_country_dot(inputs)
	if (locale === "ar") return __ar.map_country_dot(inputs)
	if (locale === "pt") return __pt.map_country_dot(inputs)
	if (locale === "de") return __de.map_country_dot(inputs)
	if (locale === "ja") return __ja.map_country_dot(inputs)
	if (locale === "ko") return __ko.map_country_dot(inputs)
	if (locale === "it") return __it.map_country_dot(inputs)
	if (locale === "tr") return __tr.map_country_dot(inputs)
	if (locale === "pl") return __pl.map_country_dot(inputs)
	if (locale === "uk") return __uk.map_country_dot(inputs)
	if (locale === "nl") return __nl.map_country_dot(inputs)
	if (locale === "vi") return __vi.map_country_dot(inputs)
	if (locale === "id") return __id.map_country_dot(inputs)
	if (locale === "ms") return __ms.map_country_dot(inputs)
	if (locale === "th") return __th.map_country_dot(inputs)
	if (locale === "fa") return __fa.map_country_dot(inputs)
	if (locale === "ur") return __ur.map_country_dot(inputs)
	if (locale === "bn") return __bn.map_country_dot(inputs)
	if (locale === "pa") return __pa.map_country_dot(inputs)
	if (locale === "sw") return __sw.map_country_dot(inputs)
	if (locale === "el") return __el.map_country_dot(inputs)
	if (locale === "cs") return __cs.map_country_dot(inputs)
	if (locale === "ro") return __ro.map_country_dot(inputs)
	if (locale === "hu") return __hu.map_country_dot(inputs)
	if (locale === "sv") return __sv.map_country_dot(inputs)
	if (locale === "he") return __he.map_country_dot(inputs)
	return __ru.map_country_dot(inputs)
});
/**
* | output |
* | --- |
* | "Country not found on this continent" |
*
* @param {Map_Country_Not_FoundInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_country_not_found = /** @type {((inputs?: Map_Country_Not_FoundInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Country_Not_FoundInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_country_not_found(inputs)
	if (locale === "fr") return __fr.map_country_not_found(inputs)
	if (locale === "es") return __es.map_country_not_found(inputs)
	if (locale === "zh") return __zh.map_country_not_found(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_country_not_found(inputs)
	if (locale === "hi") return __hi.map_country_not_found(inputs)
	if (locale === "ar") return __ar.map_country_not_found(inputs)
	if (locale === "pt") return __pt.map_country_not_found(inputs)
	if (locale === "de") return __de.map_country_not_found(inputs)
	if (locale === "ja") return __ja.map_country_not_found(inputs)
	if (locale === "ko") return __ko.map_country_not_found(inputs)
	if (locale === "it") return __it.map_country_not_found(inputs)
	if (locale === "tr") return __tr.map_country_not_found(inputs)
	if (locale === "pl") return __pl.map_country_not_found(inputs)
	if (locale === "uk") return __uk.map_country_not_found(inputs)
	if (locale === "nl") return __nl.map_country_not_found(inputs)
	if (locale === "vi") return __vi.map_country_not_found(inputs)
	if (locale === "id") return __id.map_country_not_found(inputs)
	if (locale === "ms") return __ms.map_country_not_found(inputs)
	if (locale === "th") return __th.map_country_not_found(inputs)
	if (locale === "fa") return __fa.map_country_not_found(inputs)
	if (locale === "ur") return __ur.map_country_not_found(inputs)
	if (locale === "bn") return __bn.map_country_not_found(inputs)
	if (locale === "pa") return __pa.map_country_not_found(inputs)
	if (locale === "sw") return __sw.map_country_not_found(inputs)
	if (locale === "el") return __el.map_country_not_found(inputs)
	if (locale === "cs") return __cs.map_country_not_found(inputs)
	if (locale === "ro") return __ro.map_country_not_found(inputs)
	if (locale === "hu") return __hu.map_country_not_found(inputs)
	if (locale === "sv") return __sv.map_country_not_found(inputs)
	if (locale === "he") return __he.map_country_not_found(inputs)
	return __ru.map_country_not_found(inputs)
});
/**
* | output |
* | --- |
* | "Download the app" |
*
* @param {Map_Download_AppInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_download_app = /** @type {((inputs?: Map_Download_AppInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Download_AppInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_download_app(inputs)
	if (locale === "fr") return __fr.map_download_app(inputs)
	if (locale === "es") return __es.map_download_app(inputs)
	if (locale === "zh") return __zh.map_download_app(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_download_app(inputs)
	if (locale === "hi") return __hi.map_download_app(inputs)
	if (locale === "ar") return __ar.map_download_app(inputs)
	if (locale === "pt") return __pt.map_download_app(inputs)
	if (locale === "de") return __de.map_download_app(inputs)
	if (locale === "ja") return __ja.map_download_app(inputs)
	if (locale === "ko") return __ko.map_download_app(inputs)
	if (locale === "it") return __it.map_download_app(inputs)
	if (locale === "tr") return __tr.map_download_app(inputs)
	if (locale === "pl") return __pl.map_download_app(inputs)
	if (locale === "uk") return __uk.map_download_app(inputs)
	if (locale === "nl") return __nl.map_download_app(inputs)
	if (locale === "vi") return __vi.map_download_app(inputs)
	if (locale === "id") return __id.map_download_app(inputs)
	if (locale === "ms") return __ms.map_download_app(inputs)
	if (locale === "th") return __th.map_download_app(inputs)
	if (locale === "fa") return __fa.map_download_app(inputs)
	if (locale === "ur") return __ur.map_download_app(inputs)
	if (locale === "bn") return __bn.map_download_app(inputs)
	if (locale === "pa") return __pa.map_download_app(inputs)
	if (locale === "sw") return __sw.map_download_app(inputs)
	if (locale === "el") return __el.map_download_app(inputs)
	if (locale === "cs") return __cs.map_download_app(inputs)
	if (locale === "ro") return __ro.map_download_app(inputs)
	if (locale === "hu") return __hu.map_download_app(inputs)
	if (locale === "sv") return __sv.map_download_app(inputs)
	if (locale === "he") return __he.map_download_app(inputs)
	return __ru.map_download_app(inputs)
});
/**
* | output |
* | --- |
* | "Search work, workers and business" |
*
* @param {Map_Explorer_AriaInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_explorer_aria = /** @type {((inputs?: Map_Explorer_AriaInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Explorer_AriaInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_explorer_aria(inputs)
	if (locale === "fr") return __fr.map_explorer_aria(inputs)
	if (locale === "es") return __es.map_explorer_aria(inputs)
	if (locale === "zh") return __zh.map_explorer_aria(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_explorer_aria(inputs)
	if (locale === "hi") return __hi.map_explorer_aria(inputs)
	if (locale === "ar") return __ar.map_explorer_aria(inputs)
	if (locale === "pt") return __pt.map_explorer_aria(inputs)
	if (locale === "de") return __de.map_explorer_aria(inputs)
	if (locale === "ja") return __ja.map_explorer_aria(inputs)
	if (locale === "ko") return __ko.map_explorer_aria(inputs)
	if (locale === "it") return __it.map_explorer_aria(inputs)
	if (locale === "tr") return __tr.map_explorer_aria(inputs)
	if (locale === "pl") return __pl.map_explorer_aria(inputs)
	if (locale === "uk") return __uk.map_explorer_aria(inputs)
	if (locale === "nl") return __nl.map_explorer_aria(inputs)
	if (locale === "vi") return __vi.map_explorer_aria(inputs)
	if (locale === "id") return __id.map_explorer_aria(inputs)
	if (locale === "ms") return __ms.map_explorer_aria(inputs)
	if (locale === "th") return __th.map_explorer_aria(inputs)
	if (locale === "fa") return __fa.map_explorer_aria(inputs)
	if (locale === "ur") return __ur.map_explorer_aria(inputs)
	if (locale === "bn") return __bn.map_explorer_aria(inputs)
	if (locale === "pa") return __pa.map_explorer_aria(inputs)
	if (locale === "sw") return __sw.map_explorer_aria(inputs)
	if (locale === "el") return __el.map_explorer_aria(inputs)
	if (locale === "cs") return __cs.map_explorer_aria(inputs)
	if (locale === "ro") return __ro.map_explorer_aria(inputs)
	if (locale === "hu") return __hu.map_explorer_aria(inputs)
	if (locale === "sv") return __sv.map_explorer_aria(inputs)
	if (locale === "he") return __he.map_explorer_aria(inputs)
	return __ru.map_explorer_aria(inputs)
});
/**
* | output |
* | --- |
* | "Pick a category from the list or find a city" |
*
* @param {Map_Explorer_CopyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_explorer_copy = /** @type {((inputs?: Map_Explorer_CopyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Explorer_CopyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_explorer_copy(inputs)
	if (locale === "fr") return __fr.map_explorer_copy(inputs)
	if (locale === "es") return __es.map_explorer_copy(inputs)
	if (locale === "zh") return __zh.map_explorer_copy(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_explorer_copy(inputs)
	if (locale === "hi") return __hi.map_explorer_copy(inputs)
	if (locale === "ar") return __ar.map_explorer_copy(inputs)
	if (locale === "pt") return __pt.map_explorer_copy(inputs)
	if (locale === "de") return __de.map_explorer_copy(inputs)
	if (locale === "ja") return __ja.map_explorer_copy(inputs)
	if (locale === "ko") return __ko.map_explorer_copy(inputs)
	if (locale === "it") return __it.map_explorer_copy(inputs)
	if (locale === "tr") return __tr.map_explorer_copy(inputs)
	if (locale === "pl") return __pl.map_explorer_copy(inputs)
	if (locale === "uk") return __uk.map_explorer_copy(inputs)
	if (locale === "nl") return __nl.map_explorer_copy(inputs)
	if (locale === "vi") return __vi.map_explorer_copy(inputs)
	if (locale === "id") return __id.map_explorer_copy(inputs)
	if (locale === "ms") return __ms.map_explorer_copy(inputs)
	if (locale === "th") return __th.map_explorer_copy(inputs)
	if (locale === "fa") return __fa.map_explorer_copy(inputs)
	if (locale === "ur") return __ur.map_explorer_copy(inputs)
	if (locale === "bn") return __bn.map_explorer_copy(inputs)
	if (locale === "pa") return __pa.map_explorer_copy(inputs)
	if (locale === "sw") return __sw.map_explorer_copy(inputs)
	if (locale === "el") return __el.map_explorer_copy(inputs)
	if (locale === "cs") return __cs.map_explorer_copy(inputs)
	if (locale === "ro") return __ro.map_explorer_copy(inputs)
	if (locale === "hu") return __hu.map_explorer_copy(inputs)
	if (locale === "sv") return __sv.map_explorer_copy(inputs)
	if (locale === "he") return __he.map_explorer_copy(inputs)
	return __ru.map_explorer_copy(inputs)
});
/**
* | output |
* | --- |
* | "city, electrician, job…" |
*
* @param {Map_Explorer_PlaceholderInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_explorer_placeholder = /** @type {((inputs?: Map_Explorer_PlaceholderInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Explorer_PlaceholderInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_explorer_placeholder(inputs)
	if (locale === "fr") return __fr.map_explorer_placeholder(inputs)
	if (locale === "es") return __es.map_explorer_placeholder(inputs)
	if (locale === "zh") return __zh.map_explorer_placeholder(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_explorer_placeholder(inputs)
	if (locale === "hi") return __hi.map_explorer_placeholder(inputs)
	if (locale === "ar") return __ar.map_explorer_placeholder(inputs)
	if (locale === "pt") return __pt.map_explorer_placeholder(inputs)
	if (locale === "de") return __de.map_explorer_placeholder(inputs)
	if (locale === "ja") return __ja.map_explorer_placeholder(inputs)
	if (locale === "ko") return __ko.map_explorer_placeholder(inputs)
	if (locale === "it") return __it.map_explorer_placeholder(inputs)
	if (locale === "tr") return __tr.map_explorer_placeholder(inputs)
	if (locale === "pl") return __pl.map_explorer_placeholder(inputs)
	if (locale === "uk") return __uk.map_explorer_placeholder(inputs)
	if (locale === "nl") return __nl.map_explorer_placeholder(inputs)
	if (locale === "vi") return __vi.map_explorer_placeholder(inputs)
	if (locale === "id") return __id.map_explorer_placeholder(inputs)
	if (locale === "ms") return __ms.map_explorer_placeholder(inputs)
	if (locale === "th") return __th.map_explorer_placeholder(inputs)
	if (locale === "fa") return __fa.map_explorer_placeholder(inputs)
	if (locale === "ur") return __ur.map_explorer_placeholder(inputs)
	if (locale === "bn") return __bn.map_explorer_placeholder(inputs)
	if (locale === "pa") return __pa.map_explorer_placeholder(inputs)
	if (locale === "sw") return __sw.map_explorer_placeholder(inputs)
	if (locale === "el") return __el.map_explorer_placeholder(inputs)
	if (locale === "cs") return __cs.map_explorer_placeholder(inputs)
	if (locale === "ro") return __ro.map_explorer_placeholder(inputs)
	if (locale === "hu") return __hu.map_explorer_placeholder(inputs)
	if (locale === "sv") return __sv.map_explorer_placeholder(inputs)
	if (locale === "he") return __he.map_explorer_placeholder(inputs)
	return __ru.map_explorer_placeholder(inputs)
});
/**
* | output |
* | --- |
* | "Find a city in this country" |
*
* @param {Map_Find_CityInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_find_city = /** @type {((inputs?: Map_Find_CityInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Find_CityInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_find_city(inputs)
	if (locale === "fr") return __fr.map_find_city(inputs)
	if (locale === "es") return __es.map_find_city(inputs)
	if (locale === "zh") return __zh.map_find_city(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_find_city(inputs)
	if (locale === "hi") return __hi.map_find_city(inputs)
	if (locale === "ar") return __ar.map_find_city(inputs)
	if (locale === "pt") return __pt.map_find_city(inputs)
	if (locale === "de") return __de.map_find_city(inputs)
	if (locale === "ja") return __ja.map_find_city(inputs)
	if (locale === "ko") return __ko.map_find_city(inputs)
	if (locale === "it") return __it.map_find_city(inputs)
	if (locale === "tr") return __tr.map_find_city(inputs)
	if (locale === "pl") return __pl.map_find_city(inputs)
	if (locale === "uk") return __uk.map_find_city(inputs)
	if (locale === "nl") return __nl.map_find_city(inputs)
	if (locale === "vi") return __vi.map_find_city(inputs)
	if (locale === "id") return __id.map_find_city(inputs)
	if (locale === "ms") return __ms.map_find_city(inputs)
	if (locale === "th") return __th.map_find_city(inputs)
	if (locale === "fa") return __fa.map_find_city(inputs)
	if (locale === "ur") return __ur.map_find_city(inputs)
	if (locale === "bn") return __bn.map_find_city(inputs)
	if (locale === "pa") return __pa.map_find_city(inputs)
	if (locale === "sw") return __sw.map_find_city(inputs)
	if (locale === "el") return __el.map_find_city(inputs)
	if (locale === "cs") return __cs.map_find_city(inputs)
	if (locale === "ro") return __ro.map_find_city(inputs)
	if (locale === "hu") return __hu.map_find_city(inputs)
	if (locale === "sv") return __sv.map_find_city(inputs)
	if (locale === "he") return __he.map_find_city(inputs)
	return __ru.map_find_city(inputs)
});
/**
* | output |
* | --- |
* | "Find a country on this continent" |
*
* @param {Map_Find_CountryInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_find_country = /** @type {((inputs?: Map_Find_CountryInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Find_CountryInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_find_country(inputs)
	if (locale === "fr") return __fr.map_find_country(inputs)
	if (locale === "es") return __es.map_find_country(inputs)
	if (locale === "zh") return __zh.map_find_country(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_find_country(inputs)
	if (locale === "hi") return __hi.map_find_country(inputs)
	if (locale === "ar") return __ar.map_find_country(inputs)
	if (locale === "pt") return __pt.map_find_country(inputs)
	if (locale === "de") return __de.map_find_country(inputs)
	if (locale === "ja") return __ja.map_find_country(inputs)
	if (locale === "ko") return __ko.map_find_country(inputs)
	if (locale === "it") return __it.map_find_country(inputs)
	if (locale === "tr") return __tr.map_find_country(inputs)
	if (locale === "pl") return __pl.map_find_country(inputs)
	if (locale === "uk") return __uk.map_find_country(inputs)
	if (locale === "nl") return __nl.map_find_country(inputs)
	if (locale === "vi") return __vi.map_find_country(inputs)
	if (locale === "id") return __id.map_find_country(inputs)
	if (locale === "ms") return __ms.map_find_country(inputs)
	if (locale === "th") return __th.map_find_country(inputs)
	if (locale === "fa") return __fa.map_find_country(inputs)
	if (locale === "ur") return __ur.map_find_country(inputs)
	if (locale === "bn") return __bn.map_find_country(inputs)
	if (locale === "pa") return __pa.map_find_country(inputs)
	if (locale === "sw") return __sw.map_find_country(inputs)
	if (locale === "el") return __el.map_find_country(inputs)
	if (locale === "cs") return __cs.map_find_country(inputs)
	if (locale === "ro") return __ro.map_find_country(inputs)
	if (locale === "hu") return __hu.map_find_country(inputs)
	if (locale === "sv") return __sv.map_find_country(inputs)
	if (locale === "he") return __he.map_find_country(inputs)
	return __ru.map_find_country(inputs)
});
/**
* | output |
* | --- |
* | "What to find in this city?" |
*
* @param {Map_Find_In_CityInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_find_in_city = /** @type {((inputs?: Map_Find_In_CityInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Find_In_CityInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_find_in_city(inputs)
	if (locale === "fr") return __fr.map_find_in_city(inputs)
	if (locale === "es") return __es.map_find_in_city(inputs)
	if (locale === "zh") return __zh.map_find_in_city(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_find_in_city(inputs)
	if (locale === "hi") return __hi.map_find_in_city(inputs)
	if (locale === "ar") return __ar.map_find_in_city(inputs)
	if (locale === "pt") return __pt.map_find_in_city(inputs)
	if (locale === "de") return __de.map_find_in_city(inputs)
	if (locale === "ja") return __ja.map_find_in_city(inputs)
	if (locale === "ko") return __ko.map_find_in_city(inputs)
	if (locale === "it") return __it.map_find_in_city(inputs)
	if (locale === "tr") return __tr.map_find_in_city(inputs)
	if (locale === "pl") return __pl.map_find_in_city(inputs)
	if (locale === "uk") return __uk.map_find_in_city(inputs)
	if (locale === "nl") return __nl.map_find_in_city(inputs)
	if (locale === "vi") return __vi.map_find_in_city(inputs)
	if (locale === "id") return __id.map_find_in_city(inputs)
	if (locale === "ms") return __ms.map_find_in_city(inputs)
	if (locale === "th") return __th.map_find_in_city(inputs)
	if (locale === "fa") return __fa.map_find_in_city(inputs)
	if (locale === "ur") return __ur.map_find_in_city(inputs)
	if (locale === "bn") return __bn.map_find_in_city(inputs)
	if (locale === "pa") return __pa.map_find_in_city(inputs)
	if (locale === "sw") return __sw.map_find_in_city(inputs)
	if (locale === "el") return __el.map_find_in_city(inputs)
	if (locale === "cs") return __cs.map_find_in_city(inputs)
	if (locale === "ro") return __ro.map_find_in_city(inputs)
	if (locale === "hu") return __hu.map_find_in_city(inputs)
	if (locale === "sv") return __sv.map_find_in_city(inputs)
	if (locale === "he") return __he.map_find_in_city(inputs)
	return __ru.map_find_in_city(inputs)
});
/**
* | output |
* | --- |
* | "Found: {n}" |
*
* @param {Map_Found_NInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_found_n = /** @type {((inputs: Map_Found_NInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Found_NInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_found_n(inputs)
	if (locale === "fr") return __fr.map_found_n(inputs)
	if (locale === "es") return __es.map_found_n(inputs)
	if (locale === "zh") return __zh.map_found_n(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_found_n(inputs)
	if (locale === "hi") return __hi.map_found_n(inputs)
	if (locale === "ar") return __ar.map_found_n(inputs)
	if (locale === "pt") return __pt.map_found_n(inputs)
	if (locale === "de") return __de.map_found_n(inputs)
	if (locale === "ja") return __ja.map_found_n(inputs)
	if (locale === "ko") return __ko.map_found_n(inputs)
	if (locale === "it") return __it.map_found_n(inputs)
	if (locale === "tr") return __tr.map_found_n(inputs)
	if (locale === "pl") return __pl.map_found_n(inputs)
	if (locale === "uk") return __uk.map_found_n(inputs)
	if (locale === "nl") return __nl.map_found_n(inputs)
	if (locale === "vi") return __vi.map_found_n(inputs)
	if (locale === "id") return __id.map_found_n(inputs)
	if (locale === "ms") return __ms.map_found_n(inputs)
	if (locale === "th") return __th.map_found_n(inputs)
	if (locale === "fa") return __fa.map_found_n(inputs)
	if (locale === "ur") return __ur.map_found_n(inputs)
	if (locale === "bn") return __bn.map_found_n(inputs)
	if (locale === "pa") return __pa.map_found_n(inputs)
	if (locale === "sw") return __sw.map_found_n(inputs)
	if (locale === "el") return __el.map_found_n(inputs)
	if (locale === "cs") return __cs.map_found_n(inputs)
	if (locale === "ro") return __ro.map_found_n(inputs)
	if (locale === "hu") return __hu.map_found_n(inputs)
	if (locale === "sv") return __sv.map_found_n(inputs)
	if (locale === "he") return __he.map_found_n(inputs)
	return __ru.map_found_n(inputs)
});
/**
* | output |
* | --- |
* | "Pick a continent. Then country, city and listings." |
*
* @param {Map_Global_LeadInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_global_lead = /** @type {((inputs?: Map_Global_LeadInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Global_LeadInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_global_lead(inputs)
	if (locale === "fr") return __fr.map_global_lead(inputs)
	if (locale === "es") return __es.map_global_lead(inputs)
	if (locale === "zh") return __zh.map_global_lead(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_global_lead(inputs)
	if (locale === "hi") return __hi.map_global_lead(inputs)
	if (locale === "ar") return __ar.map_global_lead(inputs)
	if (locale === "pt") return __pt.map_global_lead(inputs)
	if (locale === "de") return __de.map_global_lead(inputs)
	if (locale === "ja") return __ja.map_global_lead(inputs)
	if (locale === "ko") return __ko.map_global_lead(inputs)
	if (locale === "it") return __it.map_global_lead(inputs)
	if (locale === "tr") return __tr.map_global_lead(inputs)
	if (locale === "pl") return __pl.map_global_lead(inputs)
	if (locale === "uk") return __uk.map_global_lead(inputs)
	if (locale === "nl") return __nl.map_global_lead(inputs)
	if (locale === "vi") return __vi.map_global_lead(inputs)
	if (locale === "id") return __id.map_global_lead(inputs)
	if (locale === "ms") return __ms.map_global_lead(inputs)
	if (locale === "th") return __th.map_global_lead(inputs)
	if (locale === "fa") return __fa.map_global_lead(inputs)
	if (locale === "ur") return __ur.map_global_lead(inputs)
	if (locale === "bn") return __bn.map_global_lead(inputs)
	if (locale === "pa") return __pa.map_global_lead(inputs)
	if (locale === "sw") return __sw.map_global_lead(inputs)
	if (locale === "el") return __el.map_global_lead(inputs)
	if (locale === "cs") return __cs.map_global_lead(inputs)
	if (locale === "ro") return __ro.map_global_lead(inputs)
	if (locale === "hu") return __hu.map_global_lead(inputs)
	if (locale === "sv") return __sv.map_global_lead(inputs)
	if (locale === "he") return __he.map_global_lead(inputs)
	return __ru.map_global_lead(inputs)
});
/**
* | output |
* | --- |
* | "World map" |
*
* @param {Map_Global_TitleInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_global_title = /** @type {((inputs?: Map_Global_TitleInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Global_TitleInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_global_title(inputs)
	if (locale === "fr") return __fr.map_global_title(inputs)
	if (locale === "es") return __es.map_global_title(inputs)
	if (locale === "zh") return __zh.map_global_title(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_global_title(inputs)
	if (locale === "hi") return __hi.map_global_title(inputs)
	if (locale === "ar") return __ar.map_global_title(inputs)
	if (locale === "pt") return __pt.map_global_title(inputs)
	if (locale === "de") return __de.map_global_title(inputs)
	if (locale === "ja") return __ja.map_global_title(inputs)
	if (locale === "ko") return __ko.map_global_title(inputs)
	if (locale === "it") return __it.map_global_title(inputs)
	if (locale === "tr") return __tr.map_global_title(inputs)
	if (locale === "pl") return __pl.map_global_title(inputs)
	if (locale === "uk") return __uk.map_global_title(inputs)
	if (locale === "nl") return __nl.map_global_title(inputs)
	if (locale === "vi") return __vi.map_global_title(inputs)
	if (locale === "id") return __id.map_global_title(inputs)
	if (locale === "ms") return __ms.map_global_title(inputs)
	if (locale === "th") return __th.map_global_title(inputs)
	if (locale === "fa") return __fa.map_global_title(inputs)
	if (locale === "ur") return __ur.map_global_title(inputs)
	if (locale === "bn") return __bn.map_global_title(inputs)
	if (locale === "pa") return __pa.map_global_title(inputs)
	if (locale === "sw") return __sw.map_global_title(inputs)
	if (locale === "el") return __el.map_global_title(inputs)
	if (locale === "cs") return __cs.map_global_title(inputs)
	if (locale === "ro") return __ro.map_global_title(inputs)
	if (locale === "hu") return __hu.map_global_title(inputs)
	if (locale === "sv") return __sv.map_global_title(inputs)
	if (locale === "he") return __he.map_global_title(inputs)
	return __ru.map_global_title(inputs)
});
/**
* | output |
* | --- |
* | "Work, workers and business — find what you need nearby." |
*
* @param {Map_Home_LeadInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_home_lead = /** @type {((inputs?: Map_Home_LeadInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Home_LeadInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_home_lead(inputs)
	if (locale === "fr") return __fr.map_home_lead(inputs)
	if (locale === "es") return __es.map_home_lead(inputs)
	if (locale === "zh") return __zh.map_home_lead(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_home_lead(inputs)
	if (locale === "hi") return __hi.map_home_lead(inputs)
	if (locale === "ar") return __ar.map_home_lead(inputs)
	if (locale === "pt") return __pt.map_home_lead(inputs)
	if (locale === "de") return __de.map_home_lead(inputs)
	if (locale === "ja") return __ja.map_home_lead(inputs)
	if (locale === "ko") return __ko.map_home_lead(inputs)
	if (locale === "it") return __it.map_home_lead(inputs)
	if (locale === "tr") return __tr.map_home_lead(inputs)
	if (locale === "pl") return __pl.map_home_lead(inputs)
	if (locale === "uk") return __uk.map_home_lead(inputs)
	if (locale === "nl") return __nl.map_home_lead(inputs)
	if (locale === "vi") return __vi.map_home_lead(inputs)
	if (locale === "id") return __id.map_home_lead(inputs)
	if (locale === "ms") return __ms.map_home_lead(inputs)
	if (locale === "th") return __th.map_home_lead(inputs)
	if (locale === "fa") return __fa.map_home_lead(inputs)
	if (locale === "ur") return __ur.map_home_lead(inputs)
	if (locale === "bn") return __bn.map_home_lead(inputs)
	if (locale === "pa") return __pa.map_home_lead(inputs)
	if (locale === "sw") return __sw.map_home_lead(inputs)
	if (locale === "el") return __el.map_home_lead(inputs)
	if (locale === "cs") return __cs.map_home_lead(inputs)
	if (locale === "ro") return __ro.map_home_lead(inputs)
	if (locale === "hu") return __hu.map_home_lead(inputs)
	if (locale === "sv") return __sv.map_home_lead(inputs)
	if (locale === "he") return __he.map_home_lead(inputs)
	return __ru.map_home_lead(inputs)
});
/**
* | output |
* | --- |
* | "Show more cities" |
*
* @param {Map_More_CitiesInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_more_cities = /** @type {((inputs?: Map_More_CitiesInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_More_CitiesInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_more_cities(inputs)
	if (locale === "fr") return __fr.map_more_cities(inputs)
	if (locale === "es") return __es.map_more_cities(inputs)
	if (locale === "zh") return __zh.map_more_cities(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_more_cities(inputs)
	if (locale === "hi") return __hi.map_more_cities(inputs)
	if (locale === "ar") return __ar.map_more_cities(inputs)
	if (locale === "pt") return __pt.map_more_cities(inputs)
	if (locale === "de") return __de.map_more_cities(inputs)
	if (locale === "ja") return __ja.map_more_cities(inputs)
	if (locale === "ko") return __ko.map_more_cities(inputs)
	if (locale === "it") return __it.map_more_cities(inputs)
	if (locale === "tr") return __tr.map_more_cities(inputs)
	if (locale === "pl") return __pl.map_more_cities(inputs)
	if (locale === "uk") return __uk.map_more_cities(inputs)
	if (locale === "nl") return __nl.map_more_cities(inputs)
	if (locale === "vi") return __vi.map_more_cities(inputs)
	if (locale === "id") return __id.map_more_cities(inputs)
	if (locale === "ms") return __ms.map_more_cities(inputs)
	if (locale === "th") return __th.map_more_cities(inputs)
	if (locale === "fa") return __fa.map_more_cities(inputs)
	if (locale === "ur") return __ur.map_more_cities(inputs)
	if (locale === "bn") return __bn.map_more_cities(inputs)
	if (locale === "pa") return __pa.map_more_cities(inputs)
	if (locale === "sw") return __sw.map_more_cities(inputs)
	if (locale === "el") return __el.map_more_cities(inputs)
	if (locale === "cs") return __cs.map_more_cities(inputs)
	if (locale === "ro") return __ro.map_more_cities(inputs)
	if (locale === "hu") return __hu.map_more_cities(inputs)
	if (locale === "sv") return __sv.map_more_cities(inputs)
	if (locale === "he") return __he.map_more_cities(inputs)
	return __ru.map_more_cities(inputs)
});
/**
* | output |
* | --- |
* | "{n} cities" |
*
* @param {Map_N_CitiesInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_n_cities = /** @type {((inputs: Map_N_CitiesInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_N_CitiesInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_n_cities(inputs)
	if (locale === "fr") return __fr.map_n_cities(inputs)
	if (locale === "es") return __es.map_n_cities(inputs)
	if (locale === "zh") return __zh.map_n_cities(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_n_cities(inputs)
	if (locale === "hi") return __hi.map_n_cities(inputs)
	if (locale === "ar") return __ar.map_n_cities(inputs)
	if (locale === "pt") return __pt.map_n_cities(inputs)
	if (locale === "de") return __de.map_n_cities(inputs)
	if (locale === "ja") return __ja.map_n_cities(inputs)
	if (locale === "ko") return __ko.map_n_cities(inputs)
	if (locale === "it") return __it.map_n_cities(inputs)
	if (locale === "tr") return __tr.map_n_cities(inputs)
	if (locale === "pl") return __pl.map_n_cities(inputs)
	if (locale === "uk") return __uk.map_n_cities(inputs)
	if (locale === "nl") return __nl.map_n_cities(inputs)
	if (locale === "vi") return __vi.map_n_cities(inputs)
	if (locale === "id") return __id.map_n_cities(inputs)
	if (locale === "ms") return __ms.map_n_cities(inputs)
	if (locale === "th") return __th.map_n_cities(inputs)
	if (locale === "fa") return __fa.map_n_cities(inputs)
	if (locale === "ur") return __ur.map_n_cities(inputs)
	if (locale === "bn") return __bn.map_n_cities(inputs)
	if (locale === "pa") return __pa.map_n_cities(inputs)
	if (locale === "sw") return __sw.map_n_cities(inputs)
	if (locale === "el") return __el.map_n_cities(inputs)
	if (locale === "cs") return __cs.map_n_cities(inputs)
	if (locale === "ro") return __ro.map_n_cities(inputs)
	if (locale === "hu") return __hu.map_n_cities(inputs)
	if (locale === "sv") return __sv.map_n_cities(inputs)
	if (locale === "he") return __he.map_n_cities(inputs)
	return __ru.map_n_cities(inputs)
});
/**
* | output |
* | --- |
* | "{n} countries" |
*
* @param {Map_N_CountriesInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_n_countries = /** @type {((inputs: Map_N_CountriesInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_N_CountriesInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_n_countries(inputs)
	if (locale === "fr") return __fr.map_n_countries(inputs)
	if (locale === "es") return __es.map_n_countries(inputs)
	if (locale === "zh") return __zh.map_n_countries(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_n_countries(inputs)
	if (locale === "hi") return __hi.map_n_countries(inputs)
	if (locale === "ar") return __ar.map_n_countries(inputs)
	if (locale === "pt") return __pt.map_n_countries(inputs)
	if (locale === "de") return __de.map_n_countries(inputs)
	if (locale === "ja") return __ja.map_n_countries(inputs)
	if (locale === "ko") return __ko.map_n_countries(inputs)
	if (locale === "it") return __it.map_n_countries(inputs)
	if (locale === "tr") return __tr.map_n_countries(inputs)
	if (locale === "pl") return __pl.map_n_countries(inputs)
	if (locale === "uk") return __uk.map_n_countries(inputs)
	if (locale === "nl") return __nl.map_n_countries(inputs)
	if (locale === "vi") return __vi.map_n_countries(inputs)
	if (locale === "id") return __id.map_n_countries(inputs)
	if (locale === "ms") return __ms.map_n_countries(inputs)
	if (locale === "th") return __th.map_n_countries(inputs)
	if (locale === "fa") return __fa.map_n_countries(inputs)
	if (locale === "ur") return __ur.map_n_countries(inputs)
	if (locale === "bn") return __bn.map_n_countries(inputs)
	if (locale === "pa") return __pa.map_n_countries(inputs)
	if (locale === "sw") return __sw.map_n_countries(inputs)
	if (locale === "el") return __el.map_n_countries(inputs)
	if (locale === "cs") return __cs.map_n_countries(inputs)
	if (locale === "ro") return __ro.map_n_countries(inputs)
	if (locale === "hu") return __hu.map_n_countries(inputs)
	if (locale === "sv") return __sv.map_n_countries(inputs)
	if (locale === "he") return __he.map_n_countries(inputs)
	return __ru.map_n_countries(inputs)
});
/**
* | output |
* | --- |
* | "{n} listings" |
*
* @param {Map_N_ListingsInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_n_listings = /** @type {((inputs: Map_N_ListingsInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_N_ListingsInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_n_listings(inputs)
	if (locale === "fr") return __fr.map_n_listings(inputs)
	if (locale === "es") return __es.map_n_listings(inputs)
	if (locale === "zh") return __zh.map_n_listings(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_n_listings(inputs)
	if (locale === "hi") return __hi.map_n_listings(inputs)
	if (locale === "ar") return __ar.map_n_listings(inputs)
	if (locale === "pt") return __pt.map_n_listings(inputs)
	if (locale === "de") return __de.map_n_listings(inputs)
	if (locale === "ja") return __ja.map_n_listings(inputs)
	if (locale === "ko") return __ko.map_n_listings(inputs)
	if (locale === "it") return __it.map_n_listings(inputs)
	if (locale === "tr") return __tr.map_n_listings(inputs)
	if (locale === "pl") return __pl.map_n_listings(inputs)
	if (locale === "uk") return __uk.map_n_listings(inputs)
	if (locale === "nl") return __nl.map_n_listings(inputs)
	if (locale === "vi") return __vi.map_n_listings(inputs)
	if (locale === "id") return __id.map_n_listings(inputs)
	if (locale === "ms") return __ms.map_n_listings(inputs)
	if (locale === "th") return __th.map_n_listings(inputs)
	if (locale === "fa") return __fa.map_n_listings(inputs)
	if (locale === "ur") return __ur.map_n_listings(inputs)
	if (locale === "bn") return __bn.map_n_listings(inputs)
	if (locale === "pa") return __pa.map_n_listings(inputs)
	if (locale === "sw") return __sw.map_n_listings(inputs)
	if (locale === "el") return __el.map_n_listings(inputs)
	if (locale === "cs") return __cs.map_n_listings(inputs)
	if (locale === "ro") return __ro.map_n_listings(inputs)
	if (locale === "hu") return __hu.map_n_listings(inputs)
	if (locale === "sv") return __sv.map_n_listings(inputs)
	if (locale === "he") return __he.map_n_listings(inputs)
	return __ru.map_n_listings(inputs)
});
/**
* | output |
* | --- |
* | "{n} members" |
*
* @param {Map_N_MembersInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_n_members = /** @type {((inputs: Map_N_MembersInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_N_MembersInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_n_members(inputs)
	if (locale === "fr") return __fr.map_n_members(inputs)
	if (locale === "es") return __es.map_n_members(inputs)
	if (locale === "zh") return __zh.map_n_members(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_n_members(inputs)
	if (locale === "hi") return __hi.map_n_members(inputs)
	if (locale === "ar") return __ar.map_n_members(inputs)
	if (locale === "pt") return __pt.map_n_members(inputs)
	if (locale === "de") return __de.map_n_members(inputs)
	if (locale === "ja") return __ja.map_n_members(inputs)
	if (locale === "ko") return __ko.map_n_members(inputs)
	if (locale === "it") return __it.map_n_members(inputs)
	if (locale === "tr") return __tr.map_n_members(inputs)
	if (locale === "pl") return __pl.map_n_members(inputs)
	if (locale === "uk") return __uk.map_n_members(inputs)
	if (locale === "nl") return __nl.map_n_members(inputs)
	if (locale === "vi") return __vi.map_n_members(inputs)
	if (locale === "id") return __id.map_n_members(inputs)
	if (locale === "ms") return __ms.map_n_members(inputs)
	if (locale === "th") return __th.map_n_members(inputs)
	if (locale === "fa") return __fa.map_n_members(inputs)
	if (locale === "ur") return __ur.map_n_members(inputs)
	if (locale === "bn") return __bn.map_n_members(inputs)
	if (locale === "pa") return __pa.map_n_members(inputs)
	if (locale === "sw") return __sw.map_n_members(inputs)
	if (locale === "el") return __el.map_n_members(inputs)
	if (locale === "cs") return __cs.map_n_members(inputs)
	if (locale === "ro") return __ro.map_n_members(inputs)
	if (locale === "hu") return __hu.map_n_members(inputs)
	if (locale === "sv") return __sv.map_n_members(inputs)
	if (locale === "he") return __he.map_n_members(inputs)
	return __ru.map_n_members(inputs)
});
/**
* | output |
* | --- |
* | "{n} professions" |
*
* @param {Map_N_ProfessionsInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_n_professions = /** @type {((inputs: Map_N_ProfessionsInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_N_ProfessionsInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_n_professions(inputs)
	if (locale === "fr") return __fr.map_n_professions(inputs)
	if (locale === "es") return __es.map_n_professions(inputs)
	if (locale === "zh") return __zh.map_n_professions(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_n_professions(inputs)
	if (locale === "hi") return __hi.map_n_professions(inputs)
	if (locale === "ar") return __ar.map_n_professions(inputs)
	if (locale === "pt") return __pt.map_n_professions(inputs)
	if (locale === "de") return __de.map_n_professions(inputs)
	if (locale === "ja") return __ja.map_n_professions(inputs)
	if (locale === "ko") return __ko.map_n_professions(inputs)
	if (locale === "it") return __it.map_n_professions(inputs)
	if (locale === "tr") return __tr.map_n_professions(inputs)
	if (locale === "pl") return __pl.map_n_professions(inputs)
	if (locale === "uk") return __uk.map_n_professions(inputs)
	if (locale === "nl") return __nl.map_n_professions(inputs)
	if (locale === "vi") return __vi.map_n_professions(inputs)
	if (locale === "id") return __id.map_n_professions(inputs)
	if (locale === "ms") return __ms.map_n_professions(inputs)
	if (locale === "th") return __th.map_n_professions(inputs)
	if (locale === "fa") return __fa.map_n_professions(inputs)
	if (locale === "ur") return __ur.map_n_professions(inputs)
	if (locale === "bn") return __bn.map_n_professions(inputs)
	if (locale === "pa") return __pa.map_n_professions(inputs)
	if (locale === "sw") return __sw.map_n_professions(inputs)
	if (locale === "el") return __el.map_n_professions(inputs)
	if (locale === "cs") return __cs.map_n_professions(inputs)
	if (locale === "ro") return __ro.map_n_professions(inputs)
	if (locale === "hu") return __hu.map_n_professions(inputs)
	if (locale === "sv") return __sv.map_n_professions(inputs)
	if (locale === "he") return __he.map_n_professions(inputs)
	return __ru.map_n_professions(inputs)
});
/**
* | output |
* | --- |
* | "Looking or offering — all inside the city" |
*
* @param {Map_Need_LeadInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_need_lead = /** @type {((inputs?: Map_Need_LeadInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Need_LeadInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_need_lead(inputs)
	if (locale === "fr") return __fr.map_need_lead(inputs)
	if (locale === "es") return __es.map_need_lead(inputs)
	if (locale === "zh") return __zh.map_need_lead(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_need_lead(inputs)
	if (locale === "hi") return __hi.map_need_lead(inputs)
	if (locale === "ar") return __ar.map_need_lead(inputs)
	if (locale === "pt") return __pt.map_need_lead(inputs)
	if (locale === "de") return __de.map_need_lead(inputs)
	if (locale === "ja") return __ja.map_need_lead(inputs)
	if (locale === "ko") return __ko.map_need_lead(inputs)
	if (locale === "it") return __it.map_need_lead(inputs)
	if (locale === "tr") return __tr.map_need_lead(inputs)
	if (locale === "pl") return __pl.map_need_lead(inputs)
	if (locale === "uk") return __uk.map_need_lead(inputs)
	if (locale === "nl") return __nl.map_need_lead(inputs)
	if (locale === "vi") return __vi.map_need_lead(inputs)
	if (locale === "id") return __id.map_need_lead(inputs)
	if (locale === "ms") return __ms.map_need_lead(inputs)
	if (locale === "th") return __th.map_need_lead(inputs)
	if (locale === "fa") return __fa.map_need_lead(inputs)
	if (locale === "ur") return __ur.map_need_lead(inputs)
	if (locale === "bn") return __bn.map_need_lead(inputs)
	if (locale === "pa") return __pa.map_need_lead(inputs)
	if (locale === "sw") return __sw.map_need_lead(inputs)
	if (locale === "el") return __el.map_need_lead(inputs)
	if (locale === "cs") return __cs.map_need_lead(inputs)
	if (locale === "ro") return __ro.map_need_lead(inputs)
	if (locale === "hu") return __hu.map_need_lead(inputs)
	if (locale === "sv") return __sv.map_need_lead(inputs)
	if (locale === "he") return __he.map_need_lead(inputs)
	return __ru.map_need_lead(inputs)
});
/**
* | output |
* | --- |
* | "What do you need" |
*
* @param {Map_Need_TitleInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_need_title = /** @type {((inputs?: Map_Need_TitleInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Need_TitleInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_need_title(inputs)
	if (locale === "fr") return __fr.map_need_title(inputs)
	if (locale === "es") return __es.map_need_title(inputs)
	if (locale === "zh") return __zh.map_need_title(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_need_title(inputs)
	if (locale === "hi") return __hi.map_need_title(inputs)
	if (locale === "ar") return __ar.map_need_title(inputs)
	if (locale === "pt") return __pt.map_need_title(inputs)
	if (locale === "de") return __de.map_need_title(inputs)
	if (locale === "ja") return __ja.map_need_title(inputs)
	if (locale === "ko") return __ko.map_need_title(inputs)
	if (locale === "it") return __it.map_need_title(inputs)
	if (locale === "tr") return __tr.map_need_title(inputs)
	if (locale === "pl") return __pl.map_need_title(inputs)
	if (locale === "uk") return __uk.map_need_title(inputs)
	if (locale === "nl") return __nl.map_need_title(inputs)
	if (locale === "vi") return __vi.map_need_title(inputs)
	if (locale === "id") return __id.map_need_title(inputs)
	if (locale === "ms") return __ms.map_need_title(inputs)
	if (locale === "th") return __th.map_need_title(inputs)
	if (locale === "fa") return __fa.map_need_title(inputs)
	if (locale === "ur") return __ur.map_need_title(inputs)
	if (locale === "bn") return __bn.map_need_title(inputs)
	if (locale === "pa") return __pa.map_need_title(inputs)
	if (locale === "sw") return __sw.map_need_title(inputs)
	if (locale === "el") return __el.map_need_title(inputs)
	if (locale === "cs") return __cs.map_need_title(inputs)
	if (locale === "ro") return __ro.map_need_title(inputs)
	if (locale === "hu") return __hu.map_need_title(inputs)
	if (locale === "sv") return __sv.map_need_title(inputs)
	if (locale === "he") return __he.map_need_title(inputs)
	return __ru.map_need_title(inputs)
});
/**
* | output |
* | --- |
* | "Open cities" |
*
* @param {Map_Open_CitiesInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_open_cities = /** @type {((inputs?: Map_Open_CitiesInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Open_CitiesInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_open_cities(inputs)
	if (locale === "fr") return __fr.map_open_cities(inputs)
	if (locale === "es") return __es.map_open_cities(inputs)
	if (locale === "zh") return __zh.map_open_cities(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_open_cities(inputs)
	if (locale === "hi") return __hi.map_open_cities(inputs)
	if (locale === "ar") return __ar.map_open_cities(inputs)
	if (locale === "pt") return __pt.map_open_cities(inputs)
	if (locale === "de") return __de.map_open_cities(inputs)
	if (locale === "ja") return __ja.map_open_cities(inputs)
	if (locale === "ko") return __ko.map_open_cities(inputs)
	if (locale === "it") return __it.map_open_cities(inputs)
	if (locale === "tr") return __tr.map_open_cities(inputs)
	if (locale === "pl") return __pl.map_open_cities(inputs)
	if (locale === "uk") return __uk.map_open_cities(inputs)
	if (locale === "nl") return __nl.map_open_cities(inputs)
	if (locale === "vi") return __vi.map_open_cities(inputs)
	if (locale === "id") return __id.map_open_cities(inputs)
	if (locale === "ms") return __ms.map_open_cities(inputs)
	if (locale === "th") return __th.map_open_cities(inputs)
	if (locale === "fa") return __fa.map_open_cities(inputs)
	if (locale === "ur") return __ur.map_open_cities(inputs)
	if (locale === "bn") return __bn.map_open_cities(inputs)
	if (locale === "pa") return __pa.map_open_cities(inputs)
	if (locale === "sw") return __sw.map_open_cities(inputs)
	if (locale === "el") return __el.map_open_cities(inputs)
	if (locale === "cs") return __cs.map_open_cities(inputs)
	if (locale === "ro") return __ro.map_open_cities(inputs)
	if (locale === "hu") return __hu.map_open_cities(inputs)
	if (locale === "sv") return __sv.map_open_cities(inputs)
	if (locale === "he") return __he.map_open_cities(inputs)
	return __ru.map_open_cities(inputs)
});
/**
* | output |
* | --- |
* | "Choose a country to continue" |
*
* @param {Map_Pick_CountryInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_pick_country = /** @type {((inputs?: Map_Pick_CountryInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Pick_CountryInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_pick_country(inputs)
	if (locale === "fr") return __fr.map_pick_country(inputs)
	if (locale === "es") return __es.map_pick_country(inputs)
	if (locale === "zh") return __zh.map_pick_country(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_pick_country(inputs)
	if (locale === "hi") return __hi.map_pick_country(inputs)
	if (locale === "ar") return __ar.map_pick_country(inputs)
	if (locale === "pt") return __pt.map_pick_country(inputs)
	if (locale === "de") return __de.map_pick_country(inputs)
	if (locale === "ja") return __ja.map_pick_country(inputs)
	if (locale === "ko") return __ko.map_pick_country(inputs)
	if (locale === "it") return __it.map_pick_country(inputs)
	if (locale === "tr") return __tr.map_pick_country(inputs)
	if (locale === "pl") return __pl.map_pick_country(inputs)
	if (locale === "uk") return __uk.map_pick_country(inputs)
	if (locale === "nl") return __nl.map_pick_country(inputs)
	if (locale === "vi") return __vi.map_pick_country(inputs)
	if (locale === "id") return __id.map_pick_country(inputs)
	if (locale === "ms") return __ms.map_pick_country(inputs)
	if (locale === "th") return __th.map_pick_country(inputs)
	if (locale === "fa") return __fa.map_pick_country(inputs)
	if (locale === "ur") return __ur.map_pick_country(inputs)
	if (locale === "bn") return __bn.map_pick_country(inputs)
	if (locale === "pa") return __pa.map_pick_country(inputs)
	if (locale === "sw") return __sw.map_pick_country(inputs)
	if (locale === "el") return __el.map_pick_country(inputs)
	if (locale === "cs") return __cs.map_pick_country(inputs)
	if (locale === "ro") return __ro.map_pick_country(inputs)
	if (locale === "hu") return __hu.map_pick_country(inputs)
	if (locale === "sv") return __sv.map_pick_country(inputs)
	if (locale === "he") return __he.map_pick_country(inputs)
	return __ru.map_pick_country(inputs)
});
/**
* | output |
* | --- |
* | "Choose a country to open available cities and listings." |
*
* @param {Map_Pick_Country_CitiesInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_pick_country_cities = /** @type {((inputs?: Map_Pick_Country_CitiesInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Pick_Country_CitiesInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_pick_country_cities(inputs)
	if (locale === "fr") return __fr.map_pick_country_cities(inputs)
	if (locale === "es") return __es.map_pick_country_cities(inputs)
	if (locale === "zh") return __zh.map_pick_country_cities(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_pick_country_cities(inputs)
	if (locale === "hi") return __hi.map_pick_country_cities(inputs)
	if (locale === "ar") return __ar.map_pick_country_cities(inputs)
	if (locale === "pt") return __pt.map_pick_country_cities(inputs)
	if (locale === "de") return __de.map_pick_country_cities(inputs)
	if (locale === "ja") return __ja.map_pick_country_cities(inputs)
	if (locale === "ko") return __ko.map_pick_country_cities(inputs)
	if (locale === "it") return __it.map_pick_country_cities(inputs)
	if (locale === "tr") return __tr.map_pick_country_cities(inputs)
	if (locale === "pl") return __pl.map_pick_country_cities(inputs)
	if (locale === "uk") return __uk.map_pick_country_cities(inputs)
	if (locale === "nl") return __nl.map_pick_country_cities(inputs)
	if (locale === "vi") return __vi.map_pick_country_cities(inputs)
	if (locale === "id") return __id.map_pick_country_cities(inputs)
	if (locale === "ms") return __ms.map_pick_country_cities(inputs)
	if (locale === "th") return __th.map_pick_country_cities(inputs)
	if (locale === "fa") return __fa.map_pick_country_cities(inputs)
	if (locale === "ur") return __ur.map_pick_country_cities(inputs)
	if (locale === "bn") return __bn.map_pick_country_cities(inputs)
	if (locale === "pa") return __pa.map_pick_country_cities(inputs)
	if (locale === "sw") return __sw.map_pick_country_cities(inputs)
	if (locale === "el") return __el.map_pick_country_cities(inputs)
	if (locale === "cs") return __cs.map_pick_country_cities(inputs)
	if (locale === "ro") return __ro.map_pick_country_cities(inputs)
	if (locale === "hu") return __hu.map_pick_country_cities(inputs)
	if (locale === "sv") return __sv.map_pick_country_cities(inputs)
	if (locale === "he") return __he.map_pick_country_cities(inputs)
	return __ru.map_pick_country_cities(inputs)
});
/**
* | output |
* | --- |
* | "Choose a profession, then the listing or specialist you need." |
*
* @param {Map_Pick_ProfessionInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_pick_profession = /** @type {((inputs?: Map_Pick_ProfessionInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Pick_ProfessionInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_pick_profession(inputs)
	if (locale === "fr") return __fr.map_pick_profession(inputs)
	if (locale === "es") return __es.map_pick_profession(inputs)
	if (locale === "zh") return __zh.map_pick_profession(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_pick_profession(inputs)
	if (locale === "hi") return __hi.map_pick_profession(inputs)
	if (locale === "ar") return __ar.map_pick_profession(inputs)
	if (locale === "pt") return __pt.map_pick_profession(inputs)
	if (locale === "de") return __de.map_pick_profession(inputs)
	if (locale === "ja") return __ja.map_pick_profession(inputs)
	if (locale === "ko") return __ko.map_pick_profession(inputs)
	if (locale === "it") return __it.map_pick_profession(inputs)
	if (locale === "tr") return __tr.map_pick_profession(inputs)
	if (locale === "pl") return __pl.map_pick_profession(inputs)
	if (locale === "uk") return __uk.map_pick_profession(inputs)
	if (locale === "nl") return __nl.map_pick_profession(inputs)
	if (locale === "vi") return __vi.map_pick_profession(inputs)
	if (locale === "id") return __id.map_pick_profession(inputs)
	if (locale === "ms") return __ms.map_pick_profession(inputs)
	if (locale === "th") return __th.map_pick_profession(inputs)
	if (locale === "fa") return __fa.map_pick_profession(inputs)
	if (locale === "ur") return __ur.map_pick_profession(inputs)
	if (locale === "bn") return __bn.map_pick_profession(inputs)
	if (locale === "pa") return __pa.map_pick_profession(inputs)
	if (locale === "sw") return __sw.map_pick_profession(inputs)
	if (locale === "el") return __el.map_pick_profession(inputs)
	if (locale === "cs") return __cs.map_pick_profession(inputs)
	if (locale === "ro") return __ro.map_pick_profession(inputs)
	if (locale === "hu") return __hu.map_pick_profession(inputs)
	if (locale === "sv") return __sv.map_pick_profession(inputs)
	if (locale === "he") return __he.map_pick_profession(inputs)
	return __ru.map_pick_profession(inputs)
});
/**
* | output |
* | --- |
* | "Profession" |
*
* @param {Map_Profession_LabelInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_profession_label = /** @type {((inputs?: Map_Profession_LabelInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Profession_LabelInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_profession_label(inputs)
	if (locale === "fr") return __fr.map_profession_label(inputs)
	if (locale === "es") return __es.map_profession_label(inputs)
	if (locale === "zh") return __zh.map_profession_label(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_profession_label(inputs)
	if (locale === "hi") return __hi.map_profession_label(inputs)
	if (locale === "ar") return __ar.map_profession_label(inputs)
	if (locale === "pt") return __pt.map_profession_label(inputs)
	if (locale === "de") return __de.map_profession_label(inputs)
	if (locale === "ja") return __ja.map_profession_label(inputs)
	if (locale === "ko") return __ko.map_profession_label(inputs)
	if (locale === "it") return __it.map_profession_label(inputs)
	if (locale === "tr") return __tr.map_profession_label(inputs)
	if (locale === "pl") return __pl.map_profession_label(inputs)
	if (locale === "uk") return __uk.map_profession_label(inputs)
	if (locale === "nl") return __nl.map_profession_label(inputs)
	if (locale === "vi") return __vi.map_profession_label(inputs)
	if (locale === "id") return __id.map_profession_label(inputs)
	if (locale === "ms") return __ms.map_profession_label(inputs)
	if (locale === "th") return __th.map_profession_label(inputs)
	if (locale === "fa") return __fa.map_profession_label(inputs)
	if (locale === "ur") return __ur.map_profession_label(inputs)
	if (locale === "bn") return __bn.map_profession_label(inputs)
	if (locale === "pa") return __pa.map_profession_label(inputs)
	if (locale === "sw") return __sw.map_profession_label(inputs)
	if (locale === "el") return __el.map_profession_label(inputs)
	if (locale === "cs") return __cs.map_profession_label(inputs)
	if (locale === "ro") return __ro.map_profession_label(inputs)
	if (locale === "hu") return __hu.map_profession_label(inputs)
	if (locale === "sv") return __sv.map_profession_label(inputs)
	if (locale === "he") return __he.map_profession_label(inputs)
	return __ru.map_profession_label(inputs)
});
/**
* | output |
* | --- |
* | "Professions" |
*
* @param {Map_ProfessionsInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_professions = /** @type {((inputs?: Map_ProfessionsInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_ProfessionsInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_professions(inputs)
	if (locale === "fr") return __fr.map_professions(inputs)
	if (locale === "es") return __es.map_professions(inputs)
	if (locale === "zh") return __zh.map_professions(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_professions(inputs)
	if (locale === "hi") return __hi.map_professions(inputs)
	if (locale === "ar") return __ar.map_professions(inputs)
	if (locale === "pt") return __pt.map_professions(inputs)
	if (locale === "de") return __de.map_professions(inputs)
	if (locale === "ja") return __ja.map_professions(inputs)
	if (locale === "ko") return __ko.map_professions(inputs)
	if (locale === "it") return __it.map_professions(inputs)
	if (locale === "tr") return __tr.map_professions(inputs)
	if (locale === "pl") return __pl.map_professions(inputs)
	if (locale === "uk") return __uk.map_professions(inputs)
	if (locale === "nl") return __nl.map_professions(inputs)
	if (locale === "vi") return __vi.map_professions(inputs)
	if (locale === "id") return __id.map_professions(inputs)
	if (locale === "ms") return __ms.map_professions(inputs)
	if (locale === "th") return __th.map_professions(inputs)
	if (locale === "fa") return __fa.map_professions(inputs)
	if (locale === "ur") return __ur.map_professions(inputs)
	if (locale === "bn") return __bn.map_professions(inputs)
	if (locale === "pa") return __pa.map_professions(inputs)
	if (locale === "sw") return __sw.map_professions(inputs)
	if (locale === "el") return __el.map_professions(inputs)
	if (locale === "cs") return __cs.map_professions(inputs)
	if (locale === "ro") return __ro.map_professions(inputs)
	if (locale === "hu") return __hu.map_professions(inputs)
	if (locale === "sv") return __sv.map_professions(inputs)
	if (locale === "he") return __he.map_professions(inputs)
	return __ru.map_professions(inputs)
});
/**
* | output |
* | --- |
* | "Choose a professional field" |
*
* @param {Map_Professions_LeadInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_professions_lead = /** @type {((inputs?: Map_Professions_LeadInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Professions_LeadInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_professions_lead(inputs)
	if (locale === "fr") return __fr.map_professions_lead(inputs)
	if (locale === "es") return __es.map_professions_lead(inputs)
	if (locale === "zh") return __zh.map_professions_lead(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_professions_lead(inputs)
	if (locale === "hi") return __hi.map_professions_lead(inputs)
	if (locale === "ar") return __ar.map_professions_lead(inputs)
	if (locale === "pt") return __pt.map_professions_lead(inputs)
	if (locale === "de") return __de.map_professions_lead(inputs)
	if (locale === "ja") return __ja.map_professions_lead(inputs)
	if (locale === "ko") return __ko.map_professions_lead(inputs)
	if (locale === "it") return __it.map_professions_lead(inputs)
	if (locale === "tr") return __tr.map_professions_lead(inputs)
	if (locale === "pl") return __pl.map_professions_lead(inputs)
	if (locale === "uk") return __uk.map_professions_lead(inputs)
	if (locale === "nl") return __nl.map_professions_lead(inputs)
	if (locale === "vi") return __vi.map_professions_lead(inputs)
	if (locale === "id") return __id.map_professions_lead(inputs)
	if (locale === "ms") return __ms.map_professions_lead(inputs)
	if (locale === "th") return __th.map_professions_lead(inputs)
	if (locale === "fa") return __fa.map_professions_lead(inputs)
	if (locale === "ur") return __ur.map_professions_lead(inputs)
	if (locale === "bn") return __bn.map_professions_lead(inputs)
	if (locale === "pa") return __pa.map_professions_lead(inputs)
	if (locale === "sw") return __sw.map_professions_lead(inputs)
	if (locale === "el") return __el.map_professions_lead(inputs)
	if (locale === "cs") return __cs.map_professions_lead(inputs)
	if (locale === "ro") return __ro.map_professions_lead(inputs)
	if (locale === "hu") return __hu.map_professions_lead(inputs)
	if (locale === "sv") return __sv.map_professions_lead(inputs)
	if (locale === "he") return __he.map_professions_lead(inputs)
	return __ru.map_professions_lead(inputs)
});
/**
* | output |
* | --- |
* | "Region" |
*
* @param {Map_RegionInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_region = /** @type {((inputs?: Map_RegionInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_RegionInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_region(inputs)
	if (locale === "fr") return __fr.map_region(inputs)
	if (locale === "es") return __es.map_region(inputs)
	if (locale === "zh") return __zh.map_region(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_region(inputs)
	if (locale === "hi") return __hi.map_region(inputs)
	if (locale === "ar") return __ar.map_region(inputs)
	if (locale === "pt") return __pt.map_region(inputs)
	if (locale === "de") return __de.map_region(inputs)
	if (locale === "ja") return __ja.map_region(inputs)
	if (locale === "ko") return __ko.map_region(inputs)
	if (locale === "it") return __it.map_region(inputs)
	if (locale === "tr") return __tr.map_region(inputs)
	if (locale === "pl") return __pl.map_region(inputs)
	if (locale === "uk") return __uk.map_region(inputs)
	if (locale === "nl") return __nl.map_region(inputs)
	if (locale === "vi") return __vi.map_region(inputs)
	if (locale === "id") return __id.map_region(inputs)
	if (locale === "ms") return __ms.map_region(inputs)
	if (locale === "th") return __th.map_region(inputs)
	if (locale === "fa") return __fa.map_region(inputs)
	if (locale === "ur") return __ur.map_region(inputs)
	if (locale === "bn") return __bn.map_region(inputs)
	if (locale === "pa") return __pa.map_region(inputs)
	if (locale === "sw") return __sw.map_region(inputs)
	if (locale === "el") return __el.map_region(inputs)
	if (locale === "cs") return __cs.map_region(inputs)
	if (locale === "ro") return __ro.map_region(inputs)
	if (locale === "hu") return __hu.map_region(inputs)
	if (locale === "sv") return __sv.map_region(inputs)
	if (locale === "he") return __he.map_region(inputs)
	return __ru.map_region(inputs)
});
/**
* | output |
* | --- |
* | "All world regions, equally" |
*
* @param {Map_Regions_LeadInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_regions_lead = /** @type {((inputs?: Map_Regions_LeadInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Regions_LeadInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_regions_lead(inputs)
	if (locale === "fr") return __fr.map_regions_lead(inputs)
	if (locale === "es") return __es.map_regions_lead(inputs)
	if (locale === "zh") return __zh.map_regions_lead(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_regions_lead(inputs)
	if (locale === "hi") return __hi.map_regions_lead(inputs)
	if (locale === "ar") return __ar.map_regions_lead(inputs)
	if (locale === "pt") return __pt.map_regions_lead(inputs)
	if (locale === "de") return __de.map_regions_lead(inputs)
	if (locale === "ja") return __ja.map_regions_lead(inputs)
	if (locale === "ko") return __ko.map_regions_lead(inputs)
	if (locale === "it") return __it.map_regions_lead(inputs)
	if (locale === "tr") return __tr.map_regions_lead(inputs)
	if (locale === "pl") return __pl.map_regions_lead(inputs)
	if (locale === "uk") return __uk.map_regions_lead(inputs)
	if (locale === "nl") return __nl.map_regions_lead(inputs)
	if (locale === "vi") return __vi.map_regions_lead(inputs)
	if (locale === "id") return __id.map_regions_lead(inputs)
	if (locale === "ms") return __ms.map_regions_lead(inputs)
	if (locale === "th") return __th.map_regions_lead(inputs)
	if (locale === "fa") return __fa.map_regions_lead(inputs)
	if (locale === "ur") return __ur.map_regions_lead(inputs)
	if (locale === "bn") return __bn.map_regions_lead(inputs)
	if (locale === "pa") return __pa.map_regions_lead(inputs)
	if (locale === "sw") return __sw.map_regions_lead(inputs)
	if (locale === "el") return __el.map_regions_lead(inputs)
	if (locale === "cs") return __cs.map_regions_lead(inputs)
	if (locale === "ro") return __ro.map_regions_lead(inputs)
	if (locale === "hu") return __hu.map_regions_lead(inputs)
	if (locale === "sv") return __sv.map_regions_lead(inputs)
	if (locale === "he") return __he.map_regions_lead(inputs)
	return __ru.map_regions_lead(inputs)
});
/**
* | output |
* | --- |
* | "Looking or offering" |
*
* @param {Map_Seek_Or_OfferInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_seek_or_offer = /** @type {((inputs?: Map_Seek_Or_OfferInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Seek_Or_OfferInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_seek_or_offer(inputs)
	if (locale === "fr") return __fr.map_seek_or_offer(inputs)
	if (locale === "es") return __es.map_seek_or_offer(inputs)
	if (locale === "zh") return __zh.map_seek_or_offer(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_seek_or_offer(inputs)
	if (locale === "hi") return __hi.map_seek_or_offer(inputs)
	if (locale === "ar") return __ar.map_seek_or_offer(inputs)
	if (locale === "pt") return __pt.map_seek_or_offer(inputs)
	if (locale === "de") return __de.map_seek_or_offer(inputs)
	if (locale === "ja") return __ja.map_seek_or_offer(inputs)
	if (locale === "ko") return __ko.map_seek_or_offer(inputs)
	if (locale === "it") return __it.map_seek_or_offer(inputs)
	if (locale === "tr") return __tr.map_seek_or_offer(inputs)
	if (locale === "pl") return __pl.map_seek_or_offer(inputs)
	if (locale === "uk") return __uk.map_seek_or_offer(inputs)
	if (locale === "nl") return __nl.map_seek_or_offer(inputs)
	if (locale === "vi") return __vi.map_seek_or_offer(inputs)
	if (locale === "id") return __id.map_seek_or_offer(inputs)
	if (locale === "ms") return __ms.map_seek_or_offer(inputs)
	if (locale === "th") return __th.map_seek_or_offer(inputs)
	if (locale === "fa") return __fa.map_seek_or_offer(inputs)
	if (locale === "ur") return __ur.map_seek_or_offer(inputs)
	if (locale === "bn") return __bn.map_seek_or_offer(inputs)
	if (locale === "pa") return __pa.map_seek_or_offer(inputs)
	if (locale === "sw") return __sw.map_seek_or_offer(inputs)
	if (locale === "el") return __el.map_seek_or_offer(inputs)
	if (locale === "cs") return __cs.map_seek_or_offer(inputs)
	if (locale === "ro") return __ro.map_seek_or_offer(inputs)
	if (locale === "hu") return __hu.map_seek_or_offer(inputs)
	if (locale === "sv") return __sv.map_seek_or_offer(inputs)
	if (locale === "he") return __he.map_seek_or_offer(inputs)
	return __ru.map_seek_or_offer(inputs)
});
/**
* | output |
* | --- |
* | "listings" |
*
* @param {Map_Stat_ListingsInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_stat_listings = /** @type {((inputs?: Map_Stat_ListingsInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Stat_ListingsInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_stat_listings(inputs)
	if (locale === "fr") return __fr.map_stat_listings(inputs)
	if (locale === "es") return __es.map_stat_listings(inputs)
	if (locale === "zh") return __zh.map_stat_listings(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_stat_listings(inputs)
	if (locale === "hi") return __hi.map_stat_listings(inputs)
	if (locale === "ar") return __ar.map_stat_listings(inputs)
	if (locale === "pt") return __pt.map_stat_listings(inputs)
	if (locale === "de") return __de.map_stat_listings(inputs)
	if (locale === "ja") return __ja.map_stat_listings(inputs)
	if (locale === "ko") return __ko.map_stat_listings(inputs)
	if (locale === "it") return __it.map_stat_listings(inputs)
	if (locale === "tr") return __tr.map_stat_listings(inputs)
	if (locale === "pl") return __pl.map_stat_listings(inputs)
	if (locale === "uk") return __uk.map_stat_listings(inputs)
	if (locale === "nl") return __nl.map_stat_listings(inputs)
	if (locale === "vi") return __vi.map_stat_listings(inputs)
	if (locale === "id") return __id.map_stat_listings(inputs)
	if (locale === "ms") return __ms.map_stat_listings(inputs)
	if (locale === "th") return __th.map_stat_listings(inputs)
	if (locale === "fa") return __fa.map_stat_listings(inputs)
	if (locale === "ur") return __ur.map_stat_listings(inputs)
	if (locale === "bn") return __bn.map_stat_listings(inputs)
	if (locale === "pa") return __pa.map_stat_listings(inputs)
	if (locale === "sw") return __sw.map_stat_listings(inputs)
	if (locale === "el") return __el.map_stat_listings(inputs)
	if (locale === "cs") return __cs.map_stat_listings(inputs)
	if (locale === "ro") return __ro.map_stat_listings(inputs)
	if (locale === "hu") return __hu.map_stat_listings(inputs)
	if (locale === "sv") return __sv.map_stat_listings(inputs)
	if (locale === "he") return __he.map_stat_listings(inputs)
	return __ru.map_stat_listings(inputs)
});
/**
* | output |
* | --- |
* | "members" |
*
* @param {Map_Stat_MembersInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_stat_members = /** @type {((inputs?: Map_Stat_MembersInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_Stat_MembersInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_stat_members(inputs)
	if (locale === "fr") return __fr.map_stat_members(inputs)
	if (locale === "es") return __es.map_stat_members(inputs)
	if (locale === "zh") return __zh.map_stat_members(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_stat_members(inputs)
	if (locale === "hi") return __hi.map_stat_members(inputs)
	if (locale === "ar") return __ar.map_stat_members(inputs)
	if (locale === "pt") return __pt.map_stat_members(inputs)
	if (locale === "de") return __de.map_stat_members(inputs)
	if (locale === "ja") return __ja.map_stat_members(inputs)
	if (locale === "ko") return __ko.map_stat_members(inputs)
	if (locale === "it") return __it.map_stat_members(inputs)
	if (locale === "tr") return __tr.map_stat_members(inputs)
	if (locale === "pl") return __pl.map_stat_members(inputs)
	if (locale === "uk") return __uk.map_stat_members(inputs)
	if (locale === "nl") return __nl.map_stat_members(inputs)
	if (locale === "vi") return __vi.map_stat_members(inputs)
	if (locale === "id") return __id.map_stat_members(inputs)
	if (locale === "ms") return __ms.map_stat_members(inputs)
	if (locale === "th") return __th.map_stat_members(inputs)
	if (locale === "fa") return __fa.map_stat_members(inputs)
	if (locale === "ur") return __ur.map_stat_members(inputs)
	if (locale === "bn") return __bn.map_stat_members(inputs)
	if (locale === "pa") return __pa.map_stat_members(inputs)
	if (locale === "sw") return __sw.map_stat_members(inputs)
	if (locale === "el") return __el.map_stat_members(inputs)
	if (locale === "cs") return __cs.map_stat_members(inputs)
	if (locale === "ro") return __ro.map_stat_members(inputs)
	if (locale === "hu") return __hu.map_stat_members(inputs)
	if (locale === "sv") return __sv.map_stat_members(inputs)
	if (locale === "he") return __he.map_stat_members(inputs)
	return __ru.map_stat_members(inputs)
});
/**
* | output |
* | --- |
* | "Map" |
*
* @param {Map_TitleInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const map_title = /** @type {((inputs?: Map_TitleInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Map_TitleInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.map_title(inputs)
	if (locale === "fr") return __fr.map_title(inputs)
	if (locale === "es") return __es.map_title(inputs)
	if (locale === "zh") return __zh.map_title(inputs)
	if (locale === "zh-TW") return __zh_tw2.map_title(inputs)
	if (locale === "hi") return __hi.map_title(inputs)
	if (locale === "ar") return __ar.map_title(inputs)
	if (locale === "pt") return __pt.map_title(inputs)
	if (locale === "de") return __de.map_title(inputs)
	if (locale === "ja") return __ja.map_title(inputs)
	if (locale === "ko") return __ko.map_title(inputs)
	if (locale === "it") return __it.map_title(inputs)
	if (locale === "tr") return __tr.map_title(inputs)
	if (locale === "pl") return __pl.map_title(inputs)
	if (locale === "uk") return __uk.map_title(inputs)
	if (locale === "nl") return __nl.map_title(inputs)
	if (locale === "vi") return __vi.map_title(inputs)
	if (locale === "id") return __id.map_title(inputs)
	if (locale === "ms") return __ms.map_title(inputs)
	if (locale === "th") return __th.map_title(inputs)
	if (locale === "fa") return __fa.map_title(inputs)
	if (locale === "ur") return __ur.map_title(inputs)
	if (locale === "bn") return __bn.map_title(inputs)
	if (locale === "pa") return __pa.map_title(inputs)
	if (locale === "sw") return __sw.map_title(inputs)
	if (locale === "el") return __el.map_title(inputs)
	if (locale === "cs") return __cs.map_title(inputs)
	if (locale === "ro") return __ro.map_title(inputs)
	if (locale === "hu") return __hu.map_title(inputs)
	if (locale === "sv") return __sv.map_title(inputs)
	if (locale === "he") return __he.map_title(inputs)
	return __ru.map_title(inputs)
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
* | "You have a new notification." |
*
* @param {Notify_GenericInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const notify_generic = /** @type {((inputs?: Notify_GenericInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Notify_GenericInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.notify_generic(inputs)
	if (locale === "fr") return __fr.notify_generic(inputs)
	if (locale === "es") return __es.notify_generic(inputs)
	if (locale === "zh") return __zh.notify_generic(inputs)
	if (locale === "zh-TW") return __zh_tw2.notify_generic(inputs)
	if (locale === "hi") return __hi.notify_generic(inputs)
	if (locale === "ar") return __ar.notify_generic(inputs)
	if (locale === "pt") return __pt.notify_generic(inputs)
	if (locale === "de") return __de.notify_generic(inputs)
	if (locale === "ja") return __ja.notify_generic(inputs)
	if (locale === "ko") return __ko.notify_generic(inputs)
	if (locale === "it") return __it.notify_generic(inputs)
	if (locale === "tr") return __tr.notify_generic(inputs)
	if (locale === "pl") return __pl.notify_generic(inputs)
	if (locale === "uk") return __uk.notify_generic(inputs)
	if (locale === "nl") return __nl.notify_generic(inputs)
	if (locale === "vi") return __vi.notify_generic(inputs)
	if (locale === "id") return __id.notify_generic(inputs)
	if (locale === "ms") return __ms.notify_generic(inputs)
	if (locale === "th") return __th.notify_generic(inputs)
	if (locale === "fa") return __fa.notify_generic(inputs)
	if (locale === "ur") return __ur.notify_generic(inputs)
	if (locale === "bn") return __bn.notify_generic(inputs)
	if (locale === "pa") return __pa.notify_generic(inputs)
	if (locale === "sw") return __sw.notify_generic(inputs)
	if (locale === "el") return __el.notify_generic(inputs)
	if (locale === "cs") return __cs.notify_generic(inputs)
	if (locale === "ro") return __ro.notify_generic(inputs)
	if (locale === "hu") return __hu.notify_generic(inputs)
	if (locale === "sv") return __sv.notify_generic(inputs)
	if (locale === "he") return __he.notify_generic(inputs)
	return __ru.notify_generic(inputs)
});
/**
* | output |
* | --- |
* | "New message" |
*
* @param {Notify_New_MessageInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const notify_new_message = /** @type {((inputs?: Notify_New_MessageInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Notify_New_MessageInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.notify_new_message(inputs)
	if (locale === "fr") return __fr.notify_new_message(inputs)
	if (locale === "es") return __es.notify_new_message(inputs)
	if (locale === "zh") return __zh.notify_new_message(inputs)
	if (locale === "zh-TW") return __zh_tw2.notify_new_message(inputs)
	if (locale === "hi") return __hi.notify_new_message(inputs)
	if (locale === "ar") return __ar.notify_new_message(inputs)
	if (locale === "pt") return __pt.notify_new_message(inputs)
	if (locale === "de") return __de.notify_new_message(inputs)
	if (locale === "ja") return __ja.notify_new_message(inputs)
	if (locale === "ko") return __ko.notify_new_message(inputs)
	if (locale === "it") return __it.notify_new_message(inputs)
	if (locale === "tr") return __tr.notify_new_message(inputs)
	if (locale === "pl") return __pl.notify_new_message(inputs)
	if (locale === "uk") return __uk.notify_new_message(inputs)
	if (locale === "nl") return __nl.notify_new_message(inputs)
	if (locale === "vi") return __vi.notify_new_message(inputs)
	if (locale === "id") return __id.notify_new_message(inputs)
	if (locale === "ms") return __ms.notify_new_message(inputs)
	if (locale === "th") return __th.notify_new_message(inputs)
	if (locale === "fa") return __fa.notify_new_message(inputs)
	if (locale === "ur") return __ur.notify_new_message(inputs)
	if (locale === "bn") return __bn.notify_new_message(inputs)
	if (locale === "pa") return __pa.notify_new_message(inputs)
	if (locale === "sw") return __sw.notify_new_message(inputs)
	if (locale === "el") return __el.notify_new_message(inputs)
	if (locale === "cs") return __cs.notify_new_message(inputs)
	if (locale === "ro") return __ro.notify_new_message(inputs)
	if (locale === "hu") return __hu.notify_new_message(inputs)
	if (locale === "sv") return __sv.notify_new_message(inputs)
	if (locale === "he") return __he.notify_new_message(inputs)
	return __ru.notify_new_message(inputs)
});
/**
* | output |
* | --- |
* | "Open the chat in GRABIT." |
*
* @param {Notify_Open_ChatInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const notify_open_chat = /** @type {((inputs?: Notify_Open_ChatInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Notify_Open_ChatInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.notify_open_chat(inputs)
	if (locale === "fr") return __fr.notify_open_chat(inputs)
	if (locale === "es") return __es.notify_open_chat(inputs)
	if (locale === "zh") return __zh.notify_open_chat(inputs)
	if (locale === "zh-TW") return __zh_tw2.notify_open_chat(inputs)
	if (locale === "hi") return __hi.notify_open_chat(inputs)
	if (locale === "ar") return __ar.notify_open_chat(inputs)
	if (locale === "pt") return __pt.notify_open_chat(inputs)
	if (locale === "de") return __de.notify_open_chat(inputs)
	if (locale === "ja") return __ja.notify_open_chat(inputs)
	if (locale === "ko") return __ko.notify_open_chat(inputs)
	if (locale === "it") return __it.notify_open_chat(inputs)
	if (locale === "tr") return __tr.notify_open_chat(inputs)
	if (locale === "pl") return __pl.notify_open_chat(inputs)
	if (locale === "uk") return __uk.notify_open_chat(inputs)
	if (locale === "nl") return __nl.notify_open_chat(inputs)
	if (locale === "vi") return __vi.notify_open_chat(inputs)
	if (locale === "id") return __id.notify_open_chat(inputs)
	if (locale === "ms") return __ms.notify_open_chat(inputs)
	if (locale === "th") return __th.notify_open_chat(inputs)
	if (locale === "fa") return __fa.notify_open_chat(inputs)
	if (locale === "ur") return __ur.notify_open_chat(inputs)
	if (locale === "bn") return __bn.notify_open_chat(inputs)
	if (locale === "pa") return __pa.notify_open_chat(inputs)
	if (locale === "sw") return __sw.notify_open_chat(inputs)
	if (locale === "el") return __el.notify_open_chat(inputs)
	if (locale === "cs") return __cs.notify_open_chat(inputs)
	if (locale === "ro") return __ro.notify_open_chat(inputs)
	if (locale === "hu") return __hu.notify_open_chat(inputs)
	if (locale === "sv") return __sv.notify_open_chat(inputs)
	if (locale === "he") return __he.notify_open_chat(inputs)
	return __ru.notify_open_chat(inputs)
});
/**
* | output |
* | --- |
* | "Open pedometer" |
*
* @param {Notify_Steps_ActionInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const notify_steps_action = /** @type {((inputs?: Notify_Steps_ActionInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Notify_Steps_ActionInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.notify_steps_action(inputs)
	if (locale === "fr") return __fr.notify_steps_action(inputs)
	if (locale === "es") return __es.notify_steps_action(inputs)
	if (locale === "zh") return __zh.notify_steps_action(inputs)
	if (locale === "zh-TW") return __zh_tw2.notify_steps_action(inputs)
	if (locale === "hi") return __hi.notify_steps_action(inputs)
	if (locale === "ar") return __ar.notify_steps_action(inputs)
	if (locale === "pt") return __pt.notify_steps_action(inputs)
	if (locale === "de") return __de.notify_steps_action(inputs)
	if (locale === "ja") return __ja.notify_steps_action(inputs)
	if (locale === "ko") return __ko.notify_steps_action(inputs)
	if (locale === "it") return __it.notify_steps_action(inputs)
	if (locale === "tr") return __tr.notify_steps_action(inputs)
	if (locale === "pl") return __pl.notify_steps_action(inputs)
	if (locale === "uk") return __uk.notify_steps_action(inputs)
	if (locale === "nl") return __nl.notify_steps_action(inputs)
	if (locale === "vi") return __vi.notify_steps_action(inputs)
	if (locale === "id") return __id.notify_steps_action(inputs)
	if (locale === "ms") return __ms.notify_steps_action(inputs)
	if (locale === "th") return __th.notify_steps_action(inputs)
	if (locale === "fa") return __fa.notify_steps_action(inputs)
	if (locale === "ur") return __ur.notify_steps_action(inputs)
	if (locale === "bn") return __bn.notify_steps_action(inputs)
	if (locale === "pa") return __pa.notify_steps_action(inputs)
	if (locale === "sw") return __sw.notify_steps_action(inputs)
	if (locale === "el") return __el.notify_steps_action(inputs)
	if (locale === "cs") return __cs.notify_steps_action(inputs)
	if (locale === "ro") return __ro.notify_steps_action(inputs)
	if (locale === "hu") return __hu.notify_steps_action(inputs)
	if (locale === "sv") return __sv.notify_steps_action(inputs)
	if (locale === "he") return __he.notify_steps_action(inputs)
	return __ru.notify_steps_action(inputs)
});
/**
* | output |
* | --- |
* | "Tap to start counting steps." |
*
* @param {Notify_Steps_BodyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const notify_steps_body = /** @type {((inputs?: Notify_Steps_BodyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Notify_Steps_BodyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.notify_steps_body(inputs)
	if (locale === "fr") return __fr.notify_steps_body(inputs)
	if (locale === "es") return __es.notify_steps_body(inputs)
	if (locale === "zh") return __zh.notify_steps_body(inputs)
	if (locale === "zh-TW") return __zh_tw2.notify_steps_body(inputs)
	if (locale === "hi") return __hi.notify_steps_body(inputs)
	if (locale === "ar") return __ar.notify_steps_body(inputs)
	if (locale === "pt") return __pt.notify_steps_body(inputs)
	if (locale === "de") return __de.notify_steps_body(inputs)
	if (locale === "ja") return __ja.notify_steps_body(inputs)
	if (locale === "ko") return __ko.notify_steps_body(inputs)
	if (locale === "it") return __it.notify_steps_body(inputs)
	if (locale === "tr") return __tr.notify_steps_body(inputs)
	if (locale === "pl") return __pl.notify_steps_body(inputs)
	if (locale === "uk") return __uk.notify_steps_body(inputs)
	if (locale === "nl") return __nl.notify_steps_body(inputs)
	if (locale === "vi") return __vi.notify_steps_body(inputs)
	if (locale === "id") return __id.notify_steps_body(inputs)
	if (locale === "ms") return __ms.notify_steps_body(inputs)
	if (locale === "th") return __th.notify_steps_body(inputs)
	if (locale === "fa") return __fa.notify_steps_body(inputs)
	if (locale === "ur") return __ur.notify_steps_body(inputs)
	if (locale === "bn") return __bn.notify_steps_body(inputs)
	if (locale === "pa") return __pa.notify_steps_body(inputs)
	if (locale === "sw") return __sw.notify_steps_body(inputs)
	if (locale === "el") return __el.notify_steps_body(inputs)
	if (locale === "cs") return __cs.notify_steps_body(inputs)
	if (locale === "ro") return __ro.notify_steps_body(inputs)
	if (locale === "hu") return __hu.notify_steps_body(inputs)
	if (locale === "sv") return __sv.notify_steps_body(inputs)
	if (locale === "he") return __he.notify_steps_body(inputs)
	return __ru.notify_steps_body(inputs)
});
/**
* | output |
* | --- |
* | "GRABIT pedometer" |
*
* @param {Notify_Steps_TitleInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const notify_steps_title = /** @type {((inputs?: Notify_Steps_TitleInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Notify_Steps_TitleInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.notify_steps_title(inputs)
	if (locale === "fr") return __fr.notify_steps_title(inputs)
	if (locale === "es") return __es.notify_steps_title(inputs)
	if (locale === "zh") return __zh.notify_steps_title(inputs)
	if (locale === "zh-TW") return __zh_tw2.notify_steps_title(inputs)
	if (locale === "hi") return __hi.notify_steps_title(inputs)
	if (locale === "ar") return __ar.notify_steps_title(inputs)
	if (locale === "pt") return __pt.notify_steps_title(inputs)
	if (locale === "de") return __de.notify_steps_title(inputs)
	if (locale === "ja") return __ja.notify_steps_title(inputs)
	if (locale === "ko") return __ko.notify_steps_title(inputs)
	if (locale === "it") return __it.notify_steps_title(inputs)
	if (locale === "tr") return __tr.notify_steps_title(inputs)
	if (locale === "pl") return __pl.notify_steps_title(inputs)
	if (locale === "uk") return __uk.notify_steps_title(inputs)
	if (locale === "nl") return __nl.notify_steps_title(inputs)
	if (locale === "vi") return __vi.notify_steps_title(inputs)
	if (locale === "id") return __id.notify_steps_title(inputs)
	if (locale === "ms") return __ms.notify_steps_title(inputs)
	if (locale === "th") return __th.notify_steps_title(inputs)
	if (locale === "fa") return __fa.notify_steps_title(inputs)
	if (locale === "ur") return __ur.notify_steps_title(inputs)
	if (locale === "bn") return __bn.notify_steps_title(inputs)
	if (locale === "pa") return __pa.notify_steps_title(inputs)
	if (locale === "sw") return __sw.notify_steps_title(inputs)
	if (locale === "el") return __el.notify_steps_title(inputs)
	if (locale === "cs") return __cs.notify_steps_title(inputs)
	if (locale === "ro") return __ro.notify_steps_title(inputs)
	if (locale === "hu") return __hu.notify_steps_title(inputs)
	if (locale === "sv") return __sv.notify_steps_title(inputs)
	if (locale === "he") return __he.notify_steps_title(inputs)
	return __ru.notify_steps_title(inputs)
});
/**
* | output |
* | --- |
* | "Sign in to message" |
*
* @param {Profile_Login_WriteInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const profile_login_write = /** @type {((inputs?: Profile_Login_WriteInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Login_WriteInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_login_write(inputs)
	if (locale === "fr") return __fr.profile_login_write(inputs)
	if (locale === "es") return __es.profile_login_write(inputs)
	if (locale === "zh") return __zh.profile_login_write(inputs)
	if (locale === "zh-TW") return __zh_tw2.profile_login_write(inputs)
	if (locale === "hi") return __hi.profile_login_write(inputs)
	if (locale === "ar") return __ar.profile_login_write(inputs)
	if (locale === "pt") return __pt.profile_login_write(inputs)
	if (locale === "de") return __de.profile_login_write(inputs)
	if (locale === "ja") return __ja.profile_login_write(inputs)
	if (locale === "ko") return __ko.profile_login_write(inputs)
	if (locale === "it") return __it.profile_login_write(inputs)
	if (locale === "tr") return __tr.profile_login_write(inputs)
	if (locale === "pl") return __pl.profile_login_write(inputs)
	if (locale === "uk") return __uk.profile_login_write(inputs)
	if (locale === "nl") return __nl.profile_login_write(inputs)
	if (locale === "vi") return __vi.profile_login_write(inputs)
	if (locale === "id") return __id.profile_login_write(inputs)
	if (locale === "ms") return __ms.profile_login_write(inputs)
	if (locale === "th") return __th.profile_login_write(inputs)
	if (locale === "fa") return __fa.profile_login_write(inputs)
	if (locale === "ur") return __ur.profile_login_write(inputs)
	if (locale === "bn") return __bn.profile_login_write(inputs)
	if (locale === "pa") return __pa.profile_login_write(inputs)
	if (locale === "sw") return __sw.profile_login_write(inputs)
	if (locale === "el") return __el.profile_login_write(inputs)
	if (locale === "cs") return __cs.profile_login_write(inputs)
	if (locale === "ro") return __ro.profile_login_write(inputs)
	if (locale === "hu") return __hu.profile_login_write(inputs)
	if (locale === "sv") return __sv.profile_login_write(inputs)
	if (locale === "he") return __he.profile_login_write(inputs)
	return __ru.profile_login_write(inputs)
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
* | "Join GRABIT with my link. Chat, steps and work nearby." |
*
* @param {Profile_Share_TextInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const profile_share_text = /** @type {((inputs?: Profile_Share_TextInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Share_TextInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_share_text(inputs)
	if (locale === "fr") return __fr.profile_share_text(inputs)
	if (locale === "es") return __es.profile_share_text(inputs)
	if (locale === "zh") return __zh.profile_share_text(inputs)
	if (locale === "zh-TW") return __zh_tw2.profile_share_text(inputs)
	if (locale === "hi") return __hi.profile_share_text(inputs)
	if (locale === "ar") return __ar.profile_share_text(inputs)
	if (locale === "pt") return __pt.profile_share_text(inputs)
	if (locale === "de") return __de.profile_share_text(inputs)
	if (locale === "ja") return __ja.profile_share_text(inputs)
	if (locale === "ko") return __ko.profile_share_text(inputs)
	if (locale === "it") return __it.profile_share_text(inputs)
	if (locale === "tr") return __tr.profile_share_text(inputs)
	if (locale === "pl") return __pl.profile_share_text(inputs)
	if (locale === "uk") return __uk.profile_share_text(inputs)
	if (locale === "nl") return __nl.profile_share_text(inputs)
	if (locale === "vi") return __vi.profile_share_text(inputs)
	if (locale === "id") return __id.profile_share_text(inputs)
	if (locale === "ms") return __ms.profile_share_text(inputs)
	if (locale === "th") return __th.profile_share_text(inputs)
	if (locale === "fa") return __fa.profile_share_text(inputs)
	if (locale === "ur") return __ur.profile_share_text(inputs)
	if (locale === "bn") return __bn.profile_share_text(inputs)
	if (locale === "pa") return __pa.profile_share_text(inputs)
	if (locale === "sw") return __sw.profile_share_text(inputs)
	if (locale === "el") return __el.profile_share_text(inputs)
	if (locale === "cs") return __cs.profile_share_text(inputs)
	if (locale === "ro") return __ro.profile_share_text(inputs)
	if (locale === "hu") return __hu.profile_share_text(inputs)
	if (locale === "sv") return __sv.profile_share_text(inputs)
	if (locale === "he") return __he.profile_share_text(inputs)
	return __ru.profile_share_text(inputs)
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
* | "Message now. You can block or delete later." |
*
* @param {Profile_Write_HintInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const profile_write_hint = /** @type {((inputs?: Profile_Write_HintInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Write_HintInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_write_hint(inputs)
	if (locale === "fr") return __fr.profile_write_hint(inputs)
	if (locale === "es") return __es.profile_write_hint(inputs)
	if (locale === "zh") return __zh.profile_write_hint(inputs)
	if (locale === "zh-TW") return __zh_tw2.profile_write_hint(inputs)
	if (locale === "hi") return __hi.profile_write_hint(inputs)
	if (locale === "ar") return __ar.profile_write_hint(inputs)
	if (locale === "pt") return __pt.profile_write_hint(inputs)
	if (locale === "de") return __de.profile_write_hint(inputs)
	if (locale === "ja") return __ja.profile_write_hint(inputs)
	if (locale === "ko") return __ko.profile_write_hint(inputs)
	if (locale === "it") return __it.profile_write_hint(inputs)
	if (locale === "tr") return __tr.profile_write_hint(inputs)
	if (locale === "pl") return __pl.profile_write_hint(inputs)
	if (locale === "uk") return __uk.profile_write_hint(inputs)
	if (locale === "nl") return __nl.profile_write_hint(inputs)
	if (locale === "vi") return __vi.profile_write_hint(inputs)
	if (locale === "id") return __id.profile_write_hint(inputs)
	if (locale === "ms") return __ms.profile_write_hint(inputs)
	if (locale === "th") return __th.profile_write_hint(inputs)
	if (locale === "fa") return __fa.profile_write_hint(inputs)
	if (locale === "ur") return __ur.profile_write_hint(inputs)
	if (locale === "bn") return __bn.profile_write_hint(inputs)
	if (locale === "pa") return __pa.profile_write_hint(inputs)
	if (locale === "sw") return __sw.profile_write_hint(inputs)
	if (locale === "el") return __el.profile_write_hint(inputs)
	if (locale === "cs") return __cs.profile_write_hint(inputs)
	if (locale === "ro") return __ro.profile_write_hint(inputs)
	if (locale === "hu") return __hu.profile_write_hint(inputs)
	if (locale === "sv") return __sv.profile_write_hint(inputs)
	if (locale === "he") return __he.profile_write_hint(inputs)
	return __ru.profile_write_hint(inputs)
});
/**
* | output |
* | --- |
* | "Sign in to message this member." |
*
* @param {Profile_Write_Login_HintInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const profile_write_login_hint = /** @type {((inputs?: Profile_Write_Login_HintInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Profile_Write_Login_HintInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.profile_write_login_hint(inputs)
	if (locale === "fr") return __fr.profile_write_login_hint(inputs)
	if (locale === "es") return __es.profile_write_login_hint(inputs)
	if (locale === "zh") return __zh.profile_write_login_hint(inputs)
	if (locale === "zh-TW") return __zh_tw2.profile_write_login_hint(inputs)
	if (locale === "hi") return __hi.profile_write_login_hint(inputs)
	if (locale === "ar") return __ar.profile_write_login_hint(inputs)
	if (locale === "pt") return __pt.profile_write_login_hint(inputs)
	if (locale === "de") return __de.profile_write_login_hint(inputs)
	if (locale === "ja") return __ja.profile_write_login_hint(inputs)
	if (locale === "ko") return __ko.profile_write_login_hint(inputs)
	if (locale === "it") return __it.profile_write_login_hint(inputs)
	if (locale === "tr") return __tr.profile_write_login_hint(inputs)
	if (locale === "pl") return __pl.profile_write_login_hint(inputs)
	if (locale === "uk") return __uk.profile_write_login_hint(inputs)
	if (locale === "nl") return __nl.profile_write_login_hint(inputs)
	if (locale === "vi") return __vi.profile_write_login_hint(inputs)
	if (locale === "id") return __id.profile_write_login_hint(inputs)
	if (locale === "ms") return __ms.profile_write_login_hint(inputs)
	if (locale === "th") return __th.profile_write_login_hint(inputs)
	if (locale === "fa") return __fa.profile_write_login_hint(inputs)
	if (locale === "ur") return __ur.profile_write_login_hint(inputs)
	if (locale === "bn") return __bn.profile_write_login_hint(inputs)
	if (locale === "pa") return __pa.profile_write_login_hint(inputs)
	if (locale === "sw") return __sw.profile_write_login_hint(inputs)
	if (locale === "el") return __el.profile_write_login_hint(inputs)
	if (locale === "cs") return __cs.profile_write_login_hint(inputs)
	if (locale === "ro") return __ro.profile_write_login_hint(inputs)
	if (locale === "hu") return __hu.profile_write_login_hint(inputs)
	if (locale === "sv") return __sv.profile_write_login_hint(inputs)
	if (locale === "he") return __he.profile_write_login_hint(inputs)
	return __ru.profile_write_login_hint(inputs)
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
* | "Open the app. The pedometer is on the panel — start counting steps." |
*
* @param {Pwa_Open_App_StepsInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const pwa_open_app_steps = /** @type {((inputs?: Pwa_Open_App_StepsInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Pwa_Open_App_StepsInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.pwa_open_app_steps(inputs)
	if (locale === "fr") return __fr.pwa_open_app_steps(inputs)
	if (locale === "es") return __es.pwa_open_app_steps(inputs)
	if (locale === "zh") return __zh.pwa_open_app_steps(inputs)
	if (locale === "zh-TW") return __zh_tw2.pwa_open_app_steps(inputs)
	if (locale === "hi") return __hi.pwa_open_app_steps(inputs)
	if (locale === "ar") return __ar.pwa_open_app_steps(inputs)
	if (locale === "pt") return __pt.pwa_open_app_steps(inputs)
	if (locale === "de") return __de.pwa_open_app_steps(inputs)
	if (locale === "ja") return __ja.pwa_open_app_steps(inputs)
	if (locale === "ko") return __ko.pwa_open_app_steps(inputs)
	if (locale === "it") return __it.pwa_open_app_steps(inputs)
	if (locale === "tr") return __tr.pwa_open_app_steps(inputs)
	if (locale === "pl") return __pl.pwa_open_app_steps(inputs)
	if (locale === "uk") return __uk.pwa_open_app_steps(inputs)
	if (locale === "nl") return __nl.pwa_open_app_steps(inputs)
	if (locale === "vi") return __vi.pwa_open_app_steps(inputs)
	if (locale === "id") return __id.pwa_open_app_steps(inputs)
	if (locale === "ms") return __ms.pwa_open_app_steps(inputs)
	if (locale === "th") return __th.pwa_open_app_steps(inputs)
	if (locale === "fa") return __fa.pwa_open_app_steps(inputs)
	if (locale === "ur") return __ur.pwa_open_app_steps(inputs)
	if (locale === "bn") return __bn.pwa_open_app_steps(inputs)
	if (locale === "pa") return __pa.pwa_open_app_steps(inputs)
	if (locale === "sw") return __sw.pwa_open_app_steps(inputs)
	if (locale === "el") return __el.pwa_open_app_steps(inputs)
	if (locale === "cs") return __cs.pwa_open_app_steps(inputs)
	if (locale === "ro") return __ro.pwa_open_app_steps(inputs)
	if (locale === "hu") return __hu.pwa_open_app_steps(inputs)
	if (locale === "sv") return __sv.pwa_open_app_steps(inputs)
	if (locale === "he") return __he.pwa_open_app_steps(inputs)
	return __ru.pwa_open_app_steps(inputs)
});
/**
* | output |
* | --- |
* | "Rating {rating} · {votes}" |
*
* @param {Rating_VotesInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const rating_votes = /** @type {((inputs: Rating_VotesInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Rating_VotesInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.rating_votes(inputs)
	if (locale === "fr") return __fr.rating_votes(inputs)
	if (locale === "es") return __es.rating_votes(inputs)
	if (locale === "zh") return __zh.rating_votes(inputs)
	if (locale === "zh-TW") return __zh_tw2.rating_votes(inputs)
	if (locale === "hi") return __hi.rating_votes(inputs)
	if (locale === "ar") return __ar.rating_votes(inputs)
	if (locale === "pt") return __pt.rating_votes(inputs)
	if (locale === "de") return __de.rating_votes(inputs)
	if (locale === "ja") return __ja.rating_votes(inputs)
	if (locale === "ko") return __ko.rating_votes(inputs)
	if (locale === "it") return __it.rating_votes(inputs)
	if (locale === "tr") return __tr.rating_votes(inputs)
	if (locale === "pl") return __pl.rating_votes(inputs)
	if (locale === "uk") return __uk.rating_votes(inputs)
	if (locale === "nl") return __nl.rating_votes(inputs)
	if (locale === "vi") return __vi.rating_votes(inputs)
	if (locale === "id") return __id.rating_votes(inputs)
	if (locale === "ms") return __ms.rating_votes(inputs)
	if (locale === "th") return __th.rating_votes(inputs)
	if (locale === "fa") return __fa.rating_votes(inputs)
	if (locale === "ur") return __ur.rating_votes(inputs)
	if (locale === "bn") return __bn.rating_votes(inputs)
	if (locale === "pa") return __pa.rating_votes(inputs)
	if (locale === "sw") return __sw.rating_votes(inputs)
	if (locale === "el") return __el.rating_votes(inputs)
	if (locale === "cs") return __cs.rating_votes(inputs)
	if (locale === "ro") return __ro.rating_votes(inputs)
	if (locale === "hu") return __hu.rating_votes(inputs)
	if (locale === "sv") return __sv.rating_votes(inputs)
	if (locale === "he") return __he.rating_votes(inputs)
	return __ru.rating_votes(inputs)
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
* | "What to search" |
*
* @param {Search_WhatInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const search_what = /** @type {((inputs?: Search_WhatInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Search_WhatInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.search_what(inputs)
	if (locale === "fr") return __fr.search_what(inputs)
	if (locale === "es") return __es.search_what(inputs)
	if (locale === "zh") return __zh.search_what(inputs)
	if (locale === "zh-TW") return __zh_tw2.search_what(inputs)
	if (locale === "hi") return __hi.search_what(inputs)
	if (locale === "ar") return __ar.search_what(inputs)
	if (locale === "pt") return __pt.search_what(inputs)
	if (locale === "de") return __de.search_what(inputs)
	if (locale === "ja") return __ja.search_what(inputs)
	if (locale === "ko") return __ko.search_what(inputs)
	if (locale === "it") return __it.search_what(inputs)
	if (locale === "tr") return __tr.search_what(inputs)
	if (locale === "pl") return __pl.search_what(inputs)
	if (locale === "uk") return __uk.search_what(inputs)
	if (locale === "nl") return __nl.search_what(inputs)
	if (locale === "vi") return __vi.search_what(inputs)
	if (locale === "id") return __id.search_what(inputs)
	if (locale === "ms") return __ms.search_what(inputs)
	if (locale === "th") return __th.search_what(inputs)
	if (locale === "fa") return __fa.search_what(inputs)
	if (locale === "ur") return __ur.search_what(inputs)
	if (locale === "bn") return __bn.search_what(inputs)
	if (locale === "pa") return __pa.search_what(inputs)
	if (locale === "sw") return __sw.search_what(inputs)
	if (locale === "el") return __el.search_what(inputs)
	if (locale === "cs") return __cs.search_what(inputs)
	if (locale === "ro") return __ro.search_what(inputs)
	if (locale === "hu") return __hu.search_what(inputs)
	if (locale === "sv") return __sv.search_what(inputs)
	if (locale === "he") return __he.search_what(inputs)
	return __ru.search_what(inputs)
});
/**
* | output |
* | --- |
* | "Specialist" |
*
* @param {SpecialistInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const specialist = /** @type {((inputs?: SpecialistInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<SpecialistInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.specialist(inputs)
	if (locale === "fr") return __fr.specialist(inputs)
	if (locale === "es") return __es.specialist(inputs)
	if (locale === "zh") return __zh.specialist(inputs)
	if (locale === "zh-TW") return __zh_tw2.specialist(inputs)
	if (locale === "hi") return __hi.specialist(inputs)
	if (locale === "ar") return __ar.specialist(inputs)
	if (locale === "pt") return __pt.specialist(inputs)
	if (locale === "de") return __de.specialist(inputs)
	if (locale === "ja") return __ja.specialist(inputs)
	if (locale === "ko") return __ko.specialist(inputs)
	if (locale === "it") return __it.specialist(inputs)
	if (locale === "tr") return __tr.specialist(inputs)
	if (locale === "pl") return __pl.specialist(inputs)
	if (locale === "uk") return __uk.specialist(inputs)
	if (locale === "nl") return __nl.specialist(inputs)
	if (locale === "vi") return __vi.specialist(inputs)
	if (locale === "id") return __id.specialist(inputs)
	if (locale === "ms") return __ms.specialist(inputs)
	if (locale === "th") return __th.specialist(inputs)
	if (locale === "fa") return __fa.specialist(inputs)
	if (locale === "ur") return __ur.specialist(inputs)
	if (locale === "bn") return __bn.specialist(inputs)
	if (locale === "pa") return __pa.specialist(inputs)
	if (locale === "sw") return __sw.specialist(inputs)
	if (locale === "el") return __el.specialist(inputs)
	if (locale === "cs") return __cs.specialist(inputs)
	if (locale === "ro") return __ro.specialist(inputs)
	if (locale === "hu") return __hu.specialist(inputs)
	if (locale === "sv") return __sv.specialist(inputs)
	if (locale === "he") return __he.specialist(inputs)
	return __ru.specialist(inputs)
});
/**
* | output |
* | --- |
* | "Best" |
*
* @param {Steps_BestInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_best = /** @type {((inputs?: Steps_BestInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_BestInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_best(inputs)
	if (locale === "fr") return __fr.steps_best(inputs)
	if (locale === "es") return __es.steps_best(inputs)
	if (locale === "zh") return __zh.steps_best(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_best(inputs)
	if (locale === "hi") return __hi.steps_best(inputs)
	if (locale === "ar") return __ar.steps_best(inputs)
	if (locale === "pt") return __pt.steps_best(inputs)
	if (locale === "de") return __de.steps_best(inputs)
	if (locale === "ja") return __ja.steps_best(inputs)
	if (locale === "ko") return __ko.steps_best(inputs)
	if (locale === "it") return __it.steps_best(inputs)
	if (locale === "tr") return __tr.steps_best(inputs)
	if (locale === "pl") return __pl.steps_best(inputs)
	if (locale === "uk") return __uk.steps_best(inputs)
	if (locale === "nl") return __nl.steps_best(inputs)
	if (locale === "vi") return __vi.steps_best(inputs)
	if (locale === "id") return __id.steps_best(inputs)
	if (locale === "ms") return __ms.steps_best(inputs)
	if (locale === "th") return __th.steps_best(inputs)
	if (locale === "fa") return __fa.steps_best(inputs)
	if (locale === "ur") return __ur.steps_best(inputs)
	if (locale === "bn") return __bn.steps_best(inputs)
	if (locale === "pa") return __pa.steps_best(inputs)
	if (locale === "sw") return __sw.steps_best(inputs)
	if (locale === "el") return __el.steps_best(inputs)
	if (locale === "cs") return __cs.steps_best(inputs)
	if (locale === "ro") return __ro.steps_best(inputs)
	if (locale === "hu") return __hu.steps_best(inputs)
	if (locale === "sv") return __sv.steps_best(inputs)
	if (locale === "he") return __he.steps_best(inputs)
	return __ru.steps_best(inputs)
});
/**
* | output |
* | --- |
* | "Counting steps from your phone" |
*
* @param {Steps_CountingInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_counting = /** @type {((inputs?: Steps_CountingInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_CountingInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_counting(inputs)
	if (locale === "fr") return __fr.steps_counting(inputs)
	if (locale === "es") return __es.steps_counting(inputs)
	if (locale === "zh") return __zh.steps_counting(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_counting(inputs)
	if (locale === "hi") return __hi.steps_counting(inputs)
	if (locale === "ar") return __ar.steps_counting(inputs)
	if (locale === "pt") return __pt.steps_counting(inputs)
	if (locale === "de") return __de.steps_counting(inputs)
	if (locale === "ja") return __ja.steps_counting(inputs)
	if (locale === "ko") return __ko.steps_counting(inputs)
	if (locale === "it") return __it.steps_counting(inputs)
	if (locale === "tr") return __tr.steps_counting(inputs)
	if (locale === "pl") return __pl.steps_counting(inputs)
	if (locale === "uk") return __uk.steps_counting(inputs)
	if (locale === "nl") return __nl.steps_counting(inputs)
	if (locale === "vi") return __vi.steps_counting(inputs)
	if (locale === "id") return __id.steps_counting(inputs)
	if (locale === "ms") return __ms.steps_counting(inputs)
	if (locale === "th") return __th.steps_counting(inputs)
	if (locale === "fa") return __fa.steps_counting(inputs)
	if (locale === "ur") return __ur.steps_counting(inputs)
	if (locale === "bn") return __bn.steps_counting(inputs)
	if (locale === "pa") return __pa.steps_counting(inputs)
	if (locale === "sw") return __sw.steps_counting(inputs)
	if (locale === "el") return __el.steps_counting(inputs)
	if (locale === "cs") return __cs.steps_counting(inputs)
	if (locale === "ro") return __ro.steps_counting(inputs)
	if (locale === "hu") return __hu.steps_counting(inputs)
	if (locale === "sv") return __sv.steps_counting(inputs)
	if (locale === "he") return __he.steps_counting(inputs)
	return __ru.steps_counting(inputs)
});
/**
* | output |
* | --- |
* | "Steps aren’t counted on desktop. Open on your phone." |
*
* @param {Steps_DesktopInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_desktop = /** @type {((inputs?: Steps_DesktopInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_DesktopInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_desktop(inputs)
	if (locale === "fr") return __fr.steps_desktop(inputs)
	if (locale === "es") return __es.steps_desktop(inputs)
	if (locale === "zh") return __zh.steps_desktop(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_desktop(inputs)
	if (locale === "hi") return __hi.steps_desktop(inputs)
	if (locale === "ar") return __ar.steps_desktop(inputs)
	if (locale === "pt") return __pt.steps_desktop(inputs)
	if (locale === "de") return __de.steps_desktop(inputs)
	if (locale === "ja") return __ja.steps_desktop(inputs)
	if (locale === "ko") return __ko.steps_desktop(inputs)
	if (locale === "it") return __it.steps_desktop(inputs)
	if (locale === "tr") return __tr.steps_desktop(inputs)
	if (locale === "pl") return __pl.steps_desktop(inputs)
	if (locale === "uk") return __uk.steps_desktop(inputs)
	if (locale === "nl") return __nl.steps_desktop(inputs)
	if (locale === "vi") return __vi.steps_desktop(inputs)
	if (locale === "id") return __id.steps_desktop(inputs)
	if (locale === "ms") return __ms.steps_desktop(inputs)
	if (locale === "th") return __th.steps_desktop(inputs)
	if (locale === "fa") return __fa.steps_desktop(inputs)
	if (locale === "ur") return __ur.steps_desktop(inputs)
	if (locale === "bn") return __bn.steps_desktop(inputs)
	if (locale === "pa") return __pa.steps_desktop(inputs)
	if (locale === "sw") return __sw.steps_desktop(inputs)
	if (locale === "el") return __el.steps_desktop(inputs)
	if (locale === "cs") return __cs.steps_desktop(inputs)
	if (locale === "ro") return __ro.steps_desktop(inputs)
	if (locale === "hu") return __hu.steps_desktop(inputs)
	if (locale === "sv") return __sv.steps_desktop(inputs)
	if (locale === "he") return __he.steps_desktop(inputs)
	return __ru.steps_desktop(inputs)
});
/**
* | output |
* | --- |
* | "Nothing yet" |
*
* @param {Steps_EmptyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_empty = /** @type {((inputs?: Steps_EmptyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_EmptyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_empty(inputs)
	if (locale === "fr") return __fr.steps_empty(inputs)
	if (locale === "es") return __es.steps_empty(inputs)
	if (locale === "zh") return __zh.steps_empty(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_empty(inputs)
	if (locale === "hi") return __hi.steps_empty(inputs)
	if (locale === "ar") return __ar.steps_empty(inputs)
	if (locale === "pt") return __pt.steps_empty(inputs)
	if (locale === "de") return __de.steps_empty(inputs)
	if (locale === "ja") return __ja.steps_empty(inputs)
	if (locale === "ko") return __ko.steps_empty(inputs)
	if (locale === "it") return __it.steps_empty(inputs)
	if (locale === "tr") return __tr.steps_empty(inputs)
	if (locale === "pl") return __pl.steps_empty(inputs)
	if (locale === "uk") return __uk.steps_empty(inputs)
	if (locale === "nl") return __nl.steps_empty(inputs)
	if (locale === "vi") return __vi.steps_empty(inputs)
	if (locale === "id") return __id.steps_empty(inputs)
	if (locale === "ms") return __ms.steps_empty(inputs)
	if (locale === "th") return __th.steps_empty(inputs)
	if (locale === "fa") return __fa.steps_empty(inputs)
	if (locale === "ur") return __ur.steps_empty(inputs)
	if (locale === "bn") return __bn.steps_empty(inputs)
	if (locale === "pa") return __pa.steps_empty(inputs)
	if (locale === "sw") return __sw.steps_empty(inputs)
	if (locale === "el") return __el.steps_empty(inputs)
	if (locale === "cs") return __cs.steps_empty(inputs)
	if (locale === "ro") return __ro.steps_empty(inputs)
	if (locale === "hu") return __hu.steps_empty(inputs)
	if (locale === "sv") return __sv.steps_empty(inputs)
	if (locale === "he") return __he.steps_empty(inputs)
	return __ru.steps_empty(inputs)
});
/**
* | output |
* | --- |
* | "Daily goal reached" |
*
* @param {Steps_Goal_DoneInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_goal_done = /** @type {((inputs?: Steps_Goal_DoneInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_Goal_DoneInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_goal_done(inputs)
	if (locale === "fr") return __fr.steps_goal_done(inputs)
	if (locale === "es") return __es.steps_goal_done(inputs)
	if (locale === "zh") return __zh.steps_goal_done(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_goal_done(inputs)
	if (locale === "hi") return __hi.steps_goal_done(inputs)
	if (locale === "ar") return __ar.steps_goal_done(inputs)
	if (locale === "pt") return __pt.steps_goal_done(inputs)
	if (locale === "de") return __de.steps_goal_done(inputs)
	if (locale === "ja") return __ja.steps_goal_done(inputs)
	if (locale === "ko") return __ko.steps_goal_done(inputs)
	if (locale === "it") return __it.steps_goal_done(inputs)
	if (locale === "tr") return __tr.steps_goal_done(inputs)
	if (locale === "pl") return __pl.steps_goal_done(inputs)
	if (locale === "uk") return __uk.steps_goal_done(inputs)
	if (locale === "nl") return __nl.steps_goal_done(inputs)
	if (locale === "vi") return __vi.steps_goal_done(inputs)
	if (locale === "id") return __id.steps_goal_done(inputs)
	if (locale === "ms") return __ms.steps_goal_done(inputs)
	if (locale === "th") return __th.steps_goal_done(inputs)
	if (locale === "fa") return __fa.steps_goal_done(inputs)
	if (locale === "ur") return __ur.steps_goal_done(inputs)
	if (locale === "bn") return __bn.steps_goal_done(inputs)
	if (locale === "pa") return __pa.steps_goal_done(inputs)
	if (locale === "sw") return __sw.steps_goal_done(inputs)
	if (locale === "el") return __el.steps_goal_done(inputs)
	if (locale === "cs") return __cs.steps_goal_done(inputs)
	if (locale === "ro") return __ro.steps_goal_done(inputs)
	if (locale === "hu") return __hu.steps_goal_done(inputs)
	if (locale === "sv") return __sv.steps_goal_done(inputs)
	if (locale === "he") return __he.steps_goal_done(inputs)
	return __ru.steps_goal_done(inputs)
});
/**
* | output |
* | --- |
* | "Goal" |
*
* @param {Steps_Goal_LabelInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_goal_label = /** @type {((inputs?: Steps_Goal_LabelInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_Goal_LabelInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_goal_label(inputs)
	if (locale === "fr") return __fr.steps_goal_label(inputs)
	if (locale === "es") return __es.steps_goal_label(inputs)
	if (locale === "zh") return __zh.steps_goal_label(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_goal_label(inputs)
	if (locale === "hi") return __hi.steps_goal_label(inputs)
	if (locale === "ar") return __ar.steps_goal_label(inputs)
	if (locale === "pt") return __pt.steps_goal_label(inputs)
	if (locale === "de") return __de.steps_goal_label(inputs)
	if (locale === "ja") return __ja.steps_goal_label(inputs)
	if (locale === "ko") return __ko.steps_goal_label(inputs)
	if (locale === "it") return __it.steps_goal_label(inputs)
	if (locale === "tr") return __tr.steps_goal_label(inputs)
	if (locale === "pl") return __pl.steps_goal_label(inputs)
	if (locale === "uk") return __uk.steps_goal_label(inputs)
	if (locale === "nl") return __nl.steps_goal_label(inputs)
	if (locale === "vi") return __vi.steps_goal_label(inputs)
	if (locale === "id") return __id.steps_goal_label(inputs)
	if (locale === "ms") return __ms.steps_goal_label(inputs)
	if (locale === "th") return __th.steps_goal_label(inputs)
	if (locale === "fa") return __fa.steps_goal_label(inputs)
	if (locale === "ur") return __ur.steps_goal_label(inputs)
	if (locale === "bn") return __bn.steps_goal_label(inputs)
	if (locale === "pa") return __pa.steps_goal_label(inputs)
	if (locale === "sw") return __sw.steps_goal_label(inputs)
	if (locale === "el") return __el.steps_goal_label(inputs)
	if (locale === "cs") return __cs.steps_goal_label(inputs)
	if (locale === "ro") return __ro.steps_goal_label(inputs)
	if (locale === "hu") return __hu.steps_goal_label(inputs)
	if (locale === "sv") return __sv.steps_goal_label(inputs)
	if (locale === "he") return __he.steps_goal_label(inputs)
	return __ru.steps_goal_label(inputs)
});
/**
* | output |
* | --- |
* | "Goal updated" |
*
* @param {Steps_Goal_UpdatedInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_goal_updated = /** @type {((inputs?: Steps_Goal_UpdatedInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_Goal_UpdatedInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_goal_updated(inputs)
	if (locale === "fr") return __fr.steps_goal_updated(inputs)
	if (locale === "es") return __es.steps_goal_updated(inputs)
	if (locale === "zh") return __zh.steps_goal_updated(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_goal_updated(inputs)
	if (locale === "hi") return __hi.steps_goal_updated(inputs)
	if (locale === "ar") return __ar.steps_goal_updated(inputs)
	if (locale === "pt") return __pt.steps_goal_updated(inputs)
	if (locale === "de") return __de.steps_goal_updated(inputs)
	if (locale === "ja") return __ja.steps_goal_updated(inputs)
	if (locale === "ko") return __ko.steps_goal_updated(inputs)
	if (locale === "it") return __it.steps_goal_updated(inputs)
	if (locale === "tr") return __tr.steps_goal_updated(inputs)
	if (locale === "pl") return __pl.steps_goal_updated(inputs)
	if (locale === "uk") return __uk.steps_goal_updated(inputs)
	if (locale === "nl") return __nl.steps_goal_updated(inputs)
	if (locale === "vi") return __vi.steps_goal_updated(inputs)
	if (locale === "id") return __id.steps_goal_updated(inputs)
	if (locale === "ms") return __ms.steps_goal_updated(inputs)
	if (locale === "th") return __th.steps_goal_updated(inputs)
	if (locale === "fa") return __fa.steps_goal_updated(inputs)
	if (locale === "ur") return __ur.steps_goal_updated(inputs)
	if (locale === "bn") return __bn.steps_goal_updated(inputs)
	if (locale === "pa") return __pa.steps_goal_updated(inputs)
	if (locale === "sw") return __sw.steps_goal_updated(inputs)
	if (locale === "el") return __el.steps_goal_updated(inputs)
	if (locale === "cs") return __cs.steps_goal_updated(inputs)
	if (locale === "ro") return __ro.steps_goal_updated(inputs)
	if (locale === "hu") return __hu.steps_goal_updated(inputs)
	if (locale === "sv") return __sv.steps_goal_updated(inputs)
	if (locale === "he") return __he.steps_goal_updated(inputs)
	return __ru.steps_goal_updated(inputs)
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
* | "Phone panel updates itself — you can check less often" |
*
* @param {Steps_Keep_PanelInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_keep_panel = /** @type {((inputs?: Steps_Keep_PanelInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_Keep_PanelInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_keep_panel(inputs)
	if (locale === "fr") return __fr.steps_keep_panel(inputs)
	if (locale === "es") return __es.steps_keep_panel(inputs)
	if (locale === "zh") return __zh.steps_keep_panel(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_keep_panel(inputs)
	if (locale === "hi") return __hi.steps_keep_panel(inputs)
	if (locale === "ar") return __ar.steps_keep_panel(inputs)
	if (locale === "pt") return __pt.steps_keep_panel(inputs)
	if (locale === "de") return __de.steps_keep_panel(inputs)
	if (locale === "ja") return __ja.steps_keep_panel(inputs)
	if (locale === "ko") return __ko.steps_keep_panel(inputs)
	if (locale === "it") return __it.steps_keep_panel(inputs)
	if (locale === "tr") return __tr.steps_keep_panel(inputs)
	if (locale === "pl") return __pl.steps_keep_panel(inputs)
	if (locale === "uk") return __uk.steps_keep_panel(inputs)
	if (locale === "nl") return __nl.steps_keep_panel(inputs)
	if (locale === "vi") return __vi.steps_keep_panel(inputs)
	if (locale === "id") return __id.steps_keep_panel(inputs)
	if (locale === "ms") return __ms.steps_keep_panel(inputs)
	if (locale === "th") return __th.steps_keep_panel(inputs)
	if (locale === "fa") return __fa.steps_keep_panel(inputs)
	if (locale === "ur") return __ur.steps_keep_panel(inputs)
	if (locale === "bn") return __bn.steps_keep_panel(inputs)
	if (locale === "pa") return __pa.steps_keep_panel(inputs)
	if (locale === "sw") return __sw.steps_keep_panel(inputs)
	if (locale === "el") return __el.steps_keep_panel(inputs)
	if (locale === "cs") return __cs.steps_keep_panel(inputs)
	if (locale === "ro") return __ro.steps_keep_panel(inputs)
	if (locale === "hu") return __hu.steps_keep_panel(inputs)
	if (locale === "sv") return __sv.steps_keep_panel(inputs)
	if (locale === "he") return __he.steps_keep_panel(inputs)
	return __ru.steps_keep_panel(inputs)
});
/**
* | output |
* | --- |
* | "Phone counts. Live panel — check less often." |
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
* | "Total" |
*
* @param {Steps_LifeInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_life = /** @type {((inputs?: Steps_LifeInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_LifeInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_life(inputs)
	if (locale === "fr") return __fr.steps_life(inputs)
	if (locale === "es") return __es.steps_life(inputs)
	if (locale === "zh") return __zh.steps_life(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_life(inputs)
	if (locale === "hi") return __hi.steps_life(inputs)
	if (locale === "ar") return __ar.steps_life(inputs)
	if (locale === "pt") return __pt.steps_life(inputs)
	if (locale === "de") return __de.steps_life(inputs)
	if (locale === "ja") return __ja.steps_life(inputs)
	if (locale === "ko") return __ko.steps_life(inputs)
	if (locale === "it") return __it.steps_life(inputs)
	if (locale === "tr") return __tr.steps_life(inputs)
	if (locale === "pl") return __pl.steps_life(inputs)
	if (locale === "uk") return __uk.steps_life(inputs)
	if (locale === "nl") return __nl.steps_life(inputs)
	if (locale === "vi") return __vi.steps_life(inputs)
	if (locale === "id") return __id.steps_life(inputs)
	if (locale === "ms") return __ms.steps_life(inputs)
	if (locale === "th") return __th.steps_life(inputs)
	if (locale === "fa") return __fa.steps_life(inputs)
	if (locale === "ur") return __ur.steps_life(inputs)
	if (locale === "bn") return __bn.steps_life(inputs)
	if (locale === "pa") return __pa.steps_life(inputs)
	if (locale === "sw") return __sw.steps_life(inputs)
	if (locale === "el") return __el.steps_life(inputs)
	if (locale === "cs") return __cs.steps_life(inputs)
	if (locale === "ro") return __ro.steps_life(inputs)
	if (locale === "hu") return __hu.steps_life(inputs)
	if (locale === "sv") return __sv.steps_life(inputs)
	if (locale === "he") return __he.steps_life(inputs)
	return __ru.steps_life(inputs)
});
/**
* | output |
* | --- |
* | "{pct}% · {km} km · goal {goal}" |
*
* @param {Steps_Live_BodyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_live_body = /** @type {((inputs: Steps_Live_BodyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_Live_BodyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_live_body(inputs)
	if (locale === "fr") return __fr.steps_live_body(inputs)
	if (locale === "es") return __es.steps_live_body(inputs)
	if (locale === "zh") return __zh.steps_live_body(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_live_body(inputs)
	if (locale === "hi") return __hi.steps_live_body(inputs)
	if (locale === "ar") return __ar.steps_live_body(inputs)
	if (locale === "pt") return __pt.steps_live_body(inputs)
	if (locale === "de") return __de.steps_live_body(inputs)
	if (locale === "ja") return __ja.steps_live_body(inputs)
	if (locale === "ko") return __ko.steps_live_body(inputs)
	if (locale === "it") return __it.steps_live_body(inputs)
	if (locale === "tr") return __tr.steps_live_body(inputs)
	if (locale === "pl") return __pl.steps_live_body(inputs)
	if (locale === "uk") return __uk.steps_live_body(inputs)
	if (locale === "nl") return __nl.steps_live_body(inputs)
	if (locale === "vi") return __vi.steps_live_body(inputs)
	if (locale === "id") return __id.steps_live_body(inputs)
	if (locale === "ms") return __ms.steps_live_body(inputs)
	if (locale === "th") return __th.steps_live_body(inputs)
	if (locale === "fa") return __fa.steps_live_body(inputs)
	if (locale === "ur") return __ur.steps_live_body(inputs)
	if (locale === "bn") return __bn.steps_live_body(inputs)
	if (locale === "pa") return __pa.steps_live_body(inputs)
	if (locale === "sw") return __sw.steps_live_body(inputs)
	if (locale === "el") return __el.steps_live_body(inputs)
	if (locale === "cs") return __cs.steps_live_body(inputs)
	if (locale === "ro") return __ro.steps_live_body(inputs)
	if (locale === "hu") return __hu.steps_live_body(inputs)
	if (locale === "sv") return __sv.steps_live_body(inputs)
	if (locale === "he") return __he.steps_live_body(inputs)
	return __ru.steps_live_body(inputs)
});
/**
* | output |
* | --- |
* | "Activity" |
*
* @param {Steps_LogInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_log = /** @type {((inputs?: Steps_LogInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_LogInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_log(inputs)
	if (locale === "fr") return __fr.steps_log(inputs)
	if (locale === "es") return __es.steps_log(inputs)
	if (locale === "zh") return __zh.steps_log(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_log(inputs)
	if (locale === "hi") return __hi.steps_log(inputs)
	if (locale === "ar") return __ar.steps_log(inputs)
	if (locale === "pt") return __pt.steps_log(inputs)
	if (locale === "de") return __de.steps_log(inputs)
	if (locale === "ja") return __ja.steps_log(inputs)
	if (locale === "ko") return __ko.steps_log(inputs)
	if (locale === "it") return __it.steps_log(inputs)
	if (locale === "tr") return __tr.steps_log(inputs)
	if (locale === "pl") return __pl.steps_log(inputs)
	if (locale === "uk") return __uk.steps_log(inputs)
	if (locale === "nl") return __nl.steps_log(inputs)
	if (locale === "vi") return __vi.steps_log(inputs)
	if (locale === "id") return __id.steps_log(inputs)
	if (locale === "ms") return __ms.steps_log(inputs)
	if (locale === "th") return __th.steps_log(inputs)
	if (locale === "fa") return __fa.steps_log(inputs)
	if (locale === "ur") return __ur.steps_log(inputs)
	if (locale === "bn") return __bn.steps_log(inputs)
	if (locale === "pa") return __pa.steps_log(inputs)
	if (locale === "sw") return __sw.steps_log(inputs)
	if (locale === "el") return __el.steps_log(inputs)
	if (locale === "cs") return __cs.steps_log(inputs)
	if (locale === "ro") return __ro.steps_log(inputs)
	if (locale === "hu") return __hu.steps_log(inputs)
	if (locale === "sv") return __sv.steps_log(inputs)
	if (locale === "he") return __he.steps_log(inputs)
	return __ru.steps_log(inputs)
});
/**
* | output |
* | --- |
* | "Motion access is required" |
*
* @param {Steps_Need_MotionInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_need_motion = /** @type {((inputs?: Steps_Need_MotionInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_Need_MotionInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_need_motion(inputs)
	if (locale === "fr") return __fr.steps_need_motion(inputs)
	if (locale === "es") return __es.steps_need_motion(inputs)
	if (locale === "zh") return __zh.steps_need_motion(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_need_motion(inputs)
	if (locale === "hi") return __hi.steps_need_motion(inputs)
	if (locale === "ar") return __ar.steps_need_motion(inputs)
	if (locale === "pt") return __pt.steps_need_motion(inputs)
	if (locale === "de") return __de.steps_need_motion(inputs)
	if (locale === "ja") return __ja.steps_need_motion(inputs)
	if (locale === "ko") return __ko.steps_need_motion(inputs)
	if (locale === "it") return __it.steps_need_motion(inputs)
	if (locale === "tr") return __tr.steps_need_motion(inputs)
	if (locale === "pl") return __pl.steps_need_motion(inputs)
	if (locale === "uk") return __uk.steps_need_motion(inputs)
	if (locale === "nl") return __nl.steps_need_motion(inputs)
	if (locale === "vi") return __vi.steps_need_motion(inputs)
	if (locale === "id") return __id.steps_need_motion(inputs)
	if (locale === "ms") return __ms.steps_need_motion(inputs)
	if (locale === "th") return __th.steps_need_motion(inputs)
	if (locale === "fa") return __fa.steps_need_motion(inputs)
	if (locale === "ur") return __ur.steps_need_motion(inputs)
	if (locale === "bn") return __bn.steps_need_motion(inputs)
	if (locale === "pa") return __pa.steps_need_motion(inputs)
	if (locale === "sw") return __sw.steps_need_motion(inputs)
	if (locale === "el") return __el.steps_need_motion(inputs)
	if (locale === "cs") return __cs.steps_need_motion(inputs)
	if (locale === "ro") return __ro.steps_need_motion(inputs)
	if (locale === "hu") return __hu.steps_need_motion(inputs)
	if (locale === "sv") return __sv.steps_need_motion(inputs)
	if (locale === "he") return __he.steps_need_motion(inputs)
	return __ru.steps_need_motion(inputs)
});
/**
* | output |
* | --- |
* | "Notifications blocked — phone panel unavailable" |
*
* @param {Steps_Notify_DeniedInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_notify_denied = /** @type {((inputs?: Steps_Notify_DeniedInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_Notify_DeniedInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_notify_denied(inputs)
	if (locale === "fr") return __fr.steps_notify_denied(inputs)
	if (locale === "es") return __es.steps_notify_denied(inputs)
	if (locale === "zh") return __zh.steps_notify_denied(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_notify_denied(inputs)
	if (locale === "hi") return __hi.steps_notify_denied(inputs)
	if (locale === "ar") return __ar.steps_notify_denied(inputs)
	if (locale === "pt") return __pt.steps_notify_denied(inputs)
	if (locale === "de") return __de.steps_notify_denied(inputs)
	if (locale === "ja") return __ja.steps_notify_denied(inputs)
	if (locale === "ko") return __ko.steps_notify_denied(inputs)
	if (locale === "it") return __it.steps_notify_denied(inputs)
	if (locale === "tr") return __tr.steps_notify_denied(inputs)
	if (locale === "pl") return __pl.steps_notify_denied(inputs)
	if (locale === "uk") return __uk.steps_notify_denied(inputs)
	if (locale === "nl") return __nl.steps_notify_denied(inputs)
	if (locale === "vi") return __vi.steps_notify_denied(inputs)
	if (locale === "id") return __id.steps_notify_denied(inputs)
	if (locale === "ms") return __ms.steps_notify_denied(inputs)
	if (locale === "th") return __th.steps_notify_denied(inputs)
	if (locale === "fa") return __fa.steps_notify_denied(inputs)
	if (locale === "ur") return __ur.steps_notify_denied(inputs)
	if (locale === "bn") return __bn.steps_notify_denied(inputs)
	if (locale === "pa") return __pa.steps_notify_denied(inputs)
	if (locale === "sw") return __sw.steps_notify_denied(inputs)
	if (locale === "el") return __el.steps_notify_denied(inputs)
	if (locale === "cs") return __cs.steps_notify_denied(inputs)
	if (locale === "ro") return __ro.steps_notify_denied(inputs)
	if (locale === "hu") return __hu.steps_notify_denied(inputs)
	if (locale === "sv") return __sv.steps_notify_denied(inputs)
	if (locale === "he") return __he.steps_notify_denied(inputs)
	return __ru.steps_notify_denied(inputs)
});
/**
* | output |
* | --- |
* | "of {goal}" |
*
* @param {Steps_Of_GoalInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_of_goal = /** @type {((inputs: Steps_Of_GoalInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_Of_GoalInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_of_goal(inputs)
	if (locale === "fr") return __fr.steps_of_goal(inputs)
	if (locale === "es") return __es.steps_of_goal(inputs)
	if (locale === "zh") return __zh.steps_of_goal(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_of_goal(inputs)
	if (locale === "hi") return __hi.steps_of_goal(inputs)
	if (locale === "ar") return __ar.steps_of_goal(inputs)
	if (locale === "pt") return __pt.steps_of_goal(inputs)
	if (locale === "de") return __de.steps_of_goal(inputs)
	if (locale === "ja") return __ja.steps_of_goal(inputs)
	if (locale === "ko") return __ko.steps_of_goal(inputs)
	if (locale === "it") return __it.steps_of_goal(inputs)
	if (locale === "tr") return __tr.steps_of_goal(inputs)
	if (locale === "pl") return __pl.steps_of_goal(inputs)
	if (locale === "uk") return __uk.steps_of_goal(inputs)
	if (locale === "nl") return __nl.steps_of_goal(inputs)
	if (locale === "vi") return __vi.steps_of_goal(inputs)
	if (locale === "id") return __id.steps_of_goal(inputs)
	if (locale === "ms") return __ms.steps_of_goal(inputs)
	if (locale === "th") return __th.steps_of_goal(inputs)
	if (locale === "fa") return __fa.steps_of_goal(inputs)
	if (locale === "ur") return __ur.steps_of_goal(inputs)
	if (locale === "bn") return __bn.steps_of_goal(inputs)
	if (locale === "pa") return __pa.steps_of_goal(inputs)
	if (locale === "sw") return __sw.steps_of_goal(inputs)
	if (locale === "el") return __el.steps_of_goal(inputs)
	if (locale === "cs") return __cs.steps_of_goal(inputs)
	if (locale === "ro") return __ro.steps_of_goal(inputs)
	if (locale === "hu") return __hu.steps_of_goal(inputs)
	if (locale === "sv") return __sv.steps_of_goal(inputs)
	if (locale === "he") return __he.steps_of_goal(inputs)
	return __ru.steps_of_goal(inputs)
});
/**
* | output |
* | --- |
* | "OK" |
*
* @param {Steps_OkInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_ok = /** @type {((inputs?: Steps_OkInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_OkInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_ok(inputs)
	if (locale === "fr") return __fr.steps_ok(inputs)
	if (locale === "es") return __es.steps_ok(inputs)
	if (locale === "zh") return __zh.steps_ok(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_ok(inputs)
	if (locale === "hi") return __hi.steps_ok(inputs)
	if (locale === "ar") return __ar.steps_ok(inputs)
	if (locale === "pt") return __pt.steps_ok(inputs)
	if (locale === "de") return __de.steps_ok(inputs)
	if (locale === "ja") return __ja.steps_ok(inputs)
	if (locale === "ko") return __ko.steps_ok(inputs)
	if (locale === "it") return __it.steps_ok(inputs)
	if (locale === "tr") return __tr.steps_ok(inputs)
	if (locale === "pl") return __pl.steps_ok(inputs)
	if (locale === "uk") return __uk.steps_ok(inputs)
	if (locale === "nl") return __nl.steps_ok(inputs)
	if (locale === "vi") return __vi.steps_ok(inputs)
	if (locale === "id") return __id.steps_ok(inputs)
	if (locale === "ms") return __ms.steps_ok(inputs)
	if (locale === "th") return __th.steps_ok(inputs)
	if (locale === "fa") return __fa.steps_ok(inputs)
	if (locale === "ur") return __ur.steps_ok(inputs)
	if (locale === "bn") return __bn.steps_ok(inputs)
	if (locale === "pa") return __pa.steps_ok(inputs)
	if (locale === "sw") return __sw.steps_ok(inputs)
	if (locale === "el") return __el.steps_ok(inputs)
	if (locale === "cs") return __cs.steps_ok(inputs)
	if (locale === "ro") return __ro.steps_ok(inputs)
	if (locale === "hu") return __hu.steps_ok(inputs)
	if (locale === "sv") return __sv.steps_ok(inputs)
	if (locale === "he") return __he.steps_ok(inputs)
	return __ru.steps_ok(inputs)
});
/**
* | output |
* | --- |
* | "Phone panel" |
*
* @param {Steps_PinInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_pin = /** @type {((inputs?: Steps_PinInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_PinInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_pin(inputs)
	if (locale === "fr") return __fr.steps_pin(inputs)
	if (locale === "es") return __es.steps_pin(inputs)
	if (locale === "zh") return __zh.steps_pin(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_pin(inputs)
	if (locale === "hi") return __hi.steps_pin(inputs)
	if (locale === "ar") return __ar.steps_pin(inputs)
	if (locale === "pt") return __pt.steps_pin(inputs)
	if (locale === "de") return __de.steps_pin(inputs)
	if (locale === "ja") return __ja.steps_pin(inputs)
	if (locale === "ko") return __ko.steps_pin(inputs)
	if (locale === "it") return __it.steps_pin(inputs)
	if (locale === "tr") return __tr.steps_pin(inputs)
	if (locale === "pl") return __pl.steps_pin(inputs)
	if (locale === "uk") return __uk.steps_pin(inputs)
	if (locale === "nl") return __nl.steps_pin(inputs)
	if (locale === "vi") return __vi.steps_pin(inputs)
	if (locale === "id") return __id.steps_pin(inputs)
	if (locale === "ms") return __ms.steps_pin(inputs)
	if (locale === "th") return __th.steps_pin(inputs)
	if (locale === "fa") return __fa.steps_pin(inputs)
	if (locale === "ur") return __ur.steps_pin(inputs)
	if (locale === "bn") return __bn.steps_pin(inputs)
	if (locale === "pa") return __pa.steps_pin(inputs)
	if (locale === "sw") return __sw.steps_pin(inputs)
	if (locale === "el") return __el.steps_pin(inputs)
	if (locale === "cs") return __cs.steps_pin(inputs)
	if (locale === "ro") return __ro.steps_pin(inputs)
	if (locale === "hu") return __hu.steps_pin(inputs)
	if (locale === "sv") return __sv.steps_pin(inputs)
	if (locale === "he") return __he.steps_pin(inputs)
	return __ru.steps_pin(inputs)
});
/**
* | output |
* | --- |
* | "Sensor is quiet. Keep the screen awake or install the shortcut." |
*
* @param {Steps_Sensor_QuietInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_sensor_quiet = /** @type {((inputs?: Steps_Sensor_QuietInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_Sensor_QuietInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_sensor_quiet(inputs)
	if (locale === "fr") return __fr.steps_sensor_quiet(inputs)
	if (locale === "es") return __es.steps_sensor_quiet(inputs)
	if (locale === "zh") return __zh.steps_sensor_quiet(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_sensor_quiet(inputs)
	if (locale === "hi") return __hi.steps_sensor_quiet(inputs)
	if (locale === "ar") return __ar.steps_sensor_quiet(inputs)
	if (locale === "pt") return __pt.steps_sensor_quiet(inputs)
	if (locale === "de") return __de.steps_sensor_quiet(inputs)
	if (locale === "ja") return __ja.steps_sensor_quiet(inputs)
	if (locale === "ko") return __ko.steps_sensor_quiet(inputs)
	if (locale === "it") return __it.steps_sensor_quiet(inputs)
	if (locale === "tr") return __tr.steps_sensor_quiet(inputs)
	if (locale === "pl") return __pl.steps_sensor_quiet(inputs)
	if (locale === "uk") return __uk.steps_sensor_quiet(inputs)
	if (locale === "nl") return __nl.steps_sensor_quiet(inputs)
	if (locale === "vi") return __vi.steps_sensor_quiet(inputs)
	if (locale === "id") return __id.steps_sensor_quiet(inputs)
	if (locale === "ms") return __ms.steps_sensor_quiet(inputs)
	if (locale === "th") return __th.steps_sensor_quiet(inputs)
	if (locale === "fa") return __fa.steps_sensor_quiet(inputs)
	if (locale === "ur") return __ur.steps_sensor_quiet(inputs)
	if (locale === "bn") return __bn.steps_sensor_quiet(inputs)
	if (locale === "pa") return __pa.steps_sensor_quiet(inputs)
	if (locale === "sw") return __sw.steps_sensor_quiet(inputs)
	if (locale === "el") return __el.steps_sensor_quiet(inputs)
	if (locale === "cs") return __cs.steps_sensor_quiet(inputs)
	if (locale === "ro") return __ro.steps_sensor_quiet(inputs)
	if (locale === "hu") return __hu.steps_sensor_quiet(inputs)
	if (locale === "sv") return __sv.steps_sensor_quiet(inputs)
	if (locale === "he") return __he.steps_sensor_quiet(inputs)
	return __ru.steps_sensor_quiet(inputs)
});
/**
* | output |
* | --- |
* | "Streak" |
*
* @param {Steps_StreakInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_streak = /** @type {((inputs?: Steps_StreakInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_StreakInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_streak(inputs)
	if (locale === "fr") return __fr.steps_streak(inputs)
	if (locale === "es") return __es.steps_streak(inputs)
	if (locale === "zh") return __zh.steps_streak(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_streak(inputs)
	if (locale === "hi") return __hi.steps_streak(inputs)
	if (locale === "ar") return __ar.steps_streak(inputs)
	if (locale === "pt") return __pt.steps_streak(inputs)
	if (locale === "de") return __de.steps_streak(inputs)
	if (locale === "ja") return __ja.steps_streak(inputs)
	if (locale === "ko") return __ko.steps_streak(inputs)
	if (locale === "it") return __it.steps_streak(inputs)
	if (locale === "tr") return __tr.steps_streak(inputs)
	if (locale === "pl") return __pl.steps_streak(inputs)
	if (locale === "uk") return __uk.steps_streak(inputs)
	if (locale === "nl") return __nl.steps_streak(inputs)
	if (locale === "vi") return __vi.steps_streak(inputs)
	if (locale === "id") return __id.steps_streak(inputs)
	if (locale === "ms") return __ms.steps_streak(inputs)
	if (locale === "th") return __th.steps_streak(inputs)
	if (locale === "fa") return __fa.steps_streak(inputs)
	if (locale === "ur") return __ur.steps_streak(inputs)
	if (locale === "bn") return __bn.steps_streak(inputs)
	if (locale === "pa") return __pa.steps_streak(inputs)
	if (locale === "sw") return __sw.steps_streak(inputs)
	if (locale === "el") return __el.steps_streak(inputs)
	if (locale === "cs") return __cs.steps_streak(inputs)
	if (locale === "ro") return __ro.steps_streak(inputs)
	if (locale === "hu") return __hu.steps_streak(inputs)
	if (locale === "sv") return __sv.steps_streak(inputs)
	if (locale === "he") return __he.steps_streak(inputs)
	return __ru.steps_streak(inputs)
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
/**
* | output |
* | --- |
* | "{pct}% today" |
*
* @param {Steps_Today_PctInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_today_pct = /** @type {((inputs: Steps_Today_PctInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_Today_PctInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_today_pct(inputs)
	if (locale === "fr") return __fr.steps_today_pct(inputs)
	if (locale === "es") return __es.steps_today_pct(inputs)
	if (locale === "zh") return __zh.steps_today_pct(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_today_pct(inputs)
	if (locale === "hi") return __hi.steps_today_pct(inputs)
	if (locale === "ar") return __ar.steps_today_pct(inputs)
	if (locale === "pt") return __pt.steps_today_pct(inputs)
	if (locale === "de") return __de.steps_today_pct(inputs)
	if (locale === "ja") return __ja.steps_today_pct(inputs)
	if (locale === "ko") return __ko.steps_today_pct(inputs)
	if (locale === "it") return __it.steps_today_pct(inputs)
	if (locale === "tr") return __tr.steps_today_pct(inputs)
	if (locale === "pl") return __pl.steps_today_pct(inputs)
	if (locale === "uk") return __uk.steps_today_pct(inputs)
	if (locale === "nl") return __nl.steps_today_pct(inputs)
	if (locale === "vi") return __vi.steps_today_pct(inputs)
	if (locale === "id") return __id.steps_today_pct(inputs)
	if (locale === "ms") return __ms.steps_today_pct(inputs)
	if (locale === "th") return __th.steps_today_pct(inputs)
	if (locale === "fa") return __fa.steps_today_pct(inputs)
	if (locale === "ur") return __ur.steps_today_pct(inputs)
	if (locale === "bn") return __bn.steps_today_pct(inputs)
	if (locale === "pa") return __pa.steps_today_pct(inputs)
	if (locale === "sw") return __sw.steps_today_pct(inputs)
	if (locale === "el") return __el.steps_today_pct(inputs)
	if (locale === "cs") return __cs.steps_today_pct(inputs)
	if (locale === "ro") return __ro.steps_today_pct(inputs)
	if (locale === "hu") return __hu.steps_today_pct(inputs)
	if (locale === "sv") return __sv.steps_today_pct(inputs)
	if (locale === "he") return __he.steps_today_pct(inputs)
	return __ru.steps_today_pct(inputs)
});
/**
* | output |
* | --- |
* | "Week" |
*
* @param {Steps_WeekInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_week = /** @type {((inputs?: Steps_WeekInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_WeekInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_week(inputs)
	if (locale === "fr") return __fr.steps_week(inputs)
	if (locale === "es") return __es.steps_week(inputs)
	if (locale === "zh") return __zh.steps_week(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_week(inputs)
	if (locale === "hi") return __hi.steps_week(inputs)
	if (locale === "ar") return __ar.steps_week(inputs)
	if (locale === "pt") return __pt.steps_week(inputs)
	if (locale === "de") return __de.steps_week(inputs)
	if (locale === "ja") return __ja.steps_week(inputs)
	if (locale === "ko") return __ko.steps_week(inputs)
	if (locale === "it") return __it.steps_week(inputs)
	if (locale === "tr") return __tr.steps_week(inputs)
	if (locale === "pl") return __pl.steps_week(inputs)
	if (locale === "uk") return __uk.steps_week(inputs)
	if (locale === "nl") return __nl.steps_week(inputs)
	if (locale === "vi") return __vi.steps_week(inputs)
	if (locale === "id") return __id.steps_week(inputs)
	if (locale === "ms") return __ms.steps_week(inputs)
	if (locale === "th") return __th.steps_week(inputs)
	if (locale === "fa") return __fa.steps_week(inputs)
	if (locale === "ur") return __ur.steps_week(inputs)
	if (locale === "bn") return __bn.steps_week(inputs)
	if (locale === "pa") return __pa.steps_week(inputs)
	if (locale === "sw") return __sw.steps_week(inputs)
	if (locale === "el") return __el.steps_week(inputs)
	if (locale === "cs") return __cs.steps_week(inputs)
	if (locale === "ro") return __ro.steps_week(inputs)
	if (locale === "hu") return __hu.steps_week(inputs)
	if (locale === "sv") return __sv.steps_week(inputs)
	if (locale === "he") return __he.steps_week(inputs)
	return __ru.steps_week(inputs)
});
/**
* | output |
* | --- |
* | "steps" |
*
* @param {Steps_Word_FewInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_word_few = /** @type {((inputs?: Steps_Word_FewInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_Word_FewInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_word_few(inputs)
	if (locale === "fr") return __fr.steps_word_few(inputs)
	if (locale === "es") return __es.steps_word_few(inputs)
	if (locale === "zh") return __zh.steps_word_few(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_word_few(inputs)
	if (locale === "hi") return __hi.steps_word_few(inputs)
	if (locale === "ar") return __ar.steps_word_few(inputs)
	if (locale === "pt") return __pt.steps_word_few(inputs)
	if (locale === "de") return __de.steps_word_few(inputs)
	if (locale === "ja") return __ja.steps_word_few(inputs)
	if (locale === "ko") return __ko.steps_word_few(inputs)
	if (locale === "it") return __it.steps_word_few(inputs)
	if (locale === "tr") return __tr.steps_word_few(inputs)
	if (locale === "pl") return __pl.steps_word_few(inputs)
	if (locale === "uk") return __uk.steps_word_few(inputs)
	if (locale === "nl") return __nl.steps_word_few(inputs)
	if (locale === "vi") return __vi.steps_word_few(inputs)
	if (locale === "id") return __id.steps_word_few(inputs)
	if (locale === "ms") return __ms.steps_word_few(inputs)
	if (locale === "th") return __th.steps_word_few(inputs)
	if (locale === "fa") return __fa.steps_word_few(inputs)
	if (locale === "ur") return __ur.steps_word_few(inputs)
	if (locale === "bn") return __bn.steps_word_few(inputs)
	if (locale === "pa") return __pa.steps_word_few(inputs)
	if (locale === "sw") return __sw.steps_word_few(inputs)
	if (locale === "el") return __el.steps_word_few(inputs)
	if (locale === "cs") return __cs.steps_word_few(inputs)
	if (locale === "ro") return __ro.steps_word_few(inputs)
	if (locale === "hu") return __hu.steps_word_few(inputs)
	if (locale === "sv") return __sv.steps_word_few(inputs)
	if (locale === "he") return __he.steps_word_few(inputs)
	return __ru.steps_word_few(inputs)
});
/**
* | output |
* | --- |
* | "steps" |
*
* @param {Steps_Word_ManyInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_word_many = /** @type {((inputs?: Steps_Word_ManyInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_Word_ManyInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_word_many(inputs)
	if (locale === "fr") return __fr.steps_word_many(inputs)
	if (locale === "es") return __es.steps_word_many(inputs)
	if (locale === "zh") return __zh.steps_word_many(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_word_many(inputs)
	if (locale === "hi") return __hi.steps_word_many(inputs)
	if (locale === "ar") return __ar.steps_word_many(inputs)
	if (locale === "pt") return __pt.steps_word_many(inputs)
	if (locale === "de") return __de.steps_word_many(inputs)
	if (locale === "ja") return __ja.steps_word_many(inputs)
	if (locale === "ko") return __ko.steps_word_many(inputs)
	if (locale === "it") return __it.steps_word_many(inputs)
	if (locale === "tr") return __tr.steps_word_many(inputs)
	if (locale === "pl") return __pl.steps_word_many(inputs)
	if (locale === "uk") return __uk.steps_word_many(inputs)
	if (locale === "nl") return __nl.steps_word_many(inputs)
	if (locale === "vi") return __vi.steps_word_many(inputs)
	if (locale === "id") return __id.steps_word_many(inputs)
	if (locale === "ms") return __ms.steps_word_many(inputs)
	if (locale === "th") return __th.steps_word_many(inputs)
	if (locale === "fa") return __fa.steps_word_many(inputs)
	if (locale === "ur") return __ur.steps_word_many(inputs)
	if (locale === "bn") return __bn.steps_word_many(inputs)
	if (locale === "pa") return __pa.steps_word_many(inputs)
	if (locale === "sw") return __sw.steps_word_many(inputs)
	if (locale === "el") return __el.steps_word_many(inputs)
	if (locale === "cs") return __cs.steps_word_many(inputs)
	if (locale === "ro") return __ro.steps_word_many(inputs)
	if (locale === "hu") return __hu.steps_word_many(inputs)
	if (locale === "sv") return __sv.steps_word_many(inputs)
	if (locale === "he") return __he.steps_word_many(inputs)
	return __ru.steps_word_many(inputs)
});
/**
* | output |
* | --- |
* | "step" |
*
* @param {Steps_Word_OneInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_word_one = /** @type {((inputs?: Steps_Word_OneInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_Word_OneInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_word_one(inputs)
	if (locale === "fr") return __fr.steps_word_one(inputs)
	if (locale === "es") return __es.steps_word_one(inputs)
	if (locale === "zh") return __zh.steps_word_one(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_word_one(inputs)
	if (locale === "hi") return __hi.steps_word_one(inputs)
	if (locale === "ar") return __ar.steps_word_one(inputs)
	if (locale === "pt") return __pt.steps_word_one(inputs)
	if (locale === "de") return __de.steps_word_one(inputs)
	if (locale === "ja") return __ja.steps_word_one(inputs)
	if (locale === "ko") return __ko.steps_word_one(inputs)
	if (locale === "it") return __it.steps_word_one(inputs)
	if (locale === "tr") return __tr.steps_word_one(inputs)
	if (locale === "pl") return __pl.steps_word_one(inputs)
	if (locale === "uk") return __uk.steps_word_one(inputs)
	if (locale === "nl") return __nl.steps_word_one(inputs)
	if (locale === "vi") return __vi.steps_word_one(inputs)
	if (locale === "id") return __id.steps_word_one(inputs)
	if (locale === "ms") return __ms.steps_word_one(inputs)
	if (locale === "th") return __th.steps_word_one(inputs)
	if (locale === "fa") return __fa.steps_word_one(inputs)
	if (locale === "ur") return __ur.steps_word_one(inputs)
	if (locale === "bn") return __bn.steps_word_one(inputs)
	if (locale === "pa") return __pa.steps_word_one(inputs)
	if (locale === "sw") return __sw.steps_word_one(inputs)
	if (locale === "el") return __el.steps_word_one(inputs)
	if (locale === "cs") return __cs.steps_word_one(inputs)
	if (locale === "ro") return __ro.steps_word_one(inputs)
	if (locale === "hu") return __hu.steps_word_one(inputs)
	if (locale === "sv") return __sv.steps_word_one(inputs)
	if (locale === "he") return __he.steps_word_one(inputs)
	return __ru.steps_word_one(inputs)
});
/**
* | output |
* | --- |
* | "Year" |
*
* @param {Steps_YearInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_year = /** @type {((inputs?: Steps_YearInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_YearInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_year(inputs)
	if (locale === "fr") return __fr.steps_year(inputs)
	if (locale === "es") return __es.steps_year(inputs)
	if (locale === "zh") return __zh.steps_year(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_year(inputs)
	if (locale === "hi") return __hi.steps_year(inputs)
	if (locale === "ar") return __ar.steps_year(inputs)
	if (locale === "pt") return __pt.steps_year(inputs)
	if (locale === "de") return __de.steps_year(inputs)
	if (locale === "ja") return __ja.steps_year(inputs)
	if (locale === "ko") return __ko.steps_year(inputs)
	if (locale === "it") return __it.steps_year(inputs)
	if (locale === "tr") return __tr.steps_year(inputs)
	if (locale === "pl") return __pl.steps_year(inputs)
	if (locale === "uk") return __uk.steps_year(inputs)
	if (locale === "nl") return __nl.steps_year(inputs)
	if (locale === "vi") return __vi.steps_year(inputs)
	if (locale === "id") return __id.steps_year(inputs)
	if (locale === "ms") return __ms.steps_year(inputs)
	if (locale === "th") return __th.steps_year(inputs)
	if (locale === "fa") return __fa.steps_year(inputs)
	if (locale === "ur") return __ur.steps_year(inputs)
	if (locale === "bn") return __bn.steps_year(inputs)
	if (locale === "pa") return __pa.steps_year(inputs)
	if (locale === "sw") return __sw.steps_year(inputs)
	if (locale === "el") return __el.steps_year(inputs)
	if (locale === "cs") return __cs.steps_year(inputs)
	if (locale === "ro") return __ro.steps_year(inputs)
	if (locale === "hu") return __hu.steps_year(inputs)
	if (locale === "sv") return __sv.steps_year(inputs)
	if (locale === "he") return __he.steps_year(inputs)
	return __ru.steps_year(inputs)
});
/**
* | output |
* | --- |
* | "Day color shows how far you walked" |
*
* @param {Steps_Year_HintInputs} inputs
* @param {{ locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }} options
* @returns {LocalizedString}
*/
export const steps_year_hint = /** @type {((inputs?: Steps_Year_HintInputs, options?: { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }) => LocalizedString) & import('../runtime.js').MessageMetadata<Steps_Year_HintInputs, { locale?: "ru" | "en" | "fr" | "es" | "zh" | "zh-TW" | "hi" | "ar" | "pt" | "de" | "ja" | "ko" | "it" | "tr" | "pl" | "uk" | "nl" | "vi" | "id" | "ms" | "th" | "fa" | "ur" | "bn" | "pa" | "sw" | "el" | "cs" | "ro" | "hu" | "sv" | "he" }, {}>} */ ((inputs = {}, options = {}) => {
	const locale = experimentalStaticLocale ?? options.locale ?? getLocale()
	if (locale === "en") return __en.steps_year_hint(inputs)
	if (locale === "fr") return __fr.steps_year_hint(inputs)
	if (locale === "es") return __es.steps_year_hint(inputs)
	if (locale === "zh") return __zh.steps_year_hint(inputs)
	if (locale === "zh-TW") return __zh_tw2.steps_year_hint(inputs)
	if (locale === "hi") return __hi.steps_year_hint(inputs)
	if (locale === "ar") return __ar.steps_year_hint(inputs)
	if (locale === "pt") return __pt.steps_year_hint(inputs)
	if (locale === "de") return __de.steps_year_hint(inputs)
	if (locale === "ja") return __ja.steps_year_hint(inputs)
	if (locale === "ko") return __ko.steps_year_hint(inputs)
	if (locale === "it") return __it.steps_year_hint(inputs)
	if (locale === "tr") return __tr.steps_year_hint(inputs)
	if (locale === "pl") return __pl.steps_year_hint(inputs)
	if (locale === "uk") return __uk.steps_year_hint(inputs)
	if (locale === "nl") return __nl.steps_year_hint(inputs)
	if (locale === "vi") return __vi.steps_year_hint(inputs)
	if (locale === "id") return __id.steps_year_hint(inputs)
	if (locale === "ms") return __ms.steps_year_hint(inputs)
	if (locale === "th") return __th.steps_year_hint(inputs)
	if (locale === "fa") return __fa.steps_year_hint(inputs)
	if (locale === "ur") return __ur.steps_year_hint(inputs)
	if (locale === "bn") return __bn.steps_year_hint(inputs)
	if (locale === "pa") return __pa.steps_year_hint(inputs)
	if (locale === "sw") return __sw.steps_year_hint(inputs)
	if (locale === "el") return __el.steps_year_hint(inputs)
	if (locale === "cs") return __cs.steps_year_hint(inputs)
	if (locale === "ro") return __ro.steps_year_hint(inputs)
	if (locale === "hu") return __hu.steps_year_hint(inputs)
	if (locale === "sv") return __sv.steps_year_hint(inputs)
	if (locale === "he") return __he.steps_year_hint(inputs)
	return __ru.steps_year_hint(inputs)
});