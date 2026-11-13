---
lang: "tr"
projectSlug: "lifeline"
title: "LifeLine"
tagline: "İnternetsiz çalışan sesli ilk yardım asistanı"
year: "2026"
meta: "Ders projesi · 2 kişilik ekip"
summary: "LifeLine, ne olduğunu sesli anlattığınızda size kısa ilk yardım adımlarını yine sesle söyleyen bir cihaz. Parmağınızı sensöre koyduğunuzda nabzınızı ve kandaki oksijen düzeyini de ölçüp yanıtında hesaba katıyor. İnternete hiç bağlanmıyor; konuşmayı anlayan, yanıtı yazan ve seslendiren yapay zekâ modellerinin hepsi yandaki bilgisayarda çalışıyor. CEN322 Internet of Things (IoT) dersinin final projesi olarak Beyza Aydın ile birlikte geliştirdik."
tags:
  - "ESP32-S3"
  - "ESP-IDF"
  - "FreeRTOS"
  - "Whisper"
  - "Llama 3.2"
repos:
  - label: "Kaynak kod"
    url: "https://github.com/Beyzaydinn/LifeLine"
facts:
  - label: "Tür"
    value: "Ders projesi · 2 kişilik ekip"
  - label: "Donanım"
    value: "ESP32-S3, INMP441, MAX98357A, MAX30102"
  - label: "Cihaz yazılımı"
    value: "C, ESP-IDF, FreeRTOS"
  - label: "Yerel yapay zekâ"
    value: "Faster-Whisper, Llama 3.2, Piper"
  - label: "Haberleşme"
    value: "USB seri hat, CRC16, AES"
  - label: "Çalışma"
    value: "Tamamen internetsiz"
media:
  - type: "image"
    src: "lifeline-devre.jpg"
    alt: "Breadboard üzerinde kurulu LifeLine devresi: ESP32-S3, mikrofon, hoparlör yükselteci, nabız sensörü ve LED halka"
    captionTitle: "LifeLine"
    captionSub: "Breadboard devresi"
    orientation: "portrait"
technicalDetailsTitle: "Teknik ayrıntılar"
technicalDetails:
  - "Donanım: ESP32-S3, INMP441 mikrofon ve MAX98357A hoparlör yükselteci (iki ayrı I2S hattı, 16 kHz), MAX30102 nabız ve oksijen sensörü (I2C), 8 LED'li WS2812B halka."
  - "Cihaz yazılımı: C, ESP-IDF ve FreeRTOS; ses, sensör, LED ve haberleşme ayrı görevlerde çalışıyor, hepsini bir durum makinesi yönetiyor."
  - "Haberleşme: USB üzerinden 921600 baud seri hat. Kendi tasarladığımız ikili çerçeve yapısı: eşleme baytları ve CRC16; ses ve sensör verisi AES ile şifreleniyor."
  - "Nabız ölçümü: ham sinyalden sabit bileşen süzülüyor, tepe noktaları bulunuyor ve nabız, atımlar arası sürelerin ortancasından hesaplanıyor. Parmak yoksa ya da sinyal düzensizse yanlış sayı vermek yerine \"ölçülemedi\" diyor. Açılışta yapay bir 72 atımlık sinyalle kendini sınıyor."
  - "Oksijen: kırmızı ve kızılötesi ışık oranından tahmin ediliyor; tıbbi bir cihazla kalibre edilmedi."
  - "Yapay zekâ: Faster-Whisper (ekran kartında, yoksa işlemcide), Ollama üzerinde Llama 3.2 ve Piper; hepsi yerel, API anahtarı ya da bulut yok."
  - "Neden iki parça: kartta ek bellek olmadığı için modeller cihazda çalışamıyor; cihaz gerçek zamanlı işleri, bilgisayar yapay zekâyı üstleniyor."
order: 3
featured: true
---

## Benim katkım

- Cihazı iki kişi birlikte tasarladık, devreyi kurduk ve sınıfta canlı gösterdik.
- Cihazın üzerindeki yazılımı C ile yazdım: ses kaydı ve çalma, sensör okuma, durum ışıkları ve bilgisayarla haberleşme.
- Nabız ve oksijen ölçümünü sensörün ham ışık verisinden hesaplayan sinyal işleme kısmını geliştirdim.
- Bilgisayar tarafını yazdım: konuşmayı yazıya çeviren, yanıtı üreten ve seslendiren üç yerel modeli birbirine bağlayan uygulama ve arayüzü.

## Nasıl çalışıyor

- Kullanıcı önce parmağını sensöre koyuyor; cihaz nabzı ve oksijen düzeyini ölçüyor.
- Sonra ne olduğunu İngilizce anlatıyor. Cihazdaki mikrofon sesi kaydedip şifreli olarak bilgisayara gönderiyor.
- Bilgisayarda Whisper konuşmayı yazıya çeviriyor, Llama 3.2 ölçümleri de dikkate alarak kısa bir ilk yardım yanıtı yazıyor, Piper bu yanıtı seslendiriyor.
- Ses cihaza geri dönüyor ve hoparlörden çalınıyor. Birkaç saniye içinde yanıt geliyor.
- LED halka sistemin ne yaptığını renkle gösteriyor: bekliyor, dinliyor, düşünüyor, konuşuyor.
- Model ilaç dozu ya da teşhis söylemiyor; yalnız genel ilk yardım adımlarını veriyor. Bu bir ders gösterimi, tıbbi cihaz değil.
