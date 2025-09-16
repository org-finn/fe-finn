# 가장 쉽고 직관적인 주식 예측, Articker

## 프로젝트 소개

🌐 웹사이트: https://articker.kr

**Articker**는 Article(뉴스)과 Ticker(종목)의 합성어로, 실시간으로 뉴스를 분석하여 주식 종목의 등락 여부를 예측해 주는 서비스입니다.

**목적**

현재 수많은 투자자들이 주식 시장의 실시간 지표인 뉴스를 참고하여 투자 결정을 내리고 있습니다.

Articker는 이러한 투자자들의 행동 패턴에 착안하여, 복잡한 시장 분석에 어려움을 겪는 주식 초보자들을 위한 프로젝트를 기획했습니다.

따라서 뉴스 수집부터 분석하여 예측하는 전 과정을 자동화함으로써 직관적인 투자 보조 지표를 제공하는 데에 중점을 두고 개발되었습니다.

- Articker는 불가능에 가까운 **정확한 가격**을 맞히려는 접근에서 벗어나, 투자자가 뉴스를 보고 ‘오를까 내릴까’를 **판단하는 과정**에 집중합니다.
- 뉴스의 **긍정/부정** **뉘앙스를 분석하여** **주가 등락 방향성**을 제시합니다.

<img width="2048" height="729" alt="image" src="https://github.com/user-attachments/assets/bfc14155-872b-481f-bf6e-3007d7fe351a" />


## 주요 기능

📍 **실시간 주가 예측**

최신 뉴스를 분석하여 종목별 주가의 방향을 예측하고, 매수/매도 전략을 제시합니다.

📍 **주가 그래프**

종목의 가격 변화를 그래프로 한눈에 확인하고, 주가와 관련 뉴스와의 연관성을 비교 분석할 수 있습니다.

📍 **뉴스보드**

실시간으로 다양한 뉴스들을 읽어볼 수 있습니다. 각 기사의 긍정/부정 감정 분석을 통해 특정 종목에 미칠 영향도를 확인할 수 있습니다.

## 개발 기간

- 2025.07.09 ~
    - 2025.09.15: v1.0.0 배포

## 프로젝트 멤버

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<table>
  <tr>
    <td align="center">
      <b>Frontend</b>
    </td>
    <td align="center">
      <b>Backend</b>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/userjmmm""><img src="https://avatars.githubusercontent.com/u/141299582?v=4" width="80px;" alt=""/><br /><sub><b>이정민</b></sub></a>
    </td>
    <td align="center">
      <a href="https://github.com/anaconda77"><img src="https://avatars.githubusercontent.com/u/62774721?v=4" width="80px;" alt=""/><br /><sub><b>신성민</b></sub></a>
    </td>
  </tr>
</table>
<!-- ALL-CONTRIBUTORS-LIST:END -->

## 기술 스택

- **Front-end**
    - React, Vite, Typescript, pnpm, Axios, TanStack Query, apexcharts
- **Back-end**
    - Kotlin/Spring Boot, Exposed(ORM), PostgreSQL, AWS DynamoDB, Kotest
- **Infra**
    - AWS, Docker
- **CI/CD**
    - GitHub Action

## 아키텍처
### 서비스 아키텍처
<img width="2048" height="1182" alt="image" src="https://github.com/user-attachments/assets/df175c29-c0fc-4ae2-b630-4de6d25a54b4" />
