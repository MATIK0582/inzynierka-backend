
# Praca inżynierska - Backend

Backend serwera do aplikacji zarządzania urlopami stworzony w Node.js z użyciem TypeScript i Express. Projekt jest częścią pracy inżynierskiej.

## 📚 **Spis treści**
- [Wymagania wstępne](#wymagania-wstępne)
- [Instalacja](#instalacja)
- [Uruchamianie aplikacji](#uruchamianie-aplikacji)
- [Zmiennie środowiskowe](#zmiennie-środowiskowe)
- [Dostępne skrypty](#dostępne-skrypty)

---

## 🛠️ **Wymagania wstępne**
Aby uruchomić ten projekt, upewnij się, że masz zainstalowane:
- **Node.js** (wersja 18 lub nowsza) — [Pobierz tutaj](https://nodejs.org/en/download/prebuilt-installer)
- **Yarn** (menedżer pakietów) — [Instalacja Yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
- **PostgreSQL** (jako baza danych) — [Pobierz tutaj](https://www.postgresql.org/download/)

---

## 📦 **Instalacja**
1. **Sklonuj repozytorium**:
   ```bash
   git clone https://github.com/MATIK0582/inzynierka-backend/.git
   cd inzynierka-backend
   ```

2. **Zainstaluj zależności**:
   ```bash
   yarn install
   ```

3. **Skonfiguruj zmienne środowiskowe**:
   - Utwórz plik `.env` w katalogu głównym projektu.
   - Dodaj do niego wymagane zmienne środowiskowe (opisane poniżej).
  
4. **Wygeneruj modele bazy danych**:
   ```bash
   yarn db:generate
   ```

5. **Przeprowadź migrację bazy danych**:
   ```bash
   yarn db:migrate
   ```

---

## 🔐 **Zmienne środowiskowe**

Aby uruchomić aplikację, musisz skonfigurować zmienne środowiskowe. Utwórz plik `.env` i dodaj następujące wartości:

```
APP_PORT=port-uruchomienia-aplikacji
HOSTNAME=localhost
DB_HOST=localhost
DB_PORT=5432
DB_USER=nazwa-uzytkownika-bazy-dancyh
DB_PASSWORD=hasło-uzytkownika-bazy-dancyh
DB_NAME=nazwa-tabeli-w-bazie-dancyh
ACCESS_TOKEN_SECRET=twoj-sekretny-klucz
REFRESH_TOKEN_SECRET=twoj-drugi-sekretny-klucz
NODE_ENV=development
MAIL_PROVIDER=gmail
MAIL_PROVIDER_ADDRESS=adres-email-do-wysyłania-powiadomien
MAIL_PASSWORD=hasło-uzytkownika-do-gmail
```

---

## 🚀 **Uruchamianie aplikacji**

### W trybie developerskim (z automatycznym restartem)
```bash
yarn start:dev
```
> **Uwaga:** Aplikacja zostanie uruchomiona na porcie zdefiniowanym w `APP_PORT` w pliku `.env`.

### W trybie produkcyjnym (po zbudowaniu aplikacji)
1. Zbuduj aplikację:
   ```bash
   yarn build
   ```

2. Uruchom zbudowaną aplikację:
   ```bash
   yarn start:prod
   ```

### Inne tryby
- **Z uruchomionym automatycznym restartem (nodemon)**:
  ```bash
  yarn start:dev:watch
  ```

---

## 📜 **Dostępne skrypty**

| Skrypt                 | Opis                                                           |
|-----------------------|----------------------------------------------------------------|
| `yarn lint`            | Analizuje kod źródłowy pod kątem błędów w kodzie.             |
| `yarn lint:fix`        | Naprawia automatycznie możliwe do naprawienia błędy ESLint.    |
| `yarn build`           | Buduje aplikację TypeScript do plików JavaScript (w folderze `dist/`). |
| `yarn start:dev`       | Uruchamia serwer deweloperski.                                 |
| `yarn start:dev:watch` | Uruchamia serwer deweloperski z automatycznym restartem.      |
| `yarn start:prod`      | Uruchamia zbudowaną aplikację produkcyjną.                     |
| `yarn db:generate`     | Generuje modele baz danych z użyciem Drizzle ORM.             |
| `yarn db:migrate`      | Wykonuje migrację bazy danych.                                |
| `yarn db:studio`       | Otwiera GUI do zarządzania bazą danych (Drizzle Studio).      |

---

**Autor:** Mateusz Topczewski  
**Licencja:** ISC
