# 📝 포스트 애플리케이션 (Post Application)

**Created by codingdonny** 🚀

이 프로젝트는 React와 Spring Boot를 활용한 CRUD(Create, Read, Update, Delete) 기능을 갖춘 포스트 관리 애플리케이션입니다.

## 🎯 프로젝트 개요

- **프론트엔드**: React + Vite + Material-UI
- **백엔드**: Spring Boot 3 (별도 리포지토리)
- **주요 기능**: 포스트 등록, 조회, 수정, 삭제, 토스트 메시지

## 🛠 기술 스택

### Frontend

- React 18
- Vite
- Material-UI (MUI)
- React Router DOM
- Axios

### 주요 기능

- ✅ 포스트 목록 조회
- ✅ 포스트 상세 조회
- ✅ 포스트 등록
- ✅ 포스트 수정
- ✅ 포스트 삭제
- ✅ 반응형 디자인
- ✅ 토스트 메시지 (성공/오류)

## 📋 사전 요구사항

다음 소프트웨어가 설치되어 있어야 합니다:

- **Node.js**: 18.0.0 이상
- **npm**: 8.0.0 이상 또는 **yarn**
- **Git**: 버전 관리용

## 🚀 프로젝트 실행 방법

### 1. 프로젝트 클론

```bash
git clone https://github.com/mooh2jj/deploy-frontend-post.git
cd deploy-frontend-post
```

### 2. 의존성 설치

```bash
npm install
# 또는
yarn install
```

### 3. 환경 변수 설정

프로젝트에서는 환경별로 다른 API URL을 사용합니다. 다음 환경 변수 파일들을 프로젝트 루트 디렉토리에 생성해주세요:

#### 3-1. 로컬 개발용 환경 변수 파일 생성

**파일명: `.env.local`** (로컬 개발시 최우선 적용)

```bash
# 프로젝트 루트 디렉토리에 .env.local 파일 생성
touch .env.local
```

`.env.local` 파일 내용:

```env
VITE_API_BASE_URL=http://localhost:8080
```

#### 3-2. 프로덕션 환경 변수 파일 생성

**파일명: `.env.production`**

```bash
# 프로젝트 루트 디렉토리에 .env.production 파일 생성
touch .env.production
```

`.env.production` 파일 내용:

```env
VITE_API_BASE_URL=https://api.dsgpost.link
```

#### 환경 변수 파일 우선순위

Vite에서 환경 변수 파일의 로딩 우선순위는 다음과 같습니다:

1. `.env.local` (모든 환경에서 로드되지만 git에 커밋되지 않음)
2. `.env.[mode].local` (특정 모드의 로컬 설정)
3. `.env.[mode]` (특정 모드 설정)
4. `.env` (기본 설정)

#### Windows 사용자용 파일 생성 방법

**방법 1: 명령 프롬프트(CMD) 사용**

```cmd
echo VITE_API_BASE_URL=http://localhost:8080 > .env.local
echo VITE_API_BASE_URL=http://localhost:8080 > .env.development
echo VITE_API_BASE_URL=https://api.dsgpost.link > .env.production
```

**방법 2: PowerShell 사용**

```powershell
New-Item -Path ".env.local" -ItemType "file" -Value "VITE_API_BASE_URL=http://localhost:8080"
New-Item -Path ".env.development" -ItemType "file" -Value "VITE_API_BASE_URL=http://localhost:8080"
New-Item -Path ".env.production" -ItemType "file" -Value "VITE_API_BASE_URL=https://api.dsgpost.link"
```

**방법 3: 메모장으로 직접 생성**

1. 메모장을 실행합니다
2. 환경 변수 내용을 입력합니다
3. '다른 이름으로 저장' → 파일 형식을 '모든 파일'로 선택
4. 파일명을 `.env.local` 등으로 입력하여 저장

#### 주의사항 ⚠️

- 환경 변수 파일명은 반드시 `.env`로 시작해야 합니다
- Vite에서 사용하는 환경 변수는 반드시 `VITE_` 접두사를 붙여야 합니다
- `.env.local` 파일은 개인 설정이므로 `.gitignore`에 포함되어야 합니다
- 백엔드 Spring Boot 애플리케이션이 해당 포트에서 실행되고 있어야 합니다

### 4. 메인 캐릭터 이미지 추가

`public` 폴더에 `main_character.png` 이미지 파일을 추가해주세요.
(프로젝트의 마스코트 이미지로 사용됩니다)

### 5. 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
```

브라우저에서 `http://localhost:5173`으로 접속하여 애플리케이션을 확인할 수 있습니다.

## 🏗 프로젝트 구조

```
src/
├── api/                    # API 호출 함수들
│   └── postApi.jsx        # 포스트 관련 API
├── components/            # React 컴포넌트들
│   ├── PostList.jsx      # 포스트 목록 컴포넌트
│   ├── PostDetail.jsx    # 포스트 상세 컴포넌트
│   └── PostForm.jsx      # 포스트 작성/수정 폼
├── context/              # Context API
│   └── SnackbarContext.jsx # 토스트 메시지 관리
├── App.jsx              # 메인 앱 컴포넌트
└── main.jsx            # 앱 진입점
```

## 🔧 사용 가능한 스크립트

- `npm run dev`: 개발 서버 실행
- `npm run build`: 프로덕션 빌드
- `npm run preview`: 빌드된 앱 미리보기
- `npm run lint`: ESLint 실행

## 🌐 API 엔드포인트

백엔드 API와 연동하여 다음 기능들을 사용합니다:

- `GET /api/posts`: 모든 포스트 조회
- `GET /api/posts/{id}`: 특정 포스트 조회
- `POST /api/posts`: 새 포스트 생성
- `PUT /api/posts/{id}`: 포스트 수정
- `DELETE /api/posts/{id}`: 포스트 삭제

## 🚨 문제 해결

### 자주 발생하는 문제들

1. **API 연결 오류**

   - 백엔드 서버가 실행 중인지 확인
   - `.env.development` 파일의 API URL 확인

2. **이미지가 표시되지 않음**

   - `public/main_character.png` 파일이 있는지 확인

3. **npm 설치 오류**

   ```bash
   rm -rf node_modules
   rm package-lock.json
   npm install
   ```

4. **포트 충돌**
   ```bash
   # 다른 포트로 실행
   npm run dev -- --port 3000
   ```

## 📖 백엔드 연동 참고사항

이 프론트엔드는 다음 Spring Boot 컨트롤러 구조를 기반으로 작동합니다:

```java
@RestController
@RequestMapping("/api/posts")
public class PostController {
    @GetMapping
    public ResponseEntity<List<PostDto>> getPosts()

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPost(@PathVariable Long id)

    @PostMapping
    public ResponseEntity<Long> createPost(@RequestBody PostRequest request)

    @PutMapping("/{id}")
    public ResponseEntity<Long> updatePost(@PathVariable Long id, @RequestBody PostRequest request)

    @DeleteMapping("/{id}")
    public ResponseEntity<Long> deletePost(@PathVariable Long id)
}
```

## 🤝 기여하기

1. Fork 프로젝트
2. Feature 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'Add amazing feature'`)
4. 브랜치에 Push (`git push origin feature/amazing-feature`)
5. Pull Request 생성

## 📝 라이센스

이 프로젝트는 MIT 라이센스 하에 있습니다.

## 👨‍💻 개발자

**codingdonny**

- GitHub: [@mooh2jj](https://github.com/mooh2jj)

---

## 📚 참고 문서

- [React 공식 문서](https://reactjs.org/)
- [Vite 공식 문서](https://vitejs.dev/)
- [Material-UI 공식 문서](https://mui.com/)
- [React Router 공식 문서](https://reactrouter.com/)

**즐거운 개발 되세요! 🎉**
