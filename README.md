# 홍길동 포트폴리오 사이트

Figma 시안(랜딩페이지 시안 · 케이스 스터디 시안)을 바탕으로 만든 정적 웹사이트예요.
빌드 도구 없이 HTML · CSS · JS만 사용해서, 파일을 그대로 올리면 바로 동작해요.

## 폴더 구조

```
portfolio-site/
├─ index.html          홈 (EXPLORE 모드)
├─ work/
│  └─ hangki.html      케이스 스터디 01 — 한끼 (READ 모드)
├─ css/style.css       공통 스타일 (무드보드 컬러 · 서체 변수)
├─ js/main.js          인터랙션
└─ assets/             이력서 PDF · 이미지를 넣을 폴더
```

## 미리 보기

`index.html`을 브라우저로 열면 돼요. 서체는 Google Fonts에서 불러오니 인터넷이 연결되어 있어야 해요.

## 들어 있는 기능

- 반응형: 데스크톱 1440 기준, 860px 이하에서 모바일 레이아웃
- 홈: 흐르는 띠 텍스트(마퀴), 작업 목록 호버 + 'VIEW' 커서(마우스 사용 시), 이메일 복사
- 케이스 스터디: 30초 요약 카드, 읽는 위치를 따라가는 목차와 진행 막대, A/B 비교 토글, Before/After 슬라이더, 모바일 화면 캐러셀
- 접근성: 본문 건너뛰기 링크, 키보드 포커스 표시, '동작 줄이기' 설정 시 모든 모션 끔

## 바꿔야 할 것 (TODO)

| 항목 | 위치 |
|---|---|
| 이력서 PDF | `assets/resume.pdf` 파일 추가 |
| 이메일 (가상 주소 `gildong.hong@example.com`) | `index.html`의 mailto 링크와 `data-copy` 값 |
| LinkedIn · GitHub 주소 | `index.html` Contact 섹션 |
| 이미지 자리(`.ph`) | `<div class="ph">`를 `<img src="..." alt="...">`로 교체 |
| 02~05 케이스 스터디 | `work/hangki.html`을 복사해 내용 교체 후, 홈 목록의 `준비 중`을 링크로 변경 |
| '제작 과정' 페이지 | How I built this 섹션의 버튼 연결 |

## 배포

**GitHub Pages**
1. GitHub에 새 저장소를 만들고 이 폴더의 파일을 올려요.
2. Settings → Pages → Branch를 `main` / `(root)`로 저장해요.
3. 잠시 후 `https://아이디.github.io/저장소이름/` 주소로 공개돼요.

**Vercel**
1. vercel.com에서 GitHub 저장소를 Import 해요.
2. Framework Preset은 `Other`, 빌드 설정은 비워 두고 Deploy를 눌러요.
