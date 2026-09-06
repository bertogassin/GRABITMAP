import { mkdir, writeFile } from "node:fs/promises";

const LOCALES = ["ru","en","fr","es","zh","zh-TW","hi","ar","pt","de","ja","ko","it","tr","pl","uk","nl","vi","id","ms","th","fa","ur","bn","pa","sw","el","cs","ro","hu","sv","he"];

const RU = {
  nav_cities:"Города",nav_search:"Поиск",nav_chats:"Чаты",nav_menu:"Меню",
  common_profile:"Профиль",common_open_profile:"Открыть профиль",common_rules:"Правила",common_privacy:"Политика",
  common_login:"Войти",common_register:"Регистрация",common_back:"Назад",common_to_map:"К карте",
  common_account_needed:"Нужен аккаунт",common_account_needed_body:"Раздел «{feature}» доступен после входа. Города и поиск работают без регистрации.",
  common_guest_mode:"Вы в гостевом режиме",common_guest_copy:"Смотрите карту и объявления без регистрации. Войдите, когда понадобятся сообщения, избранное или публикации.",
  common_login_password:"Логин и пароль",common_create_account:"Создать аккаунт на сайте",footer_aria:"Версия приложения",
  menu_title:"Меню",menu_lead:"Звук, день и ночь, ярлык на главном экране.",menu_section_caption:"Профиль, объявление и настройки",
  menu_app:"Приложение",menu_install_hint:"На главный экран телефона",menu_download:"Скачать",
  menu_sound:"Звук",menu_sound_on:"Включён",menu_sound_off:"Выключен",menu_haptics:"Вибрация",
  menu_haptics_on:"Включена",menu_haptics_off:"Выключена",menu_sound_test:"Проверить звук",menu_sound_test_hint:"Короткий сигнал",
  menu_theme:"День и ночь",menu_theme_dark:"Сейчас тёмная",menu_theme_light:"Сейчас светлая",
  menu_language:"Язык",menu_language_hint:"Интерфейс приложения",menu_save_language:"Сохранить",
  menu_profile_card:"Профиль",menu_profile_meta:"Аккаунт и объявления",menu_steps_card:"Шагомер",
  menu_steps_meta:"10 000 шагов за день",menu_add_card:"Добавить объявление",menu_add_meta:"Город, рубрика и текст объявления",
  chat_title:"Чаты",chat_dialogs:"Диалоги",chat_lead:"Личные диалоги и группы.",chat_all_read:"Все прочитано",
  chat_empty:"Нет диалогов",chat_group:"Группа",chat_new_group:"Создать группу",chat_members:"Участники",
  chat_leave:"Выйти",chat_photo:"Фото",chat_typing:"печатает…",chat_online:"онлайн",chat_reply:"Ответить",
  chat_copy:"Копировать",chat_forward:"Переслать",chat_edit:"Изменить",chat_delete:"Удалить",
  steps_title:"Шагомер",steps_lead:"Цель дня — 10 000 шагов.",steps_install:"На экран телефона",
  notifications_title:"Уведомления",search_title:"Поиск",profile_title:"Профиль",
  legal_rules:"Правила",legal_privacy:"Политика",
  pwa_installed:"Уже скачано",
};

const EN = {
  nav_cities:"Cities",nav_search:"Search",nav_chats:"Chats",nav_menu:"Menu",
  common_profile:"Profile",common_open_profile:"Open profile",common_rules:"Rules",common_privacy:"Privacy",
  common_login:"Log in",common_register:"Sign up",common_back:"Back",common_to_map:"To the map",
  common_account_needed:"Account required",common_account_needed_body:"“{feature}” is available after login. Cities and search work without an account.",
  common_guest_mode:"You are browsing as a guest",common_guest_copy:"Browse the map and listings without signing up. Log in for messages, favorites and posts.",
  common_login_password:"Email and password",common_create_account:"Create an account",footer_aria:"App version",
  menu_title:"Menu",menu_lead:"Sound, day and night, home-screen shortcut.",menu_section_caption:"Profile, listing and settings",
  menu_app:"App",menu_install_hint:"Add to your phone home screen",menu_download:"Download",
  menu_sound:"Sound",menu_sound_on:"On",menu_sound_off:"Off",menu_haptics:"Haptics",
  menu_haptics_on:"On",menu_haptics_off:"Off",menu_sound_test:"Test sound",menu_sound_test_hint:"Short signal",
  menu_theme:"Day and night",menu_theme_dark:"Dark now",menu_theme_light:"Light now",
  menu_language:"Language",menu_language_hint:"App interface",menu_save_language:"Save",
  menu_profile_card:"Profile",menu_profile_meta:"Account and listings",menu_steps_card:"Pedometer",
  menu_steps_meta:"10,000 steps a day",menu_add_card:"Add a listing",menu_add_meta:"City, category and text",
  chat_title:"Chats",chat_dialogs:"Conversations",chat_lead:"Direct messages and groups.",chat_all_read:"All read",
  chat_empty:"No conversations",chat_group:"Group",chat_new_group:"Create group",chat_members:"Members",
  chat_leave:"Leave",chat_photo:"Photo",chat_typing:"typing…",chat_online:"online",chat_reply:"Reply",
  chat_copy:"Copy",chat_forward:"Forward",chat_edit:"Edit",chat_delete:"Delete",
  steps_title:"Pedometer",steps_lead:"Daily goal — 10,000 steps.",steps_install:"Add to home screen",
  notifications_title:"Notifications",search_title:"Search",profile_title:"Profile",
  legal_rules:"Rules",legal_privacy:"Privacy",
  pwa_installed:"Already installed",
};

const PACKS = {
  fr:{nav_cities:"Villes",nav_search:"Recherche",nav_chats:"Chats",nav_menu:"Menu",common_profile:"Profil",common_rules:"Règles",common_privacy:"Confidentialité",common_login:"Connexion",common_register:"Inscription",menu_title:"Menu",menu_language:"Langue",menu_save_language:"Enregistrer",chat_title:"Chats",steps_title:"Podomètre",notifications_title:"Notifications",search_title:"Recherche",profile_title:"Profil"},
  es:{nav_cities:"Ciudades",nav_search:"Buscar",nav_chats:"Chats",nav_menu:"Menú",common_profile:"Perfil",common_rules:"Reglas",common_privacy:"Privacidad",common_login:"Entrar",common_register:"Registro",menu_title:"Menú",menu_language:"Idioma",menu_save_language:"Guardar",chat_title:"Chats",steps_title:"Podómetro",notifications_title:"Avisos",search_title:"Buscar",profile_title:"Perfil"},
  de:{nav_cities:"Städte",nav_search:"Suche",nav_chats:"Chats",nav_menu:"Menü",common_profile:"Profil",common_rules:"Regeln",common_privacy:"Datenschutz",common_login:"Anmelden",common_register:"Registrieren",menu_title:"Menü",menu_language:"Sprache",menu_save_language:"Speichern",chat_title:"Chats",steps_title:"Schrittzähler",notifications_title:"Mitteilungen",search_title:"Suche",profile_title:"Profil"},
  it:{nav_cities:"Città",nav_search:"Cerca",nav_chats:"Chat",nav_menu:"Menu",common_profile:"Profilo",common_rules:"Regole",common_privacy:"Privacy",common_login:"Accedi",common_register:"Registrati",menu_title:"Menu",menu_language:"Lingua",menu_save_language:"Salva",chat_title:"Chat",steps_title:"Pedometro",notifications_title:"Notifiche",search_title:"Cerca",profile_title:"Profilo"},
  pt:{nav_cities:"Cidades",nav_search:"Pesquisar",nav_chats:"Chats",nav_menu:"Menu",common_profile:"Perfil",common_rules:"Regras",common_privacy:"Privacidade",common_login:"Entrar",common_register:"Cadastrar",menu_title:"Menu",menu_language:"Idioma",menu_save_language:"Salvar",chat_title:"Chats",steps_title:"Pedómetro",notifications_title:"Notificações",search_title:"Pesquisar",profile_title:"Perfil"},
  pl:{nav_cities:"Miasta",nav_search:"Szukaj",nav_chats:"Czaty",nav_menu:"Menu",common_profile:"Profil",common_rules:"Zasady",common_privacy:"Prywatność",common_login:"Zaloguj",common_register:"Rejestracja",menu_title:"Menu",menu_language:"Język",menu_save_language:"Zapisz",chat_title:"Czaty",steps_title:"Krokometr",notifications_title:"Powiadomienia",search_title:"Szukaj",profile_title:"Profil"},
  uk:{nav_cities:"Міста",nav_search:"Пошук",nav_chats:"Чати",nav_menu:"Меню",common_profile:"Профіль",common_rules:"Правила",common_privacy:"Політика",common_login:"Увійти",common_register:"Реєстрація",menu_title:"Меню",menu_language:"Мова",menu_save_language:"Зберегти",chat_title:"Чати",steps_title:"Крокомір",notifications_title:"Сповіщення",search_title:"Пошук",profile_title:"Профіль"},
  tr:{nav_cities:"Şehirler",nav_search:"Ara",nav_chats:"Sohbetler",nav_menu:"Menü",common_profile:"Profil",common_rules:"Kurallar",common_privacy:"Gizlilik",common_login:"Giriş",common_register:"Kayıt",menu_title:"Menü",menu_language:"Dil",menu_save_language:"Kaydet",chat_title:"Sohbetler",steps_title:"Adımsayar",notifications_title:"Bildirimler",search_title:"Ara",profile_title:"Profil"},
  nl:{nav_cities:"Steden",nav_search:"Zoeken",nav_chats:"Chats",nav_menu:"Menu",common_profile:"Profiel",common_rules:"Regels",common_privacy:"Privacy",common_login:"Inloggen",common_register:"Registreren",menu_title:"Menu",menu_language:"Taal",menu_save_language:"Opslaan",chat_title:"Chats",steps_title:"Stappenteller",notifications_title:"Meldingen",search_title:"Zoeken",profile_title:"Profiel"},
  cs:{nav_cities:"Města",nav_search:"Hledat",nav_chats:"Chaty",nav_menu:"Menu",common_profile:"Profil",common_rules:"Pravidla",common_privacy:"Soukromí",common_login:"Přihlásit",common_register:"Registrace",menu_title:"Menu",menu_language:"Jazyk",menu_save_language:"Uložit",chat_title:"Chaty",steps_title:"Krokoměr",notifications_title:"Oznámení",search_title:"Hledat",profile_title:"Profil"},
  ro:{nav_cities:"Orașe",nav_search:"Căutare",nav_chats:"Chaturi",nav_menu:"Meniu",common_profile:"Profil",common_rules:"Reguli",common_privacy:"Confidențialitate",common_login:"Intră",common_register:"Înregistrare",menu_title:"Meniu",menu_language:"Limbă",menu_save_language:"Salvează",chat_title:"Chaturi",steps_title:"Pedometru",notifications_title:"Notificări",search_title:"Căutare",profile_title:"Profil"},
  hu:{nav_cities:"Városok",nav_search:"Keresés",nav_chats:"Chatek",nav_menu:"Menü",common_profile:"Profil",common_rules:"Szabályok",common_privacy:"Adatvédelem",common_login:"Belépés",common_register:"Regisztráció",menu_title:"Menü",menu_language:"Nyelv",menu_save_language:"Mentés",chat_title:"Chatek",steps_title:"Lépésszámláló",notifications_title:"Értesítések",search_title:"Keresés",profile_title:"Profil"},
  sv:{nav_cities:"Städer",nav_search:"Sök",nav_chats:"Chattar",nav_menu:"Meny",common_profile:"Profil",common_rules:"Regler",common_privacy:"Integritet",common_login:"Logga in",common_register:"Registrera",menu_title:"Meny",menu_language:"Språk",menu_save_language:"Spara",chat_title:"Chattar",steps_title:"Stegräknare",notifications_title:"Aviseringar",search_title:"Sök",profile_title:"Profil"},
  el:{nav_cities:"Πόλεις",nav_search:"Αναζήτηση",nav_chats:"Συνομιλίες",nav_menu:"Μενού",common_profile:"Προφίλ",common_rules:"Κανόνες",common_privacy:"Απόρρητο",common_login:"Είσοδος",common_register:"Εγγραφή",menu_title:"Μενού",menu_language:"Γλώσσα",menu_save_language:"Αποθήκευση",chat_title:"Συνομιλίες",steps_title:"Βηματόμετρο",notifications_title:"Ειδοποιήσεις",search_title:"Αναζήτηση",profile_title:"Προφίλ"},
  vi:{nav_cities:"Thành phố",nav_search:"Tìm",nav_chats:"Chat",nav_menu:"Menu",common_profile:"Hồ sơ",common_rules:"Quy tắc",common_privacy:"Quyền riêng tư",common_login:"Đăng nhập",common_register:"Đăng ký",menu_title:"Menu",menu_language:"Ngôn ngữ",menu_save_language:"Lưu",chat_title:"Chat",steps_title:"Đếm bước",notifications_title:"Thông báo",search_title:"Tìm",profile_title:"Hồ sơ"},
  id:{nav_cities:"Kota",nav_search:"Cari",nav_chats:"Obrolan",nav_menu:"Menu",common_profile:"Profil",common_rules:"Aturan",common_privacy:"Privasi",common_login:"Masuk",common_register:"Daftar",menu_title:"Menu",menu_language:"Bahasa",menu_save_language:"Simpan",chat_title:"Obrolan",steps_title:"Pedometer",notifications_title:"Notifikasi",search_title:"Cari",profile_title:"Profil"},
  ms:{nav_cities:"Bandar",nav_search:"Cari",nav_chats:"Sembang",nav_menu:"Menu",common_profile:"Profil",common_rules:"Peraturan",common_privacy:"Privasi",common_login:"Log masuk",common_register:"Daftar",menu_title:"Menu",menu_language:"Bahasa",menu_save_language:"Simpan",chat_title:"Sembang",steps_title:"Pedometer",notifications_title:"Pemberitahuan",search_title:"Cari",profile_title:"Profil"},
  zh:{nav_cities:"城市",nav_search:"搜索",nav_chats:"聊天",nav_menu:"菜单",common_profile:"资料",common_rules:"规则",common_privacy:"隐私",common_login:"登录",common_register:"注册",menu_title:"菜单",menu_language:"语言",menu_save_language:"保存",chat_title:"聊天",steps_title:"计步器",notifications_title:"通知",search_title:"搜索",profile_title:"资料"},
  "zh-TW":{nav_cities:"城市",nav_search:"搜尋",nav_chats:"聊天",nav_menu:"選單",common_profile:"資料",common_rules:"規則",common_privacy:"隱私",common_login:"登入",common_register:"註冊",menu_title:"選單",menu_language:"語言",menu_save_language:"儲存",chat_title:"聊天",steps_title:"計步器",notifications_title:"通知",search_title:"搜尋",profile_title:"資料"},
  ja:{nav_cities:"都市",nav_search:"検索",nav_chats:"チャット",nav_menu:"メニュー",common_profile:"プロフィール",common_rules:"ルール",common_privacy:"プライバシー",common_login:"ログイン",common_register:"登録",menu_title:"メニュー",menu_language:"言語",menu_save_language:"保存",chat_title:"チャット",steps_title:"歩数計",notifications_title:"通知",search_title:"検索",profile_title:"プロフィール"},
  ko:{nav_cities:"도시",nav_search:"검색",nav_chats:"채팅",nav_menu:"메뉴",common_profile:"프로필",common_rules:"규칙",common_privacy:"개인정보",common_login:"로그인",common_register:"가입",menu_title:"메뉴",menu_language:"언어",menu_save_language:"저장",chat_title:"채팅",steps_title:"만보기",notifications_title:"알림",search_title:"검색",profile_title:"프로필"},
  hi:{nav_cities:"शहर",nav_search:"खोज",nav_chats:"चैट",nav_menu:"मेनू",common_profile:"प्रोफ़ाइल",common_rules:"नियम",common_privacy:"गोपनीयता",common_login:"लॉग इन",common_register:"पंजीकरण",menu_title:"मेनू",menu_language:"भाषा",menu_save_language:"सेव",chat_title:"चैट",steps_title:"पेडोमीटर",notifications_title:"सूचनाएँ",search_title:"खोज",profile_title:"प्रोफ़ाइल"},
  ar:{nav_cities:"المدن",nav_search:"بحث",nav_chats:"الدردشات",nav_menu:"القائمة",common_profile:"الملف",common_rules:"القواعد",common_privacy:"الخصوصية",common_login:"دخول",common_register:"تسجيل",menu_title:"القائمة",menu_language:"اللغة",menu_save_language:"حفظ",chat_title:"الدردشات",steps_title:"عداد الخطوات",notifications_title:"الإشعارات",search_title:"بحث",profile_title:"الملف"},
  fa:{nav_cities:"شهرها",nav_search:"جستجو",nav_chats:"گفتگوها",nav_menu:"منو",common_profile:"پروفایل",common_rules:"قوانین",common_privacy:"حریم خصوصی",common_login:"ورود",common_register:"ثبت‌نام",menu_title:"منو",menu_language:"زبان",menu_save_language:"ذخیره",chat_title:"گفتگوها",steps_title:"گام‌شمار",notifications_title:"اعلان‌ها",search_title:"جستجو",profile_title:"پروفایل"},
  ur:{nav_cities:"شہر",nav_search:"تلاش",nav_chats:"چیٹس",nav_menu:"مینو",common_profile:"پروفائل",common_rules:"قواعد",common_privacy:"رازداری",common_login:"لاگ ان",common_register:"رجسٹریشن",menu_title:"مینو",menu_language:"زبان",menu_save_language:"محفوظ",chat_title:"چیٹس",steps_title:"پیڈومیٹر",notifications_title:"اطلاعات",search_title:"تلاش",profile_title:"پروفائل"},
  he:{nav_cities:"ערים",nav_search:"חיפוש",nav_chats:"צ׳אטים",nav_menu:"תפריט",common_profile:"פרופיל",common_rules:"כללים",common_privacy:"פרטיות",common_login:"כניסה",common_register:"הרשמה",menu_title:"תפריט",menu_language:"שפה",menu_save_language:"שמירה",chat_title:"צ׳אטים",steps_title:"מד צעדים",notifications_title:"התראות",search_title:"חיפוש",profile_title:"פרופיל"},
  th:{nav_cities:"เมือง",nav_search:"ค้นหา",nav_chats:"แชท",nav_menu:"เมนู",common_profile:"โปรไฟล์",common_rules:"กฎ",common_privacy:"ความเป็นส่วนตัว",common_login:"เข้าสู่ระบบ",common_register:"สมัคร",menu_title:"เมนู",menu_language:"ภาษา",menu_save_language:"บันทึก",chat_title:"แชท",steps_title:"เครื่องนับก้าว",notifications_title:"การแจ้งเตือน",search_title:"ค้นหา",profile_title:"โปรไฟล์"},
  bn:{nav_cities:"শহর",nav_search:"অনুসন্ধান",nav_chats:"চ্যাট",nav_menu:"মেনু",common_profile:"প্রোফাইল",common_rules:"নিয়ম",common_privacy:"গোপনীয়তা",common_login:"লগইন",common_register:"নিবন্ধন",menu_title:"মেনু",menu_language:"ভাষা",menu_save_language:"সেভ",chat_title:"চ্যাট",steps_title:"পেডোমিটার",notifications_title:"বিজ্ঞপ্তি",search_title:"অনুসন্ধান",profile_title:"প্রোফাইল"},
  pa:{nav_cities:"Cities",nav_search:"Search",nav_chats:"Chats",nav_menu:"Menu",common_profile:"Profile",common_rules:"Rules",common_privacy:"Privacy",common_login:"Log in",common_register:"Sign up",menu_title:"Menu",menu_language:"Language",menu_save_language:"Save",chat_title:"Chats",steps_title:"Pedometer",notifications_title:"Notifications",search_title:"Search",profile_title:"Profile"},
  sw:{nav_cities:"Miji",nav_search:"Tafuta",nav_chats:"Soga",nav_menu:"Menyu",common_profile:"Wasifu",common_rules:"Kanuni",common_privacy:"Faragha",common_login:"Ingia",common_register:"Jisajili",menu_title:"Menyu",menu_language:"Lugha",menu_save_language:"Hifadhi",chat_title:"Soga",steps_title:"Kipima hatua",notifications_title:"Arifa",search_title:"Tafuta",profile_title:"Wasifu"},
};

const NAMES = {ru:"Русский",en:"English",fr:"Français",es:"Español",zh:"中文","zh-TW":"中文（繁體）",hi:"हिन्दी",ar:"العربية",pt:"Português",de:"Deutsch",ja:"日本語",ko:"한국어",it:"Italiano",tr:"Türkçe",pl:"Polski",uk:"Українська",nl:"Nederlands",vi:"Tiếng Việt",id:"Bahasa Indonesia",ms:"Bahasa Melayu",th:"ไทย",fa:"فارسی",ur:"اردو",bn:"বাংলা",pa:"ਪੰਜਾਬੀ",sw:"Kiswahili",el:"Ελληνικά",cs:"Čeština",ro:"Română",hu:"Magyar",sv:"Svenska",he:"עברית"};

function build(locale) {
  const out = { ...RU };
  if (locale !== "ru") Object.assign(out, EN);
  if (PACKS[locale]) Object.assign(out, PACKS[locale]);
  for (const [code, name] of Object.entries(NAMES)) {
    out[`lang_${code.replace("-", "_")}`] = name;
  }
  return out;
}

await mkdir("messages", { recursive: true });
for (const locale of LOCALES) {
  await writeFile(`messages/${locale}.json`, JSON.stringify(build(locale), null, 2) + "\n");
}
console.log(`wrote ${LOCALES.length} locales, ${Object.keys(RU).length} keys`);
