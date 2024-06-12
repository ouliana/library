const { PrismaClient, Role } = require('@prisma/client');
// import { hash } from 'bcrypt';
const { hash } = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
  const passwordHashGuest = await hash(process.env.PASSWORD_GUEST, 10);
  const passwordHashAdmin = await hash(process.env.PASSWORD_ADMIN, 10);

  await prisma.user.create({
    data: {
      username: 'guest',
      password: passwordHashGuest,
      role: Role.GUEST
    }
  });

  await prisma.user.create({
    data: {
      username: 'admin',
      password: passwordHashAdmin,
      role: Role.ADMIN
    }
  });

  await prisma.author.create({
    data: {
      firstName: 'Михаил',
      lastName: 'Булгаков',
      born: 1891,
      profile:
        'https://storage.yandexcloud.net/portfolio-kotik/mikhail-bulgakov.jpg',
      creditText: '',
      creditLink: '',
      annotation:
        'Русский писатель советского периода, врач, драматург, театральный режиссёр и актёр. Автор романов, повестей, рассказов, пьес, киносценариев и фельетонов, написанных в 1920-е годы.'
    }
  });

  await prisma.author.create({
    data: {
      firstName: 'Фёдор',
      lastName: 'Достоевский',
      born: 1821,
      profile: 'https://storage.yandexcloud.net/portfolio-kotik/dostoevsky.jpg',
      creditText: '',
      creditLink: '',
      annotation:
        'Фёдор Михайлович Достоевский (30 октября [11 ноября] 1821, Москва — 28 января [9 февраля] 1881, Санкт-Петербург) — русский писатель, мыслитель, философ и публицист. Член-корреспондент Петербургской академии наук с 1877 года. Классик мировой литературы, по данным ЮНЕСКО, один из самых читаемых писателей в мире. Собрание сочинений Достоевского состоит из 12 романов, четырёх новелл, 16 рассказов и множества других произведений.'
    }
  });

  await prisma.author.create({
    data: {
      firstName: 'Аркадий и Борис',
      lastName: 'Стругацкие',
      born: 0,
      profile:
        'https://storage.yandexcloud.net/portfolio-kotik/strugatskie.jpg',
      creditText: '',
      creditLink: '',
      annotation:
        'Аркадий Натанович (28 августа 1925, Батуми — 12 октября 1991, Москва) и Борис Натанович (15 апреля 1933, Ленинград — 19 ноября 2012, Санкт-Петербург) Стругацкие — русские советские писатели, сценаристы, одни из немногих советских авторов научной и социальной фантастики, оказавшихся востребованными после распада СССР. Начав с произведений в синтетическом жанре приключенческой и научно-технической фантастики, Стругацкие быстро перешли к социальной прогностике и моделированию в форме «реалистической фантастики», идейное содержание которой обёрнуто в острый сюжет. Большинство их книг посвящены установлению контакта с иным разумом, рассмотрению вопроса о допустимости и оправданности вмешательства либо невмешательства в естественную эволюцию цивилизаций любых типов, изучению разных форм утопии. Немало места в их творчестве уделялось проблеме идеологизации и деидеологизации общества и роли культуры в государстве.'
    }
  });

  await prisma.author.create({
    data: {
      firstName: 'Джозеф',
      lastName: 'Хеллер',
      born: 1923,
      profile:
        'https://storage.yandexcloud.net/portfolio-kotik/joseph_heller.jpg',
      creditText:
        'derivative work: Anrie (talk)Joseph_Heller1986.jpg: MDCArchives. Joseph_Heller1986.jpg, CC BY-SA 3.0',
      creditLink: 'https://commons.wikimedia.org/w/index.php?curid=5403764',
      annotation:
        'Американский писатель, автор нескольких романов, наиболее известным среди которых считается «Поправка-22» («Catch-22»). Название книги прочно вошло в лексикон как жителей Америки, так и за её пределами, именно так стали называть безвыходные ситуации.'
    }
  });

  // genre
  await prisma.genre.create({
    data: {
      name: 'Роман'
    }
  });

  await prisma.genre.create({
    data: {
      name: 'Повесть'
    }
  });

  await prisma.genre.create({
    data: {
      name: 'Сатира'
    }
  });

  await prisma.genre.create({
    data: {
      name: 'Научная фантастика'
    }
  });

  await prisma.genre.create({
    data: {
      name: 'Антиутопическая литература'
    }
  });

  await prisma.genre.create({
    data: {
      name: 'Фэнтези'
    }
  });

  await prisma.genre.create({
    data: {
      name: 'Психологический реализм'
    }
  });

  await prisma.genre.create({
    data: {
      name: 'Криминальный жанр'
    }
  });

  await prisma.genre.create({
    data: {
      name: 'Философская художественная литература'
    }
  });

  // books
  await prisma.book.create({
    data: {
      title: 'Собачье сердце',
      published: 1925,
      author: {
        connect: {
          id: 1
        }
      },
      genres: {
        connect: [{ id: 2 }, { id: 3 }, { id: 5 }]
      },
      annotation:
        'Острая сатира на большевизм, повесть была написана в разгар периода НЭПа, когда коммунизм в СССР, на первый взгляд, начал сдавать позиции. Сюжет произведения обычно интерпретируют как аллегорию коммунистической революции и ошибочной попытки её сторонников «радикально преобразовать человечество». Первоначально публикация повести была запрещена в Советском Союзе, но она распространялась через самиздат до тех пор, пока не была официально выпущена в стране в 1987 году. На основе повести в 1988 году был снят одноимённый фильм, который вышел в эфир в конце года на главном телеканале советского телевидения, получил всеобщее признание и привлёк многих читателей к оригинальному булгаковскому тексту.'
    }
  });

  await prisma.book.create({
    data: {
      title: 'Мастер и Маргарита',
      published: 1940,
      author: {
        connect: {
          id: 1
        }
      },
      genres: {
        connect: [{ id: 1 }, { id: 3 }, { id: 6 }]
      },
      annotation:
        'Могоплановое произведение, богатое сюжетными коллизиями и смысловыми пластами, объединяющимися вокруг нескольких тем (любовь, долг и совесть, предательство и верность, ученичество, воздаяние и другие). Все элементы романа поддаются вариативной интерпретации: от сюжетных линий, содержащих намёки на биографические моменты, политические параллели и авторскую полемику с религиозными, культурными и литературными авторитетами, до отдельных слов, с которыми связаны целые ассоциативные поля. Книга значительно повлияла на русскую и мировую литературу и является самым знаменитым произведением Булгакова.'
    }
  });

  await prisma.book.create({
    data: {
      title: 'Преступление и наказание',
      published: 1866,
      author: {
        connect: {
          id: 2
        }
      },
      genres: {
        connect: [{ id: 1 }, { id: 7 }, { id: 8 }, { id: 9 }]
      },
      annotation:
        'В основе сюжета лежит преступление студента Родиона Раскольникова, убившего ради спасения близких старуху-процентщицу. При этом криминальная история стала для автора не только темой, но и поводом для размышлений о социальных обстоятельствах, толкающих человека на преступления, а также возможностью показать, какие сложные «химические» процессы происходят в душах людей. Одним из образов романа стал большой город второй половины XIX века, жизнь в котором полна конфликтов и драм. В произведении воссозданы узнаваемые приметы времени, воспроизведена петербургская топография.'
    }
  });

  await prisma.book.create({
    data: {
      title: 'Бесы',
      published: 1872,
      author: {
        connect: {
          id: 2
        }
      },
      genres: {
        connect: [{ id: 1 }, { id: 3 }, { id: 7 }]
      },
      annotation:
        'Один из наиболее политизированных романов Достоевского был написан им под впечатлением от ростков террористического и радикального движений в среде русских интеллигентов, разночинцев и прочих. Непосредственным прообразом сюжета романа стало вызвавшее большой резонанс в обществе дело об убийстве студента Ивана Иванова, задуманное С. Г. Нечаевым с целью укрепления своей власти в революционном террористическом кружке.'
    }
  });

  await prisma.book.create({
    data: {
      title: 'Пикник на обочине',
      published: 1972,
      author: {
        connect: {
          id: 3
        }
      },
      genres: {
        connect: [{ id: 1 }, { id: 4 }]
      },
      annotation:
        'Действие повести происходит на Земле предположительно в 1970-е годы в городке Хармонт, в выдуманной англоязычной стране. До начала описываемых в книге событий в нескольких местах на земном шаре возникает шесть «зон» — областей, в которых начинают происходить странные явления, нарушающие известные законы физики. Зоны опасны для проживания и в них находят артефакты непонятного предназначения. Предполагается, что Зоны созданы представителями внеземной цивилизации. Одна из основных тем — нравственный выбор тех, в чьи руки попадают артефакты Зоны, то, как ими воспользуется человечество, которое, строго говоря, плохо понимает, в чём предназначение этих опасных вещей, неизвестно зачем оставленных пришельцами.'
    }
  });

  await prisma.book.create({
    data: {
      title: 'Трудно быть богом',
      published: 1964,
      author: {
        connect: {
          id: 3
        }
      },
      genres: {
        connect: [{ id: 2 }, { id: 4 }]
      },
      annotation:
        'Действие повести разворачивается в будущем, на планете с гуманоидной цивилизацией, в местном государстве Арканар. Представители цивилизации физически неотличимы от людей. Цивилизация находится на уровне развития, соответствующем земному позднему средневековью. На планете негласно присутствуют сотрудники земного Института экспериментальной истории, начавшие наблюдение за развитием цивилизации больше двух десятилетий назад. В повести присутствуют три смысловых пласта. Пласт социально-исторической проблематики являлся, по всей видимости, центральным в восприятии текста современниками. Успех среди читателей повесть завоевала также благодаря поверхностному смысловому пласту: захватывающему авантюрному сюжету, противостоянию героя с горсткой его друзей коварной власти и пр. Однако наиболее глубоким смысловым пластом является экзистенциальный: центральные для духовных исканий XX столетия проблемы — возможность действия и ответственности (проблема личной ответственности, проблемы поведения человека перед лицом трагической исторической неизбежности и прочее).'
    }
  });

  await prisma.book.create({
    data: {
      title: 'Поправка-22',
      published: 1961,
      author: {
        connect: {
          id: 4
        }
      },
      genres: {
        connect: [{ id: 1 }, { id: 3 }]
      },
      annotation:
        '1944 год. На островке Пианоза в Тирренском море расквартирован бомбардировочный полк ВВС США (летающий на бомбардировщиках North American B-25 Mitchell), в котором служат капитан Йоссариан, главный герой романа, и его сослуживцы. Командование авиаполка раз за разом увеличивает норму боевых вылетов, тем самым продлевая службу пилотов, отлетавших свою норму, после которой они имеют право вернуться домой. Таким образом, отлетать норму становится практически невозможным. Роман известен возникшим в нём логическим парадоксом между взаимоисключающими правилами,установленными поправкой 22.'
    }
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    await prisma.$disconnect();
    process.exit(1);
    throw new Error(e);
  });