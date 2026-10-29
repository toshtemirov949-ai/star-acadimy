import { SupportedLanguage } from '../context/LanguageContext';

export interface AdminTranslations {
  // Login Modal
  login: {
    title: string;
    subtitle: string;
    credsBoxTitle: string;
    credsBoxText: string;
    autoFill: string;
    wrongCredsError: string;
    loginLabel: string;
    loginPlaceholder: string;
    passwordLabel: string;
    passwordPlaceholder: string;
    submitBtn: string;
    verifying: string;
    studentCabinetLink: string;
  };

  // Header & Top Bar
  header: {
    title: string;
    subtitle: string;
    badge: string;
    activeSectionLabel: string;
    closeTooltip: string;
    switchLanguage: string;
  };

  // Sidebar
  sidebar: {
    searchPlaceholder: string;
    group1: string;
    group2: string;
    group3: string;
    itemsCountUnit: string;
    adminRole: string;
    logout: string;
  };

  // Tab Menu Items
  tabs: {
    dashboard: { title: string; desc: string; badge: string };
    editor: { title: string; desc: string; badgeSuffix: string };
    create_course: { title: string; desc: string; badge: string };
    textbooks_manager: { title: string; desc: string; badgeSuffix: string };
    instructors_manager: { title: string; desc: string; badgeSuffix: string };
    lessons_manager: { title: string; desc: string; badge: string };
    users: { title: string; desc: string; badgeSuffix: string };
    settings_general: { title: string; desc: string; badge: string };
    settings_ai: { title: string; desc: string; badge: string };
    settings_security: { title: string; desc: string; badge: string };
    settings_billing: { title: string; desc: string; badge: string };
    settings_certificates: { title: string; desc: string; badge: string };
    logs: { title: string; desc: string };
    settings_server: { title: string; desc: string; badge: string };
    backup_export: { title: string; desc: string; badge: string };
  };

  // Dashboard Tab
  dashboard: {
    statStudents: string;
    statStudentsActive: string;
    statNoStudents: string;
    statCourses: string;
    statCoursesDesc: string;
    statCertificates: string;
    statCertificatesDesc: string;
    statNoCertificates: string;
    statAI: string;
    statAIDesc: string;
    manageResources: string;
    coursesCountLabel: string;
    textbooksCountLabel: string;
    instructorsCountLabel: string;
    addCourse: string;
    addTextbook: string;
    addInstructor: string;
    diagnosticsTitle: string;
    diagnosticsSub: string;
    systemUptime: string;
    serverRespTime: string;
    optimalResp: string;
    activeSessions: string;
    studentsOnline: string;
    recentLogsTitle: string;
    viewAllLogs: string;
    noRecentLogs: string;
    logTime: string;
    logEvent: string;
    logStatus: string;
  };

  // Course Editor Tab
  editor: {
    title: string;
    subtitle: string;
    addCourseBtn: string;
    searchPlaceholder: string;
    lessonsSuffix: string;
    deleteCourseTitle: string;
    formTitle: string;
    courseIdLabel: string;
    fieldTitle: string;
    fieldCategory: string;
    fieldDesc: string;
    fieldLevel: string;
    fieldLessons: string;
    fieldHours: string;
    fieldInstructor: string;
    btnCancel: string;
    btnSave: string;
    btnDeleteCourse: string;
  };

  // Create Course Tab
  createCourse: {
    title: string;
    subtitle: string;
    notice: string;
    fieldTitle: string;
    titlePlaceholder: string;
    fieldCategory: string;
    fieldDesc: string;
    descPlaceholder: string;
    fieldInstructor: string;
    fieldLevel: string;
    fieldLessons: string;
    fieldHours: string;
    btnReset: string;
    btnCreate: string;
  };

  // Textbooks Manager Tab
  textbooks: {
    title: string;
    subtitle: string;
    addBtn: string;
    searchPlaceholder: string;
    filterAll: string;
    filterLangs: string;
    filterIT: string;
    filterExact: string;
    filterNatural: string;
    filterHumanities: string;
    bookPages: string;
    bookFormat: string;
    bookAuthor: string;
    btnDownload: string;
    btnDelete: string;
    noBooksFound: string;
  };

  // Instructors Manager Tab
  instructors: {
    title: string;
    subtitle: string;
    addBtn: string;
    searchPlaceholder: string;
    cardExp: string;
    cardOrg: string;
    cardEmail: string;
    btnDelete: string;
    noInstructors: string;
  };

  // Lessons & Modules Tab
  lessons: {
    title: string;
    subtitle: string;
    selectCourseLabel: string;
    addModuleBtn: string;
    addLessonBtn: string;
    modulesCount: string;
    noModules: string;
    btnDeleteModule: string;
    btnDeleteLesson: string;
    typeVideo: string;
    typeTest: string;
    typeReading: string;
  };

  // Users Tab
  users: {
    title: string;
    subtitle: string;
    addUserBtn: string;
    exportBtn: string;
    statTotal: string;
    statActive: string;
    statMentors: string;
    statAvgScore: string;
    searchPlaceholder: string;
    roleAll: string;
    roleStudents: string;
    roleMentors: string;
    roleAdmins: string;
    colName: string;
    colEmail: string;
    colRole: string;
    colStatus: string;
    colActions: string;
    statusActive: string;
    statusBlocked: string;
    btnBlock: string;
    btnUnblock: string;
    btnDelete: string;
    noUsers: string;
  };

  // Settings Tabs
  settings: {
    generalTitle: string;
    generalSub: string;
    platformName: string;
    systemStatus: string;
    statusOnline: string;
    statusMaintenance: string;
    registrationsAllowed: string;
    regOpen: string;
    regClosed: string;
    btnResetDefaults: string;
    btnSave: string;

    aiTitle: string;
    aiSub: string;
    aiTranslatorActive: string;
    aiTranslatorDesc: string;
    aiGrammarAnalysis: string;
    aiGrammarDesc: string;
    ttsSpeed: string;
    btnTestVoice: string;

    securityTitle: string;
    securitySub: string;
    adminLogin: string;
    adminPassword: string;
    sessionTimeout: string;

    billingTitle: string;
    billingSub: string;
    paymentGateways: string;
    testGateway: string;
    currency: string;
    monthlySub: string;

    certTitle: string;
    certSub: string;
    passingScore: string;
    distinctionScore: string;
    autoIssue: string;
    signerTitle: string;

    serverTitle: string;
    serverSub: string;
    serverLatency: string;
    serverMemory: string;
    fastResp: string;
    spareCapacity: string;
    quickOperations: string;
    btnClearCache: string;
    btnRunDiagnostics: string;
    btnTestPing: string;

    backupTitle: string;
    backupSub: string;
    backupCard1Title: string;
    backupCard1Desc: string;
    btnDownloadJson: string;
    btnRestoreJson: string;
    backupCard2Title: string;
    backupCard2Desc: string;
    btnResetAll: string;
    backupAdvice: string;
    backupAdviceDesc: string;
  };

  // Logs Tab
  logs: {
    searchPlaceholder: string;
    allLogs: string;
    btnTestLog: string;
    btnExport: string;
    btnClear: string;
    colTime: string;
    colType: string;
    colEvent: string;
    colDetails: string;
    colUser: string;
    colStatus: string;
    noLogsFound: string;
  };

  // Universal Modals & Confirm Dialog
  modals: {
    cancel: string;
    add: string;
    create: string;
    save: string;
    delete: string;
    irreversible: string;
    deleteConfirmQuestion: string;
    deleteConfirmPrefix: string;
    deleteConfirmSuffix: string;
    btnConfirmDelete: string;

    addCourseTitle: string;
    addCourseSub: string;
    courseTitleLabel: string;
    courseCategoryLabel: string;
    courseLevelLabel: string;
    courseInstructorLabel: string;
    courseLessonsCountLabel: string;
    courseDurationHoursLabel: string;
    courseDescLabel: string;
    btnSaveCourse: string;

    addTextbookTitle: string;
    addTextbookSub: string;
    textbookTitleLabel: string;
    textbookSubjectLabel: string;
    textbookCategoryLabel: string;
    textbookAuthorLabel: string;
    textbookPagesLabel: string;
    textbookLevelLabel: string;
    textbookFormatLabel: string;
    textbookSizeLabel: string;
    textbookCoverLabel: string;
    textbookDescLabel: string;
    btnSaveTextbook: string;

    addInstructorTitle: string;
    addInstructorSub: string;
    instructorNameLabel: string;
    instructorSpecLabel: string;
    instructorRoleLabel: string;
    instructorOrgLabel: string;
    instructorExpLabel: string;
    instructorRatingLabel: string;
    instructorEmailLabel: string;
    instructorAvatarLabel: string;
    instructorBioLabel: string;
    btnSaveInstructor: string;

    addLessonTitle: string;
    addLessonSub: string;
    lessonModuleSelectLabel: string;
    lessonTitleLabel: string;
    lessonDurationLabel: string;
    lessonTypeLabel: string;
    lessonSnippetLabel: string;
    btnSaveLesson: string;

    addModuleTitle: string;
    addModuleSub: string;
    moduleTitleLabel: string;
    btnSaveModule: string;

    addUserTitle: string;
    addUserSub: string;
    userNameLabel: string;
    userEmailLabel: string;
    userRoleLabel: string;
    btnSaveUser: string;
  };
}

export const ADMIN_TRANSLATIONS: Record<SupportedLanguage, AdminTranslations> = {
  uz: {
    login: {
      title: 'Kabinetga Kirish',
      subtitle: 'Admin boshqaruv tizimi va boshqaruv paneliga xavfsiz kirish',
      credsBoxTitle: 'Admin Kabineti Maʼlumotlari:',
      credsBoxText: 'Login: 1 · Parol: 1',
      autoFill: 'Avto toʻldirish',
      wrongCredsError: 'Login yoki parol notoʻgʻri! (Admin uchun: Login: 1, Parol: 1)',
      loginLabel: 'Login',
      loginPlaceholder: 'Loginni kiriting (masalan: 1)',
      passwordLabel: 'Parol',
      passwordPlaceholder: 'Parolni kiriting (masalan: 1)',
      submitBtn: 'Kabinetga Kirish',
      verifying: 'Tekshirilmoqda...',
      studentCabinetLink: 'Talaba sifatida kirish'
    },
    header: {
      title: 'Admin Kabineti',
      subtitle: 'Boshqaruv paneli, tizim parametrlari va sozlamalar ketma-ketligi',
      badge: 'ROOT ADMIN (LOGIN: 1)',
      activeSectionLabel: 'Faol Boʻlim',
      closeTooltip: 'Yopish',
      switchLanguage: 'Tilni oʻzgartirish'
    },
    sidebar: {
      searchPlaceholder: 'Parametr yoki boʻlim izlash...',
      group1: '1. Kurslar, Darsliklar & Ustozlar',
      group2: '2. Sozlamalar & Parametrlar',
      group3: '3. Tizim Nazorati & Audit',
      itemsCountUnit: 'band',
      adminRole: 'Bosh Administrator',
      logout: 'Tizimdan chiqish'
    },
    tabs: {
      dashboard: { title: 'Asosiy Panel', desc: 'Statistika & monitoring', badge: 'Online' },
      editor: { title: 'Kurslar Boshqaruvi', desc: 'Kurslar qoʻshish & oʻchirish', badgeSuffix: 'ta' },
      create_course: { title: 'Yangi Kurs Qoʻshish', desc: 'Yangi taʼlim dasturi kiritish', badge: '+ Kurs' },
      textbooks_manager: { title: 'Darsliklar & Kitoblar', desc: 'Darsliklar qoʻshish & oʻchirish', badgeSuffix: 'ta' },
      instructors_manager: { title: 'Ustozlar Boshqaruvi', desc: 'Ustozlar qoʻshish & oʻchirish', badgeSuffix: 'ta' },
      lessons_manager: { title: 'Darslar & Modullar', desc: 'Kurs darsliklarini boshqarish', badge: 'Darslar' },
      users: { title: 'Foydalanuvchilar', desc: 'Talabalar va mentorlar', badgeSuffix: 'ta' },
      settings_general: { title: 'Platforma Sozlamalari', desc: 'Nomi, rejim va aʼzolik', badge: 'Asosiy' },
      settings_ai: { title: 'AI & Tarjimon Sozlamasi', desc: '10-tilli tarjima & neyron ovoz', badge: 'AI Faol' },
      settings_security: { title: 'Xavfsizlik & Parol', desc: 'Login, parol (1) va sessiya', badge: 'Himoya' },
      settings_billing: { title: 'Toʻlov & Billing', desc: 'Payme, Click, Uzum parametrlari', badge: 'UZS' },
      settings_certificates: { title: 'Sertifikat & Baholash', desc: 'Oʻtish ballari va mezonlar', badge: '70%+' },
      logs: { title: 'Tizim Loglari & Audit', desc: 'Barcha voqealar va kirishlar' },
      settings_server: { title: 'Server & Diagnostika', desc: 'Kesh, xotira va API holati', badge: 'Normal' },
      backup_export: { title: 'Zaxira Nusxa & Eksport', desc: 'Baza zaxirasi va JSON yuklash', badge: 'Backup' }
    },
    dashboard: {
      statStudents: 'Jami Talabalar',
      statStudentsActive: 'nafar faol oʻquvchi',
      statNoStudents: 'Hozircha oʻquvchi yoʻq (0)',
      statCourses: 'Barcha Kurslar',
      statCoursesDesc: 'Barcha fanlar toʻliq',
      statCertificates: 'Berilgan Sertifikatlar',
      statCertificatesDesc: 'QR-kodli milliy',
      statNoCertificates: 'Hozircha berilmagan (0)',
      statAI: 'AI Tarjima & Lab',
      statAIDesc: '2,650+ soʻz bazasi',
      manageResources: 'Taʼlim Resurslarini Boshqarish',
      coursesCountLabel: 'ta kurs',
      textbooksCountLabel: 'ta darslik',
      instructorsCountLabel: 'nafar ustoz',
      addCourse: '+ Kurs Qoʻshish',
      addTextbook: '+ Darslik Qoʻshish',
      addInstructor: '+ Ustoz Qoʻshish',
      diagnosticsTitle: 'Platforma Diagnostikasi & Ishlash Koʻrsatkichi',
      diagnosticsSub: 'Real-vaqt server va maʼlumotlar oqimi',
      systemUptime: '99.98% Uptime',
      serverRespTime: 'Server Javob Vaqti',
      optimalResp: 'Optimal koʻrsatkich',
      activeSessions: 'Faol Sessiyalar',
      studentsOnline: 'talaba onlayn',
      recentLogsTitle: 'Soʻnggi Tizim Loglari',
      viewAllLogs: 'Barchasini koʻrish',
      noRecentLogs: 'Hozircha loglar mavjud emas',
      logTime: 'Vaqt',
      logEvent: 'Voqea',
      logStatus: 'Holat'
    },
    editor: {
      title: 'Kurslar va Kontentni Tahrirlash',
      subtitle: 'Istalgan kursni tanlang va maʼlumotlarini oʻzgartiring. Oʻzgarishlar darhol saytda aks etadi.',
      addCourseBtn: 'Yangi Kurs Qoʻshish',
      searchPlaceholder: 'Kurslarni qidirish...',
      lessonsSuffix: 'dars',
      deleteCourseTitle: 'Kursni oʻchirish',
      formTitle: 'Kurs Maʼlumotlarini Tahrirlash',
      courseIdLabel: 'Kurs ID',
      fieldTitle: 'Kurs Nomi',
      fieldCategory: 'Kategoriya',
      fieldDesc: 'Qisqacha Tavsif',
      fieldLevel: 'Daraja',
      fieldLessons: 'Darslar Soni',
      fieldHours: 'Davomiyligi (soat)',
      fieldInstructor: 'Instruktor',
      btnCancel: 'Bekor qilish',
      btnSave: 'Oʻzgarishlarni Saqlash',
      btnDeleteCourse: 'Ushbu kursni butunlay oʻchirish'
    },
    createCourse: {
      title: 'Yangi Kurs Yaratish',
      subtitle: 'Platformaga yangi oʻquv kursi va dastur kiritish',
      notice: 'Kiritilgan kurs darhol foydalanuvchilar katalogida paydo boʻladi.',
      fieldTitle: 'Kurs Nomi',
      titlePlaceholder: 'Masalan: Sunʼiy Intellekt va Python dasturlash',
      fieldCategory: 'Kategoriya / Yoʻnalish',
      fieldDesc: 'Qisqacha Tavsif',
      descPlaceholder: 'Kurs maqsadi va oʻrganiladigan asosiy koʻnikmalar...',
      fieldInstructor: 'Instruktor / Ekspert',
      fieldLevel: 'Qiyinlik Darajasi',
      fieldLessons: 'Darslar Soni',
      fieldHours: 'Davomiyligi (soat)',
      btnReset: 'Formani tozalash',
      btnCreate: 'Kursni Yaratish va Eʼlon Qilish'
    },
    textbooks: {
      title: 'Darsliklar va Oʻquv Qoʻllanmalar',
      subtitle: 'Platformadagi elektron darsliklar va PDF qoʻllanmalar bazasi',
      addBtn: '+ Yangi Darslik',
      searchPlaceholder: 'Darslik nomi yoki muallif boʻyicha qidiruv...',
      filterAll: 'Barcha fanlar',
      filterLangs: 'Xorijiy tillar',
      filterIT: 'IT & Dasturlash',
      filterExact: 'Aniq fanlar',
      filterNatural: 'Tabiiy fanlar',
      filterHumanities: 'Ijtimoiy fanlar',
      bookPages: 'bet',
      bookFormat: 'Format',
      bookAuthor: 'Muallif',
      btnDownload: 'Yuklab olish',
      btnDelete: 'Oʻchirish',
      noBooksFound: 'Mos keluvchi darslik topilmadi'
    },
    instructors: {
      title: 'Ustozlar va Mentorlar Boshqaruvi',
      subtitle: 'Platforma oʻqituvchilari, mutaxassislari va ekspertlar roʻyxati',
      addBtn: '+ Yangi Ustoz Qoʻshish',
      searchPlaceholder: 'Ustoz ismi yoki ixtisosligi...',
      cardExp: 'Tajriba',
      cardOrg: 'Tashkilot',
      cardEmail: 'Email',
      btnDelete: 'Roʻyxatdan oʻchirish',
      noInstructors: 'Mos keluvchi ustoz topilmadi'
    },
    lessons: {
      title: 'Darslar va Modullar Strukturasi',
      subtitle: 'Har bir kurs boʻyicha modullar va amaliy darslarni shakllantirish',
      selectCourseLabel: 'Kursni Tanlang',
      addModuleBtn: '+ Modul Qoʻshish',
      addLessonBtn: '+ Dars Qoʻshish',
      modulesCount: 'ta modul mavjud',
      noModules: 'Ushbu kursda hali modullar yoʻq. Birinchi modulni qoʻshing.',
      btnDeleteModule: 'Modulni oʻchirish',
      btnDeleteLesson: 'Darsni oʻchirish',
      typeVideo: 'Video dars',
      typeTest: 'Test savollari',
      typeReading: 'Nazariy oʻqish'
    },
    users: {
      title: 'Foydalanuvchilar va Talabalar Roʻyxati',
      subtitle: 'Roʻyxatdan oʻtgan talabalar, oʻqituvchilar va ularning taʼlim faolligi',
      addUserBtn: '+ Yangi Foydalanuvchi',
      exportBtn: 'Eksport',
      statTotal: 'Jami Foydalanuvchilar',
      statActive: 'Faol Talabalar',
      statMentors: 'Mentorlar & Oʻqituvchilar',
      statAvgScore: 'Oʻrtacha Oʻzlashtirish',
      searchPlaceholder: 'Talaba ismi yoki email...',
      roleAll: 'Barchasi',
      roleStudents: 'Talabalar',
      roleMentors: 'Mentorlar',
      roleAdmins: 'Adminlar',
      colName: 'Foydalanuvchi',
      colEmail: 'Email',
      colRole: 'Roli',
      colStatus: 'Holati',
      colActions: 'Amallar',
      statusActive: 'Faol',
      statusBlocked: 'Bloklangan',
      btnBlock: 'Bloklash',
      btnUnblock: 'Blokdan ochish',
      btnDelete: 'Oʻchirish',
      noUsers: 'Foydalanuvchilar topilmadi'
    },
    settings: {
      generalTitle: 'Platforma Umumiy Sozlamalari',
      generalSub: 'Sayt nomi, texnik rejim va foydalanuvchilar qabuli parametrlari',
      platformName: 'Platforma Nomi',
      systemStatus: 'Tizim Holati',
      statusOnline: 'Faol Onlayn (Hamma uchun ochiq)',
      statusMaintenance: 'Texnik Taʼmirlash Rejimi',
      registrationsAllowed: 'Yangi Talabalar Roʻyxatdan Oʻtishi',
      regOpen: 'Ruxsat berilgan (Ochiq)',
      regClosed: 'Cheklangan (Yopiq)',
      btnResetDefaults: 'Standart holat',
      btnSave: 'Parametrlarni Saqlash',

      aiTitle: 'AI Techie & 10-Tilli Neyron Tarjimon Parametrlari',
      aiSub: 'Ovozli talaffuz tezligi, lugʻat bazasi va avtomatik grammatika tahlili',
      aiTranslatorActive: 'Real-Vaqt Neyron Tarjimoni',
      aiTranslatorDesc: '10 ta asosiy til (Oʻzbek, Ingliz, Rus, Nemis, Fransuz, Arab, Xitoy, Yapon, Koreys, Turk) oʻrtasida aniq tarjima qilish',
      aiGrammarAnalysis: 'Avtomatik Grammatika va Misollar Tahlili',
      aiGrammarDesc: 'Har bir kiritilgan jumla uchun zamon, soʻz turkumlari va sinonimlar tavsiyasini koʻrsatish',
      ttsSpeed: 'Neyron Ovoz Talaffuzi Tezligi (Speech TTS Speed)',
      btnTestVoice: 'Neyron Ovozni Sinab Koʻrish',

      securityTitle: 'Admin Kirish Xavfsizligi va Paroli',
      securitySub: 'Admin kabineti login va paroli (Birlamchi tizimda: Login: 1, Parol: 1)',
      adminLogin: 'Admin Login (Login: 1)',
      adminPassword: 'Admin Parol (Parol: 1)',
      sessionTimeout: 'Admin Sessiyasi Davomiyligi (Daqiqalarda)',

      billingTitle: 'Toʻlov Tizimlari va Tarif Parametrlari',
      billingSub: 'Oʻzbekistondagi milliy toʻlov shlyuzlari (Click, Payme, Uzum) va obuna',
      paymentGateways: 'Milliy Toʻlov Shlyuzlari',
      testGateway: 'Sinash',
      currency: 'Valyuta',
      monthlySub: 'Oylik Premium Obuna Narxi',

      certTitle: 'Sertifikat & Baholash Mezonlari',
      certSub: 'QR-kodli elektron sertifikat berish mezonlari va imzo parametrlari',
      passingScore: 'Oʻtish Minimal Bali (%)',
      distinctionScore: 'Imtiyozli (Aʼlo) Sertifikat Bali (%)',
      autoIssue: 'Test yakunlangach avtomatik sertifikat berish',
      signerTitle: 'Sertifikat Imzolovchisi Lavozimi',

      serverTitle: 'Server Diagnostikasi va Kesh Nazorati',
      serverSub: 'Infratuzilma tezligi, xotira sarfi va operativ kesh holati',
      serverLatency: 'Server Javob Berish Vaqti',
      serverMemory: 'Operativ Xotira (RAM)',
      fastResp: 'Juda tezkor javob (Aʼlo daraja)',
      spareCapacity: 'Zaxira quvvat 75% ochiq',
      quickOperations: 'Tezkor Operatsiyalar',
      btnClearCache: 'Keshni Tozalash',
      btnRunDiagnostics: 'Diagnostika Testini Oʻtkazish',
      btnTestPing: 'Tarmoq Pingini Sinash',

      backupTitle: 'Tizim Zaxira Nusxasi (Backup) va Eksport',
      backupSub: 'Barcha kurslar, sozlamalar, loglar va talabalar maʼlumotlarini zaxiraga olish',
      backupCard1Title: 'Toʻliq Platforma Arxivini Yuklab Olish',
      backupCard1Desc: 'Barcha kurslar, darsliklar, ustozlar, foydalanuvchilar va sozlamalar bitta JSON faylda',
      btnDownloadJson: 'Toʻliq Zaxira Faylini Yuklab Olish (.json)',
      btnRestoreJson: 'Zaxira Faylidan Tiklash (.json)',
      backupCard2Title: 'Boshlangʻich Standart Holatga Qaytarish',
      backupCard2Desc: 'Barcha kiritilgan oʻzgarishlarni bekor qilib, tizimni ilk zavod holatiga qaytarish',
      btnResetAll: 'Tizimni Boshlangʻich Holatga Qaytarish (Reset Defaults)',
      backupAdvice: 'Xavfsiz saqlash tavsiyasi:',
      backupAdviceDesc: 'Yuklab olingan zaxira fayllarini har haftada kamida bir marta yangilab turish tavsiya etiladi.'
    },
    logs: {
      searchPlaceholder: 'Loglar ichidan qidirish...',
      allLogs: 'Barcha loglar',
      btnTestLog: '+ Test Log',
      btnExport: 'Eksport',
      btnClear: 'Tozalash',
      colTime: 'Vaqt',
      colType: 'Turi',
      colEvent: 'Voqea / Sarlavha',
      colDetails: 'Tafsilot',
      colUser: 'Foydalanuvchi',
      colStatus: 'Holat',
      noLogsFound: 'Hech qanday log topilmadi'
    },
    modals: {
      cancel: 'Bekor qilish',
      add: 'Qoʻshish',
      create: 'Yaratish',
      save: 'Saqlash',
      delete: 'Oʻchirish',
      irreversible: 'Qaytarilmas amal',
      deleteConfirmQuestion: 'Haqiqatan ham ushbu elementni oʻchirib tashlamoqchimisiz?',
      deleteConfirmPrefix: 'Haqiqatan ham',
      deleteConfirmSuffix: 'ini butunlay oʻchirib tashlamoqchimisiz?',
      btnConfirmDelete: 'Ha, Butunlay Oʻchirilsin',

      addCourseTitle: 'Yangi Kurs Qoʻshish',
      addCourseSub: 'Platformaga yangi oʻquv kursi va dastur kiritish',
      courseTitleLabel: 'Kurs Nomi',
      courseCategoryLabel: 'Kategoriya / Yoʻnalish',
      courseLevelLabel: 'Qiyinlik Darajasi',
      courseInstructorLabel: 'Oʻqituvchi / Instruktor',
      courseLessonsCountLabel: 'Darslar Soni',
      courseDurationHoursLabel: 'Davomiyligi (soat)',
      courseDescLabel: 'Kurs Haqida Tavsif',
      btnSaveCourse: 'Kursni Saqlash & Qoʻshish',

      addTextbookTitle: 'Yangi Darslik Qoʻshish',
      addTextbookSub: 'Xorijiy tillar yoki IT boʻyicha oʻquv kitobi kiritish',
      textbookTitleLabel: 'Darslik Nomi',
      textbookSubjectLabel: 'Fan / Til',
      textbookCategoryLabel: 'Kategoriya',
      textbookAuthorLabel: 'Muallif / Nashriyot',
      textbookPagesLabel: 'Sahifalar Soni',
      textbookLevelLabel: 'Daraja',
      textbookFormatLabel: 'Format',
      textbookSizeLabel: 'Fayl Hajmi',
      textbookCoverLabel: 'Muqova Rasm Havolasi (URL)',
      textbookDescLabel: 'Qisqacha Tavsif',
      btnSaveTextbook: 'Darslikni Saqlash',

      addInstructorTitle: 'Yangi Ustoz / Instruktor Qoʻshish',
      addInstructorSub: 'Platforma oʻqituvchilari safiga yangi mutaxassis roʻyxatlash',
      instructorNameLabel: 'Ustozning Ism-Sharifi (F.I.Sh.)',
      instructorSpecLabel: 'Mutaxassislik Sohasi',
      instructorRoleLabel: 'Lavozimi & Sertifikati',
      instructorOrgLabel: 'Tashkilot / Markaz',
      instructorExpLabel: 'Tajriba',
      instructorRatingLabel: 'Reyting (max 5.0)',
      instructorEmailLabel: 'Email Manzili',
      instructorAvatarLabel: 'Avatar Rasm Havolasi (URL)',
      instructorBioLabel: 'Qisqacha Biografiya (Bio)',
      btnSaveInstructor: 'Ustozni Roʻyxatga Qoʻshish',

      addLessonTitle: 'Yangi Darslik Qoʻshish',
      addLessonSub: 'Kurs moduliga yangi dars mavzusi va kontentini kiritish',
      lessonModuleSelectLabel: 'Qaysi modulga qoʻshilsin:',
      lessonTitleLabel: 'Darslik Nomi',
      lessonDurationLabel: 'Davomiyligi',
      lessonTypeLabel: 'Darslik Turi',
      lessonSnippetLabel: 'Qisqacha Izoh / Tavsif',
      btnSaveLesson: 'Darslikni Qoʻshish',

      addModuleTitle: 'Yangi Modul Yaratish',
      addModuleSub: 'Kurs oʻquv rejasiga yangi bob qoʻshish',
      moduleTitleLabel: 'Modul Nomi',
      btnSaveModule: 'Modulni Yaratish',

      addUserTitle: 'Yangi Foydalanuvchi Qoʻshish',
      addUserSub: 'Talaba, mentor yoki admin roʻyxatlash',
      userNameLabel: 'Ism-Sharifi (F.I.Sh.)',
      userEmailLabel: 'Email Manzili',
      userRoleLabel: 'Foydalanuvchi Roli',
      btnSaveUser: 'Qoʻshish'
    }
  },

  ru: {
    login: {
      title: 'Вход в панель администратора',
      subtitle: 'Безопасный доступ к системе управления и панели администратора',
      credsBoxTitle: 'Данные для входа в панель:',
      credsBoxText: 'Логин: 1 · Пароль: 1',
      autoFill: 'Автозаполнение',
      wrongCredsError: 'Неверный логин или пароль! (Для админа: Логин: 1, Пароль: 1)',
      loginLabel: 'Логин',
      loginPlaceholder: 'Введите логин (например: 1)',
      passwordLabel: 'Пароль',
      passwordPlaceholder: 'Введите пароль (например: 1)',
      submitBtn: 'Войти в кабинет',
      verifying: 'Проверка данных...',
      studentCabinetLink: 'Войти как студент'
    },
    header: {
      title: 'Панель Администратора',
      subtitle: 'Панель управления, системные параметры и настройки платформы',
      badge: 'ROOT ADMIN (LOGIN: 1)',
      activeSectionLabel: 'Активный Раздел',
      closeTooltip: 'Закрыть',
      switchLanguage: 'Сменить язык'
    },
    sidebar: {
      searchPlaceholder: 'Поиск параметров или разделов...',
      group1: '1. Курсы, Учебники и Преподаватели',
      group2: '2. Настройки и Параметры',
      group3: '3. Системный Контроль и Аудит',
      itemsCountUnit: 'п.',
      adminRole: 'Главный Администратор',
      logout: 'Выйти из системы'
    },
    tabs: {
      dashboard: { title: 'Главная Панель', desc: 'Статистика и мониторинг', badge: 'Online' },
      editor: { title: 'Управление Курсами', desc: 'Добавление и редактирование курсов', badgeSuffix: 'курсов' },
      create_course: { title: 'Добавить Новый Курс', desc: 'Создание учебной программы', badge: '+ Курс' },
      textbooks_manager: { title: 'Учебники и Книги', desc: 'Управление учебными материалами', badgeSuffix: 'книг' },
      instructors_manager: { title: 'Преподаватели', desc: 'Список менторов и экспертов', badgeSuffix: 'чел.' },
      lessons_manager: { title: 'Уроки и Модули', desc: 'Управление уроками курса', badge: 'Уроки' },
      users: { title: 'Пользователи', desc: 'Студенты и наставники', badgeSuffix: 'чел.' },
      settings_general: { title: 'Настройки Платформы', desc: 'Название, режим и доступ', badge: 'Базовые' },
      settings_ai: { title: 'Настройки ИИ и Переводчика', desc: '10 языков и нейро-озвучка', badge: 'ИИ Активен' },
      settings_security: { title: 'Безопасность и Пароль', desc: 'Логин, пароль (1) и сессия', badge: 'Защита' },
      settings_billing: { title: 'Оплата и Биллинг', desc: 'Параметры Payme, Click, Uzum', badge: 'UZS' },
      settings_certificates: { title: 'Сертификаты и Оценивание', desc: 'Проходные баллы и критерии', badge: '70%+' },
      logs: { title: 'Системные Логи и Аудит', desc: 'Все события и входы' },
      settings_server: { title: 'Сервер и Диагностика', desc: 'Кэш, память и статус API', badge: 'В норме' },
      backup_export: { title: 'Резервная Копия и Экспорт', desc: 'Резервная копия и выгрузка JSON', badge: 'Backup' }
    },
    dashboard: {
      statStudents: 'Всего Студентов',
      statStudentsActive: 'активных учащихся',
      statNoStudents: 'Пока нет студентов (0)',
      statCourses: 'Все Курсы',
      statCoursesDesc: 'Все дисциплины доступны',
      statCertificates: 'Выданные Сертификаты',
      statCertificatesDesc: 'С QR-кодом гос. образца',
      statNoCertificates: 'Пока не выдано (0)',
      statAI: 'ИИ Перевод и Лаб',
      statAIDesc: '2,650+ слов в базе',
      manageResources: 'Управление Учебными Ресурсами',
      coursesCountLabel: 'курсов',
      textbooksCountLabel: 'учебников',
      instructorsCountLabel: 'преподавателей',
      addCourse: '+ Добавить Курс',
      addTextbook: '+ Добавить Учебник',
      addInstructor: '+ Добавить Ментора',
      diagnosticsTitle: 'Диагностика и Производительность Платформы',
      diagnosticsSub: 'Сервер и телеметрия данных в реальном времени',
      systemUptime: '99.98% Аптайм',
      serverRespTime: 'Время Ответа Сервера',
      optimalResp: 'Оптимальный показатель',
      activeSessions: 'Активные Сессии',
      studentsOnline: 'студентов онлайн',
      recentLogsTitle: 'Последние Системные Логи',
      viewAllLogs: 'Посмотреть все',
      noRecentLogs: 'Логи пока отсутствуют',
      logTime: 'Время',
      logEvent: 'Событие',
      logStatus: 'Статус'
    },
    editor: {
      title: 'Редактирование Курсов и Контента',
      subtitle: 'Выберите любой курс и измените его данные. Изменения мгновенно отображаются на сайте.',
      addCourseBtn: 'Добавить Новый Курс',
      searchPlaceholder: 'Поиск курсов...',
      lessonsSuffix: 'уроков',
      deleteCourseTitle: 'Удалить курс',
      formTitle: 'Редактирование Параметров Курса',
      courseIdLabel: 'ID Курса',
      fieldTitle: 'Название Курса',
      fieldCategory: 'Категория',
      fieldDesc: 'Краткое Описание',
      fieldLevel: 'Уровень сложности',
      fieldLessons: 'Количество Уроков',
      fieldHours: 'Длительность (часов)',
      fieldInstructor: 'Инструктор / Преподаватель',
      btnCancel: 'Отмена',
      btnSave: 'Сохранить Изменения',
      btnDeleteCourse: 'Полностью удалить этот курс'
    },
    createCourse: {
      title: 'Создание Нового Курса',
      subtitle: 'Добавление новой учебной программы на платформу',
      notice: 'Добавленный курс мгновенно появится в общем каталоге для студентов.',
      fieldTitle: 'Название Курса',
      titlePlaceholder: 'Например: Искусственный Интеллект и Python',
      fieldCategory: 'Категория / Направление',
      fieldDesc: 'Краткое Описание',
      descPlaceholder: 'Цель курса и ключевые навыки, которые освоит студент...',
      fieldInstructor: 'Инструктор / Эксперт',
      fieldLevel: 'Уровень сложности',
      fieldLessons: 'Количество Уроков',
      fieldHours: 'Длительность (часов)',
      btnReset: 'Очистить форму',
      btnCreate: 'Создать и Опубликовать Курс'
    },
    textbooks: {
      title: 'Учебники и Учебные Пособия',
      subtitle: 'База электронных учебников и учебных PDF-материалов',
      addBtn: '+ Новый Учебник',
      searchPlaceholder: 'Поиск по названию или автору...',
      filterAll: 'Все предметы',
      filterLangs: 'Иностранные языки',
      filterIT: 'IT и Программирование',
      filterExact: 'Точные науки',
      filterNatural: 'Естественные науки',
      filterHumanities: 'Гуманитарные науки',
      bookPages: 'стр.',
      bookFormat: 'Формат',
      bookAuthor: 'Автор',
      btnDownload: 'Скачать',
      btnDelete: 'Удалить',
      noBooksFound: 'Учебники не найдены'
    },
    instructors: {
      title: 'Управление Преподавателями и Менторами',
      subtitle: 'Список преподавателей платформы, специалистов и экспертов',
      addBtn: '+ Добавить Преподавателя',
      searchPlaceholder: 'Имя преподавателя или специальность...',
      cardExp: 'Опыт работы',
      cardOrg: 'Организация',
      cardEmail: 'Электронная почта',
      btnDelete: 'Удалить из списка',
      noInstructors: 'Преподаватели не найдены'
    },
    lessons: {
      title: 'Структура Уроков и Модулей',
      subtitle: 'Формирование модулей и практических уроков для каждого курса',
      selectCourseLabel: 'Выберите Курс',
      addModuleBtn: '+ Добавить Модуль',
      addLessonBtn: '+ Добавить Урок',
      modulesCount: 'модулей в курсе',
      noModules: 'В этом курсе пока нет модулей. Добавьте первый модуль.',
      btnDeleteModule: 'Удалить модуль',
      btnDeleteLesson: 'Удалить урок',
      typeVideo: 'Видеоурок',
      typeTest: 'Тестовые задания',
      typeReading: 'Теоретический материал'
    },
    users: {
      title: 'Список Пользователей и Студентов',
      subtitle: 'Зарегистрированные учащиеся, преподаватели и их учебная активность',
      addUserBtn: '+ Новый Пользователь',
      exportBtn: 'Экспорт',
      statTotal: 'Всего Пользователей',
      statActive: 'Активные Студенты',
      statMentors: 'Менторы и Преподаватели',
      statAvgScore: 'Средняя Успеваемость',
      searchPlaceholder: 'Имя студента или email...',
      roleAll: 'Все',
      roleStudents: 'Студенты',
      roleMentors: 'Менторы',
      roleAdmins: 'Администраторы',
      colName: 'Пользователь',
      colEmail: 'Email',
      colRole: 'Роль',
      colStatus: 'Статус',
      colActions: 'Действия',
      statusActive: 'Активен',
      statusBlocked: 'Заблокирован',
      btnBlock: 'Заблокировать',
      btnUnblock: 'Разблокировать',
      btnDelete: 'Удалить',
      noUsers: 'Пользователи не найдены'
    },
    settings: {
      generalTitle: 'Общие Настройки Платформы',
      generalSub: 'Название сайта, технический режим и параметры приема студентов',
      platformName: 'Название Платформы',
      systemStatus: 'Статус Системы',
      statusOnline: 'Активен (Открыт для всех)',
      statusMaintenance: 'Режим Технического Обслуживания',
      registrationsAllowed: 'Регистрация Новых Студентов',
      regOpen: 'Разрешена (Открыта)',
      regClosed: 'Ограничена (Закрыта)',
      btnResetDefaults: 'По умолчанию',
      btnSave: 'Сохранить Настройки',

      aiTitle: 'Параметры ИИ и 10-Языкового Переводчика',
      aiSub: 'Скорость нейро-озвучки, словарная база и автоанализ грамматики',
      aiTranslatorActive: 'Нейросетевой Переводчик в Реальном Времени',
      aiTranslatorDesc: 'Точный перевод между 10 ключевыми языками мира',
      aiGrammarAnalysis: 'Автоматический Анализ Грамматики и Примеров',
      aiGrammarDesc: 'Отображение временных форм, частей речи и синонимов для каждого введенного предложения',
      ttsSpeed: 'Скорость Нейросетевой Озвучки (TTS Speed)',
      btnTestVoice: 'Проверить Нейро-Озвучку',

      securityTitle: 'Безопасность и Пароль Администратора',
      securitySub: 'Логин и пароль администратора (По умолчанию: Логин: 1, Пароль: 1)',
      adminLogin: 'Логин Администратора (Логин: 1)',
      adminPassword: 'Пароль Администратора (Пароль: 1)',
      sessionTimeout: 'Длительность Сессии Администратора (в минутах)',

      billingTitle: 'Платежные Системы и Тарифные Параметры',
      billingSub: 'Национальные платежные шлюзы Узбекистана (Click, Payme, Uzum) и подписка',
      paymentGateways: 'Платежные Шлюзы',
      testGateway: 'Тест',
      currency: 'Валюта',
      monthlySub: 'Стоимость Месячной Премиум-Подписки',

      certTitle: 'Сертификаты и Критерии Оценивания',
      certSub: 'Критерии выдачи электронных сертификатов с QR-кодом',
      passingScore: 'Минимальный Проходной Балл (%)',
      distinctionScore: 'Балл для Сертификата с Отличием (%)',
      autoIssue: 'Автоматическая выдача сертификата после сдачи теста',
      signerTitle: 'Должность Лица, Подписывающего Сертификат',

      serverTitle: 'Диагностика Сервера и Управление Кэшем',
      serverSub: 'Скорость инфраструктуры, расход оперативной памяти и статус кэша',
      serverLatency: 'Время Ответа Сервера',
      serverMemory: 'Оперативная Память (RAM)',
      fastResp: 'Очень быстрый ответ (Отличный результат)',
      spareCapacity: '75% резервной мощности свободно',
      quickOperations: 'Быстрые Операции',
      btnClearCache: 'Очистить Кэш',
      btnRunDiagnostics: 'Запустить Тест Диагностики',
      btnTestPing: 'Проверить Пинг Сети',

      backupTitle: 'Резервное Копирование (Backup) и Экспорт',
      backupSub: 'Резервное копирование всех курсов, настроек, логов и базы пользователей',
      backupCard1Title: 'Скачать Полный Архив Платформы',
      backupCard1Desc: 'Все курсы, учебники, менторы, пользователи и настройки в одном JSON-файле',
      btnDownloadJson: 'Скачать Полный Файл Резервной Копии (.json)',
      btnRestoreJson: 'Восстановить из Резервного Файла (.json)',
      backupCard2Title: 'Сброс до Заводских Настроек',
      backupCard2Desc: 'Отменить все внесенные изменения и вернуть систему в исходное состояние',
      btnResetAll: 'Сбросить Систему до Исходного Состояния',
      backupAdvice: 'Рекомендация по безопасности:',
      backupAdviceDesc: 'Рекомендуется обновлять скачанные файлы резервной копии не реже одного раза в неделю.'
    },
    logs: {
      searchPlaceholder: 'Поиск по логам...',
      allLogs: 'Все логи',
      btnTestLog: '+ Тестовый Лог',
      btnExport: 'Экспорт',
      btnClear: 'Очистить',
      colTime: 'Время',
      colType: 'Тип',
      colEvent: 'Событие / Заголовок',
      colDetails: 'Подробности',
      colUser: 'Пользователь',
      colStatus: 'Статус',
      noLogsFound: 'Логи не найдены'
    },
    modals: {
      cancel: 'Отмена',
      add: 'Добавить',
      create: 'Создать',
      save: 'Сохранить',
      delete: 'Удалить',
      irreversible: 'Необратимое действие',
      deleteConfirmQuestion: 'Вы действительно хотите удалить этот элемент?',
      deleteConfirmPrefix: 'Вы действительно хотите удалить',
      deleteConfirmSuffix: 'без возможности восстановления?',
      btnConfirmDelete: 'Да, Удалить Навсегда',

      addCourseTitle: 'Добавить Новый Курс',
      addCourseSub: 'Внесение новой учебной программы на платформу',
      courseTitleLabel: 'Название Курса',
      courseCategoryLabel: 'Категория / Направление',
      courseLevelLabel: 'Уровень Сложности',
      courseInstructorLabel: 'Преподаватель / Инструктор',
      courseLessonsCountLabel: 'Количество Уроков',
      courseDurationHoursLabel: 'Длительность (часов)',
      courseDescLabel: 'Описание Курса',
      btnSaveCourse: 'Сохранить и Добавить Курс',

      addTextbookTitle: 'Добавить Новый Учебник',
      addTextbookSub: 'Загрузка учебного пособия или книги на платформу',
      textbookTitleLabel: 'Название Учебника',
      textbookSubjectLabel: 'Предмет / Язык',
      textbookCategoryLabel: 'Категория',
      textbookAuthorLabel: 'Автор / Издательство',
      textbookPagesLabel: 'Количество Страниц',
      textbookLevelLabel: 'Уровень',
      textbookFormatLabel: 'Формат',
      textbookSizeLabel: 'Размер Файла',
      textbookCoverLabel: 'Ссылка на Обложку (URL)',
      textbookDescLabel: 'Краткое Описание',
      btnSaveTextbook: 'Сохранить Учебник',

      addInstructorTitle: 'Добавить Преподавателя / Ментора',
      addInstructorSub: 'Добавление нового специалиста в команду преподавателей',
      instructorNameLabel: 'Ф.И.О. Преподавателя',
      instructorSpecLabel: 'Специализация',
      instructorRoleLabel: 'Должность и Сертификаты',
      instructorOrgLabel: 'Организация / Центр',
      instructorExpLabel: 'Опыт работы',
      instructorRatingLabel: 'Рейтинг (макс 5.0)',
      instructorEmailLabel: 'Email Адрес',
      instructorAvatarLabel: 'Ссылка на Аватар (URL)',
      instructorBioLabel: 'Краткая Биография (Bio)',
      btnSaveInstructor: 'Зарегистрировать Преподавателя',

      addLessonTitle: 'Добавить Новый Урок',
      addLessonSub: 'Добавление нового урока и материалов в модуль курса',
      lessonModuleSelectLabel: 'В какой модуль добавить:',
      lessonTitleLabel: 'Название Урока',
      lessonDurationLabel: 'Длительность',
      lessonTypeLabel: 'Тип Урока',
      lessonSnippetLabel: 'Краткое Содержание / Описание',
      btnSaveLesson: 'Добавить Урок',

      addModuleTitle: 'Создать Новый Модуль',
      addModuleSub: 'Добавление новой главы в учебный план курса',
      moduleTitleLabel: 'Название Модуля',
      btnSaveModule: 'Создать Модуль',

      addUserTitle: 'Зарегистрировать Пользователя',
      addUserSub: 'Создание учетной записи студента, ментора или администратора',
      userNameLabel: 'Ф.И.О. Пользователя',
      userEmailLabel: 'Email Адрес',
      userRoleLabel: 'Роль Пользователя',
      btnSaveUser: 'Добавить'
    }
  },

  en: {
    login: {
      title: 'Admin Sign In',
      subtitle: 'Secure access to the management and administration panel',
      credsBoxTitle: 'Admin Cabinet Credentials:',
      credsBoxText: 'Login: 1 · Password: 1',
      autoFill: 'Auto-fill',
      wrongCredsError: 'Invalid login or password! (For admin: Login: 1, Password: 1)',
      loginLabel: 'Login',
      loginPlaceholder: 'Enter login (e.g. 1)',
      passwordLabel: 'Password',
      passwordPlaceholder: 'Enter password (e.g. 1)',
      submitBtn: 'Sign In to Cabinet',
      verifying: 'Verifying credentials...',
      studentCabinetLink: 'Sign in as student'
    },
    header: {
      title: 'Admin Cabinet',
      subtitle: 'Control panel, system parameters and sequential management configuration',
      badge: 'ROOT ADMIN (LOGIN: 1)',
      activeSectionLabel: 'Active Section',
      closeTooltip: 'Close',
      switchLanguage: 'Switch Language'
    },
    sidebar: {
      searchPlaceholder: 'Search parameters or sections...',
      group1: '1. Courses, Textbooks & Instructors',
      group2: '2. Settings & Parameters',
      group3: '3. System Control & Audit',
      itemsCountUnit: 'items',
      adminRole: 'Super Administrator',
      logout: 'Log out'
    },
    tabs: {
      dashboard: { title: 'Main Dashboard', desc: 'Statistics & live monitoring', badge: 'Online' },
      editor: { title: 'Course Management', desc: 'Add, update & remove courses', badgeSuffix: 'courses' },
      create_course: { title: 'Add New Course', desc: 'Create a new learning curriculum', badge: '+ Course' },
      textbooks_manager: { title: 'Textbooks & Books', desc: 'Manage electronic textbooks & materials', badgeSuffix: 'books' },
      instructors_manager: { title: 'Instructors Management', desc: 'Manage faculty, mentors & experts', badgeSuffix: 'mentors' },
      lessons_manager: { title: 'Lessons & Modules', desc: 'Manage course curriculum & lessons', badge: 'Lessons' },
      users: { title: 'User Management', desc: 'Enrolled students & instructors', badgeSuffix: 'users' },
      settings_general: { title: 'Platform Settings', desc: 'Brand name, status & access rules', badge: 'General' },
      settings_ai: { title: 'AI & Translator Settings', desc: '10-language neural translation & voice', badge: 'AI Active' },
      settings_security: { title: 'Security & Password', desc: 'Login, password (1) & session timeout', badge: 'Security' },
      settings_billing: { title: 'Billing & Payments', desc: 'Payme, Click & Uzum gateways', badge: 'UZS' },
      settings_certificates: { title: 'Certificates & Grading', desc: 'Passing thresholds & verification', badge: '70%+' },
      logs: { title: 'System Logs & Audit', desc: 'Comprehensive event and access trail' },
      settings_server: { title: 'Server & Diagnostics', desc: 'Cache, memory & API health', badge: 'Healthy' },
      backup_export: { title: 'Backup & Export', desc: 'JSON database backup & data restore', badge: 'Backup' }
    },
    dashboard: {
      statStudents: 'Total Students',
      statStudentsActive: 'active learners',
      statNoStudents: 'No students yet (0)',
      statCourses: 'All Courses',
      statCoursesDesc: 'Comprehensive subject coverage',
      statCertificates: 'Issued Certificates',
      statCertificatesDesc: 'QR-verified official diplomas',
      statNoCertificates: 'None issued yet (0)',
      statAI: 'AI Translation & Lab',
      statAIDesc: '2,650+ vocabulary base',
      manageResources: 'Educational Resources Management',
      coursesCountLabel: 'courses',
      textbooksCountLabel: 'textbooks',
      instructorsCountLabel: 'instructors',
      addCourse: '+ Add Course',
      addTextbook: '+ Add Textbook',
      addInstructor: '+ Add Instructor',
      diagnosticsTitle: 'Platform Diagnostics & Telemetry',
      diagnosticsSub: 'Real-time server telemetry and data pipelines',
      systemUptime: '99.98% Uptime',
      serverRespTime: 'Server Response Time',
      optimalResp: 'Optimal speed performance',
      activeSessions: 'Active Sessions',
      studentsOnline: 'learners online',
      recentLogsTitle: 'Recent System Logs',
      viewAllLogs: 'View all logs',
      noRecentLogs: 'No logs recorded yet',
      logTime: 'Time',
      logEvent: 'Event',
      logStatus: 'Status'
    },
    editor: {
      title: 'Course Content & Curriculum Editor',
      subtitle: 'Select any course to edit its content in real-time. Changes are immediately reflected on the platform.',
      addCourseBtn: 'Add New Course',
      searchPlaceholder: 'Search courses...',
      lessonsSuffix: 'lessons',
      deleteCourseTitle: 'Delete course',
      formTitle: 'Edit Course Parameters',
      courseIdLabel: 'Course ID',
      fieldTitle: 'Course Title',
      fieldCategory: 'Category',
      fieldDesc: 'Short Description',
      fieldLevel: 'Proficiency Level',
      fieldLessons: 'Lesson Count',
      fieldHours: 'Duration (Hours)',
      fieldInstructor: 'Lead Instructor',
      btnCancel: 'Cancel',
      btnSave: 'Save Changes',
      btnDeleteCourse: 'Delete this course permanently'
    },
    createCourse: {
      title: 'Create New Course',
      subtitle: 'Add a new educational course and curriculum to the academy',
      notice: 'The new course will immediately appear in the public catalog for students.',
      fieldTitle: 'Course Title',
      titlePlaceholder: 'e.g., Artificial Intelligence & Modern Python',
      fieldCategory: 'Category / Field',
      fieldDesc: 'Short Description',
      descPlaceholder: 'Course goals and core competencies taught...',
      fieldInstructor: 'Lead Instructor / Expert',
      fieldLevel: 'Difficulty Level',
      fieldLessons: 'Lesson Count',
      fieldHours: 'Duration (Hours)',
      btnReset: 'Clear form',
      btnCreate: 'Create and Publish Course'
    },
    textbooks: {
      title: 'Textbooks & Educational Guides',
      subtitle: 'Repository of digital textbooks and PDF reference manuals',
      addBtn: '+ New Textbook',
      searchPlaceholder: 'Search by title or author...',
      filterAll: 'All subjects',
      filterLangs: 'Foreign languages',
      filterIT: 'IT & Programming',
      filterExact: 'Exact sciences',
      filterNatural: 'Natural sciences',
      filterHumanities: 'Humanities',
      bookPages: 'pages',
      bookFormat: 'Format',
      bookAuthor: 'Author',
      btnDownload: 'Download',
      btnDelete: 'Delete',
      noBooksFound: 'No textbooks found'
    },
    instructors: {
      title: 'Instructors & Mentors Management',
      subtitle: 'Certified teachers, subject experts and university faculty',
      addBtn: '+ Register New Instructor',
      searchPlaceholder: 'Search instructor name or specialty...',
      cardExp: 'Experience',
      cardOrg: 'Organization',
      cardEmail: 'Email',
      btnDelete: 'Remove instructor',
      noInstructors: 'No instructors found'
    },
    lessons: {
      title: 'Lessons & Modules Architecture',
      subtitle: 'Organize curriculum modules and hands-on lessons for each course',
      selectCourseLabel: 'Select Course',
      addModuleBtn: '+ Add Module',
      addLessonBtn: '+ Add Lesson',
      modulesCount: 'modules available',
      noModules: 'No modules exist for this course yet. Create your first module.',
      btnDeleteModule: 'Delete module',
      btnDeleteLesson: 'Delete lesson',
      typeVideo: 'Video lesson',
      typeTest: 'Quiz assessment',
      typeReading: 'Theoretical guide'
    },
    users: {
      title: 'Users & Students Directory',
      subtitle: 'Enrolled students, mentors and their real-time learning progress',
      addUserBtn: '+ New User',
      exportBtn: 'Export',
      statTotal: 'Total Users',
      statActive: 'Active Learners',
      statMentors: 'Mentors & Faculty',
      statAvgScore: 'Average Score',
      searchPlaceholder: 'Search student name or email...',
      roleAll: 'All',
      roleStudents: 'Students',
      roleMentors: 'Mentors',
      roleAdmins: 'Admins',
      colName: 'User',
      colEmail: 'Email',
      colRole: 'Role',
      colStatus: 'Status',
      colActions: 'Actions',
      statusActive: 'Active',
      statusBlocked: 'Suspended',
      btnBlock: 'Suspend',
      btnUnblock: 'Reactivate',
      btnDelete: 'Delete',
      noUsers: 'No users found'
    },
    settings: {
      generalTitle: 'General Platform Settings',
      generalSub: 'Branding, maintenance mode and student registration configuration',
      platformName: 'Platform Name',
      systemStatus: 'System Status',
      statusOnline: 'Active Online (Open to everyone)',
      statusMaintenance: 'Maintenance Mode',
      registrationsAllowed: 'Student Self-Registration',
      regOpen: 'Allowed (Open)',
      regClosed: 'Restricted (Closed)',
      btnResetDefaults: 'Restore defaults',
      btnSave: 'Save Platform Settings',

      aiTitle: 'AI Techie & 10-Language Neural Translator Settings',
      aiSub: 'Neural voice speed, vocabulary database and automatic grammar analyzer',
      aiTranslatorActive: 'Real-Time Neural Translator',
      aiTranslatorDesc: 'High-precision translation across 10 global languages',
      aiGrammarAnalysis: 'Automated Grammar & Syntax Analysis',
      aiGrammarDesc: 'Show grammatical breakdown, parts of speech and synonym recommendations',
      ttsSpeed: 'Neural Speech Synthesis Speed (TTS Speed)',
      btnTestVoice: 'Test Neural Voice',

      securityTitle: 'Administrator Security & Password',
      securitySub: 'Admin cabinet credentials (Default: Login: 1, Password: 1)',
      adminLogin: 'Admin Login (Login: 1)',
      adminPassword: 'Admin Password (Password: 1)',
      sessionTimeout: 'Admin Session Timeout (in minutes)',

      billingTitle: 'Payment Gateways & Subscription Pricing',
      billingSub: 'National payment gateways (Click, Payme, Uzum) and premium membership',
      paymentGateways: 'Payment Gateways',
      testGateway: 'Test',
      currency: 'Currency',
      monthlySub: 'Monthly Premium Subscription Rate',

      certTitle: 'Certificates & Grading Standards',
      certSub: 'QR-verified digital diplomas and automated qualification criteria',
      passingScore: 'Minimum Passing Score (%)',
      distinctionScore: 'Honor Distinction Score (%)',
      autoIssue: 'Automatically issue certificate upon test completion',
      signerTitle: 'Official Certificate Signer Title',

      serverTitle: 'Server Diagnostics & Cache Control',
      serverSub: 'Infrastructure responsiveness, memory utilization and session cache',
      serverLatency: 'Server Response Latency',
      serverMemory: 'Memory Allocation (RAM)',
      fastResp: 'Ultra-fast response (Optimal rating)',
      spareCapacity: '75% reserve capacity available',
      quickOperations: 'Quick Operations',
      btnClearCache: 'Flush System Cache',
      btnRunDiagnostics: 'Run Diagnostics Suite',
      btnTestPing: 'Test Network Ping',

      backupTitle: 'System Backup & Data Export',
      backupSub: 'Archive all courses, configurations, logs and student records to file',
      backupCard1Title: 'Download Complete Platform Archive',
      backupCard1Desc: 'All courses, textbooks, instructors, users and configuration in a single JSON file',
      btnDownloadJson: 'Download Full Backup File (.json)',
      btnRestoreJson: 'Restore from Backup File (.json)',
      backupCard2Title: 'Factory Defaults Reset',
      backupCard2Desc: 'Discard all custom alterations and return system to clean initial state',
      btnResetAll: 'Reset Platform to Factory Defaults',
      backupAdvice: 'Backup recommendation:',
      backupAdviceDesc: 'It is strongly recommended to download system backups at least once per week.'
    },
    logs: {
      searchPlaceholder: 'Search event logs...',
      allLogs: 'All logs',
      btnTestLog: '+ Test Log',
      btnExport: 'Export',
      btnClear: 'Clear logs',
      colTime: 'Timestamp',
      colType: 'Type',
      colEvent: 'Event / Headline',
      colDetails: 'Details',
      colUser: 'User',
      colStatus: 'Status',
      noLogsFound: 'No logs match your filter'
    },
    modals: {
      cancel: 'Cancel',
      add: 'Add',
      create: 'Create',
      save: 'Save',
      delete: 'Delete',
      irreversible: 'Irreversible action',
      deleteConfirmQuestion: 'Are you sure you want to permanently delete this item?',
      deleteConfirmPrefix: 'Are you sure you want to permanently delete',
      deleteConfirmSuffix: '? This action cannot be undone.',
      btnConfirmDelete: 'Yes, Delete Permanently',

      addCourseTitle: 'Add New Course',
      addCourseSub: 'Publish a new curriculum to the platform catalog',
      courseTitleLabel: 'Course Title',
      courseCategoryLabel: 'Category / Domain',
      courseLevelLabel: 'Difficulty Level',
      courseInstructorLabel: 'Instructor / Faculty Member',
      courseLessonsCountLabel: 'Number of Lessons',
      courseDurationHoursLabel: 'Duration (hours)',
      courseDescLabel: 'Course Description',
      btnSaveCourse: 'Save & Publish Course',

      addTextbookTitle: 'Add New Textbook',
      addTextbookSub: 'Upload a new digital study manual or book to the platform',
      textbookTitleLabel: 'Textbook Title',
      textbookSubjectLabel: 'Subject / Language',
      textbookCategoryLabel: 'Category',
      textbookAuthorLabel: 'Author / Publisher',
      textbookPagesLabel: 'Page Count',
      textbookLevelLabel: 'Level',
      textbookFormatLabel: 'Format',
      textbookSizeLabel: 'File Size',
      textbookCoverLabel: 'Cover Image Link (URL)',
      textbookDescLabel: 'Brief Description',
      btnSaveTextbook: 'Save Textbook',

      addInstructorTitle: 'Register Instructor / Mentor',
      addInstructorSub: 'Enroll a new faculty member into the academy team',
      instructorNameLabel: 'Instructor Full Name',
      instructorSpecLabel: 'Specialization Field',
      instructorRoleLabel: 'Role & Credentials',
      instructorOrgLabel: 'Organization / Center',
      instructorExpLabel: 'Experience',
      instructorRatingLabel: 'Rating (max 5.0)',
      instructorEmailLabel: 'Email Address',
      instructorAvatarLabel: 'Avatar Image Link (URL)',
      instructorBioLabel: 'Biography (Bio)',
      btnSaveInstructor: 'Register Instructor',

      addLessonTitle: 'Add New Lesson',
      addLessonSub: 'Add lesson content and resources into course syllabus',
      lessonModuleSelectLabel: 'Target module:',
      lessonTitleLabel: 'Lesson Title',
      lessonDurationLabel: 'Duration',
      lessonTypeLabel: 'Lesson Type',
      lessonSnippetLabel: 'Summary / Outline',
      btnSaveLesson: 'Add Lesson',

      addModuleTitle: 'Create New Module',
      addModuleSub: 'Add a new curriculum section into this course',
      moduleTitleLabel: 'Module Title',
      btnSaveModule: 'Create Module',

      addUserTitle: 'Register New User',
      addUserSub: 'Provision a student, mentor or administrator account',
      userNameLabel: 'Full Name',
      userEmailLabel: 'Email Address',
      userRoleLabel: 'User Role',
      btnSaveUser: 'Create User'
    }
  }
};

export const getAdminTranslations = (lang: SupportedLanguage): AdminTranslations => {
  return ADMIN_TRANSLATIONS[lang] || ADMIN_TRANSLATIONS.uz;
};
