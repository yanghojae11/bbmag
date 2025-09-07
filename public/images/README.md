# 야놀자 모텔 클론 - 이미지 디렉토리 구조

## 📁 현재 구조
```
public/
├── logo.svg                    (사이트 로고)
└── images/
    └── categories/
        ├── swedish.svg         (스웨디시 마사지)
        ├── aroma.svg          (아로마 테라피)
        ├── thai.svg           (타이 마사지)
        ├── deep-tissue.svg    (딥티슈)
        ├── hot-stone.svg      (핫스톤)
        ├── spa.svg            (스파 테라피)
        ├── couple.svg         (커플 마사지)
        └── 24hour.svg         (24시간 운영)
```

## 🎨 이미지 플레이스홀더
현재 모든 이미지는 SVG 플레이스홀더로 구성되어 있습니다.
실제 서비스를 위해서는 각 카테고리에 맞는 고품질 이미지로 교체하시기 바랍니다.

## 📝 이미지 교체 방법
1. 해당 SVG 파일을 실제 이미지(JPG, PNG)로 교체
2. 파일명은 동일하게 유지 (확장자만 변경)
3. 권장 크기: 400x300px 이상
4. 최적화된 이미지 사용 권장

## 🔗 참조 경로
- 헤더 로고: `/logo.svg`
- 카테고리 이미지: `/images/categories/[파일명].svg`

## 📌 주의사항
- Next.js의 Image 컴포넌트를 사용하는 경우, public 폴더 내 이미지는 '/' 경로로 접근
- 외부 이미지 사용 시 next.config.js에 도메인 추가 필요