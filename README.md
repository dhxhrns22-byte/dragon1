# 🐉 Dragon's Nest (드래곤의 둥지)

던전 경영 시뮬레이션 게임 - 던전을 건설하고 침입자를 방어하세요!

## 📋 프로젝트 소개

'Dragon's Nest'는 '둥지 짓는 드래곤' 스타일의 던전 경영 시뮬레이션 게임입니다.
플레이어는 드래곤이 되어 던전을 건설하고, 함정과 몬스터를 배치하여 침입하는 모험가들을 막아야 합니다.

### 핵심 재미 요소
- **던전 건설**: 방을 확장하고 함정/몬스터를 전략적으로 배치
- **침입자 방어**: 모험가들의 침입을 막고 보물을 지키기

## 🎮 게임 플레이

### 게임 진행 단계
1. **건설 페이즈 (Build Phase)**
   - 소지금으로 방 확장
   - 몬스터/함정 배치

2. **침입 페이즈 (Invasion Phase)**
   - 모험가들이 던전에 침입
   - 함정 발동 및 전투 발생

3. **결과 페이즈 (Result Phase)**
   - 방어 성공/실패 정산
   - 자원 획득

## 🛠️ 기술 스택

### 현재 구현 (Web Version)
- **언어**: JavaScript (HTML5/CSS3)
- **렌더링**: Canvas API
- **스타일**: 레트로 픽셀 스타일

### 계획된 구현 (Java Version)
- **언어**: Java 17+
- **엔진**: LibGDX 또는 JavaFX
- **데이터 저장**: JSON (Gson)

## 🎯 핵심 시스템

### 던전 시스템
- **DungeonMap**: 격자 기반 맵 관리
- **Room Types**:
  - `TrapRoom`: 함정 방 (데미지, 디버프)
  - `MonsterRoom`: 몬스터 대기 방 (전투)
  - `ResourceRoom`: 자원 생산 방

### 유닛 시스템
- **Monster (아군)**: 공격 애니메이션, 배치 비용
- **Adventurer (적군)**: 침입 목표, 공포도 수치

## 📂 프로젝트 구조

```
dragon_nest_java/
├── index.html              # 메인 HTML 파일
├── css/
│   └── style.css          # 스타일시트
├── js/
│   ├── main.js            # 메인 진입점
│   ├── game.js            # 게임 루프 및 상태 관리
│   ├── dungeon.js         # 던전 맵 및 방 관리
│   ├── combat.js          # 전투 시스템
│   ├── effects.js         # 시각 효과
│   ├── input.js           # 입력 처리
│   └── utils.js           # 유틸리티 함수
└── implementation_plan.md  # 구현 계획서
```

## 🚀 실행 방법

1. 저장소 클론
```bash
git clone https://github.com/dhxhrns22-byte/dragon1.git
cd dragon1
```

2. 웹 서버로 실행 (Live Server 권장)
```bash
# VS Code의 Live Server 확장 사용 또는
# Python HTTP 서버
python -m http.server 8000
```

3. 브라우저에서 `index.html` 열기

## 📈 개발 단계

- [x] **1단계**: 맵 렌더링 및 함정 설치 기능
- [x] **2단계**: 적 침입 및 함정 데미지 로직
- [x] **3단계**: 몬스터 배치 및 자동 전투
- [ ] **4단계**: UI/UX 개선 및 추가 기능

## 🎨 특징

- 다크 던전 분위기의 비네트 효과
- 레트로 픽셀 스타일 그래픽
- 실시간 전투 시스템
- 전략적 배치 시스템

## 📝 라이선스

이 프로젝트는 개인 학습 및 포트폴리오 목적으로 개발되었습니다.

## 👤 개발자

- **GitHub**: [@dhxhrns22-byte](https://github.com/dhxhrns22-byte)
- **Email**: dhxhrns22@gmail.com

---

Made with 🐉 by dhxhrns22-byte
