# 7-тапсырма: MongoDB және Cassandra

Тапсырманың шарты: [task7.md](task7.md).

## Docker Compose арқылы бір командамен іске қосу

Docker Engine және Docker Compose орнатылып, Docker қызметі іске қосылған болуы керек. Қызмет тоқтап тұрса, Linux-та `sudo systemctl start docker` командасын орындаңыз.

Жоба бумасында орындаңыз:

```bash
docker compose up -d
```

[compose.yaml](compose.yaml) MongoDB 8.0 және Cassandra 5.0 серверлерін іске қосып, тапсырманың екі скриптін автоматты түрде орындайды. `mongosh` және `cqlsh` компьютерге бөлек орнатылмайды: олар контейнерлерде бар. Алғашқы іске қосуда образдар жүктеледі, Cassandra дайындығын күту бірнеше минут алуы мүмкін.

MongoDB скрипті жаңа деректер томында тек алғашқы іске қосу кезінде орындалады. Cassandra дайын болғаннан кейін `cassandra-init` қызметі CQL скриптін орындайды. Қайтадан `docker compose up -d` орындалғанда, бұл қызмет қайта іске қосылуы мүмкін; `id = 1` және `id = 2` үшін операциялар қайталанса да, соңында тек `Laptop` (270000) қалады.

Күйді және нәтижелерді тексеру:

```bash
docker compose ps -a
docker compose logs mongodb cassandra-init
```

Дайын болғанда `mongodb` және `cassandra` қызметтерінің күйі — `healthy`, ал `cassandra-init` күйі — `Exited (0)`. Бұл бір рет орындалатын қызмет үшін қалыпты жағдай.

VS Code-та қосылу параметрлері:

| Дерекқор | Мекенжай | Деректер |
| --- | --- | --- |
| MongoDB | `mongodb://127.0.0.1:27017` | `library` → `books` |
| Cassandra | host: `127.0.0.1`, port: `9042`, datacenter: `datacenter1` | `university` → `products` |

Осы жергілікті оқу ортасында пайдаланушы аты мен құпиясөз қажет емес. Порттар тек осы компьютерден қосылуға ашылған.

Контейнер ішіндегі құралдармен соңғы деректерді көру:

```bash
docker compose exec mongodb mongosh library --quiet --eval 'db.books.find({}, {_id: 0}).toArray()'
docker compose exec cassandra cqlsh -e 'SELECT * FROM university.products;'
```

Тоқтату:

```bash
docker compose down
```

Деректер Docker томдарында сақталады. Барлық оқу деректерін өшіріп, тапсырманы басынан бастау қажет болса ғана:

```bash
docker compose down -v
docker compose up -d
```

Бұрын жеке `docker run` арқылы құрылған контейнерлердің деректері Compose томдарына автоматты түрде көшірілмейді.

## 1-тапсырма. MongoDB

[mongodb.js](mongodb.js) скрипті `library` дерекқорын таңдап, `books` коллекциясын құрады. Оған үш кітап енгізеді, 2020 жылдан кейін шыққан кітаптарды табады, `Java` кітабының жылын 2022 жылға өзгертеді және `Python` кітабын жояды.

MongoDB сервері жұмыс істеп тұрғанда, жоба бумасында орындаңыз:

```bash
mongosh --file mongodb.js
```

Басқа серверге қосылу үшін:

```bash
mongosh "mongodb://localhost:27017" --file mongodb.js
```

Бос коллекцияда бірінші рет орындағанда, іздеу нәтижесінде `Python` (2021) және `MongoDB` (2023) кітаптары шығады. Барлық әрекеттерден кейін күтілетін күй:

| title | year | author |
| --- | --- | --- |
| Java | 2022 | B |
| MongoDB | 2023 | C |

Скрипт бұрыннан бар жазбаларды тазаламайды. Қайта іске қосқанда жаңа кітаптар қосылады; жоғарыдағы нәтиже бос коллекциядағы алғашқы іске қосуға арналған.

## 2-тапсырма. Cassandra

[cassandra.cql](cassandra.cql) скрипті `university` keyspace жоқ болса құрады және оны `USE university` арқылы таңдайды. Содан кейін `products` кестесін құрып, екі өнім енгізеді, барлық өнімдерді шығарады, `Laptop` бағасын 270000 мәніне өзгертеді және `Mouse` өнімін жояды.

Keyspace үшін жергілікті бір түйінді оқу ортасына арналған `SimpleStrategy` және `replication_factor = 1` параметрлері қолданылған.

Cassandra сервері жұмыс істеп тұрғанда, жоба бумасында орындаңыз:

```bash
cqlsh -f cassandra.cql
```

Сервер мекенжайын көрсету үшін:

```bash
cqlsh 127.0.0.1 9042 -f cassandra.cql
```

Бос кестеде орындағаннан кейін күтілетін күй:

| id | name | price |
| --- | --- | --- |
| 1 | Laptop | 270000 |

## Тексеру

Әр скрипт соңында деректердің соңғы күйін көрсетеді. Жоғарыдағы кестелер — күтілетін нәтижелер.

`docker compose config -q` арқылы Compose конфигурациясы, `node --check mongodb.js` арқылы JavaScript синтаксисі тексерілді. Іске қосылған контейнерлерде екі дерекқордың соңғы күйі де тексерілді: MongoDB-де `Java` (2022) және `MongoDB` (2023), Cassandra-да `Laptop` (270000) бар. Екі сервердің күйі — `healthy`, `cassandra-init` шығу коды — `0`.

VS Code-тағы SQLTools Cassandra 0.2.3 кеңейтімі жаңа Node.js ортасында `util.isDate is not a function` қатесін беруі мүмкін. Осы компьютердегі кеңейтімнің жинақталған `out/ls/plugin.js` файлында ескі `util.isDate` және `util.isString` шақырулары ауыстырылды, бастапқы файлдың `plugin.js.before-node24-fix.bak` сақтық көшірмесі бар. Түзетілген драйвер VS Code-тың Node.js 24 ортасында Cassandra-ға қосылып, `products` кестесінің деректері мен кестелер тізімін сәтті оқыды. Түзетуді қолдану үшін VS Code-та `Developer: Reload Window` командасын орындау керек. Кеңейтімді жаңартқанда жергілікті түзету өшірілуі мүмкін.

Compose ішінде Cassandra дайындығын күту үшін `service_healthy` шарты қолданылған: [Docker нұсқаулығы](https://docs.docker.com/compose/how-tos/startup-order/). MongoDB алғашқы іске қосуда `/docker-entrypoint-initdb.d` ішіндегі скрипттерді орындайды: [образ нұсқаулығы](https://github.com/docker-library/docs/blob/master/mongo/README.md#initializing-a-fresh-instance).
