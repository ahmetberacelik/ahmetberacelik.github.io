---
lang: "tr"
projectSlug: "zuga-ida"
title: "ZUGA-İDA"
tagline: "İnsansız otonom deniz aracı"
year: "2026–"
meta: "Takım projesi · Yazılım ekibi yöneticisi · TEKNOFEST 2026 finalisti"
summary: "ZUGA-İDA, insan müdahalesi olmadan yarışma parkurunu geçmek için geliştirdiğimiz bir insansız deniz aracı. Tekne kamerasıyla dubaları görüyor, engellerden kaçarak ilerliyor ve sonunda belirlenen renkteki hedef dubayı bulup ona kamikaze görevi yapıyor."
tags:
  - "Python"
  - "YOLO"
  - "ArduPilot"
  - "MAVLink"
  - "Gazebo"
repos: []
facts:
  - label: "Rol"
    value: "Yazılım ekibi yöneticisi"
  - label: "Sonuç"
    value: "TEKNOFEST 2026 finalisti"
  - label: "Algı"
    value: "YOLO, kamera"
  - label: "Simülasyon"
    value: "Gazebo, ArduPilot SITL"
  - label: "Haberleşme"
    value: "MAVLink"
  - label: "Donanım"
    value: "Jetson Orin Nano"
media:
  - type: "video"
    src: "/media/zuga-ida-deneme-2026-08-12-ilk10sn.mp4"
    alt: "İlk saha denemesi: araç iki sarı duba arasından geçiyor"
    captionTitle: "İlk saha denemesi · 12.08.2026"
    captionSub: "İki sarı duba arasından kaçış"
  - type: "video"
    src: "/media/zuga-ida-yarisma-kamera-yolo-ilk10sn.mp4"
    alt: "Yarışmada araç kamerası: YOLO duba tespiti kutuları"
    captionTitle: "Yarışma · araç kamerası"
    captionSub: "YOLO ile duba tespiti"
  - type: "image"
    src: "zuga-ida-atolye-3-web.jpg"
    alt: "ZUGA-İDA, üstten çapraz açı"
    captionTitle: "ZUGA-İDA"
    captionSub: "Araç, yakın plan"
  - type: "image"
    src: "zuga-ida-atolye-1.jpg"
    alt: "ZUGA-İDA atölyede"
    captionTitle: "ZUGA-İDA"
    captionSub: "Atölye"
  - type: "image"
    src: "zuga-ida-atolye-2.jpg"
    alt: "ZUGA-İDA gövde ve donanım görünümü"
    captionTitle: "ZUGA-İDA"
    captionSub: "Gövde ve donanım"
technicalDetailsTitle: "Teknik ayrıntılar"
technicalDetails:
  - "Haberleşme: Jetson ile Matek H743 seri hat üzerinden MAVLink ile konuşuyor. Tekne GUIDED modda; her 100 ms'de istenen yönde 10-30 m ileriye bir hedef nokta gönderiliyor, dümeni ArduPilot'un kontrolcüsü kırıyor. İlk denediğimiz hız komutu yöntemi teknenin dönmek yerine geri gitmesine yol açtığı için bu yönteme geçtik."
  - "Yön hesabı: GPS'in verdiği yöne potansiyel alandan gelen düzeltme ekleniyor; düzeltme ±45° ile sınırlı, LIDAR son güvenlik kontrolünü yapıyor."
  - "Potansiyel alan: her dubanın etkisi mesafenin karesiyle azalıyor ve YOLO'nun tespit güveniyle ağırlıklanıyor; kenar, engel ve hedef dubalarının katsayıları farklı. Parkurlar arasında geçiş için ayrı bir kural yok: ortam değişince yöntem kendiliğinden uyum sağlıyor, yalnız son parkurda hedef arama moduna geçiliyor."
  - "Bir tasarım dersi: çarpmaları önlemek için önce dubanın önündeki açıyı yasaklayan bir kural (\"yasak koni\") ekledik. Testte bu kuralın GPS hedefini ezip tekneyi parkur dışına çıkardığını görünce kaldırdık; yerine yönü yalnız düzelten, hiçbir zaman ezmeyen üç yumuşak mekanizma koyduk. O günden beri ilkemiz: bir kural hedefi ezmez, yalnız düzeltir."
  - "Algı: YOLO modeli renkten bağımsız eğitildi; renk ayrı bir katmanda, CIE Lab renk uzayındaki ton açısıyla belirleniyor, böylece ışık değişiminden daha az etkileniyor. Jetson üzerinde görüntü işleme saniyede yaklaşık 24 kare çalışıyor."
  - "Mesafe tek kameradan pinhole modeliyle hesaplanıyor: bilinen duba çapı ve ölçerek bulduğumuz odak uzaklığı, tespit kutusunun genişliğine oranlanıyor. 5 m'nin altında LIDAR'a geçiliyor."
  - "LIDAR: yakın mesafede sahte okumalar fark edince kontrollü denemelerle sebebini bulduk (cihazın yüksek yoğunluklu modundaki bir iç yankı) ve standart moda geçtik. Çözünürlük yarıya indi ama ölçüm güvenilir oldu."
  - "Kamikaze onayı: hedefe temas, üç bağımsız kanıttan en az ikisiyle onaylanıyor: LIDAR mesafesi, istenen ve gerçek hız farkı, aracın ilerlememesi."
  - "Bilerek eklemediğimiz: rengi teyit etmek için küçük bir görsel dil modeli (VLM) değerlendirdik. Araştırmada bu modellerin tam da bizim yöntemimizin zorlandığı durumlarda aynı hatayı yaptığını gördük; ikinci bir göz gibi davranmadığı için rafa kaldırdık."
  - "Test: birim ve entegrasyon (1.522 test), bütün parkurlar için uçtan uca simülasyon ve gerçek Jetson'ın ArduPilot'u sürdüğü donanım döngüsü testi. İş mantığı testlerde taklit edilmiyor; testlerin gerçekten hata yakalayıp yakalamadığı, koda bilerek hata yerleştirilerek (mutasyon testi) ölçülüyor. Simülasyon ve gerçek tekne için ayrı ayar dosyaları tutuluyor."
order: 1
featured: true
---

## Benim katkım

- 7 kişilik yazılım ekibini yönettim: iş bölümünü yaptım, teknik kararları ekiple birlikte verdim, ilerlemeyi düzenli raporlarla takip ettim.
- Kamera görüntüsünden dubaları YOLO ile tanıyan, rengini ayırt eden ve uzaklığını tahmin eden görüntü işleme kısmını geliştirdim.
- Teknenin dubalardan kaçınma ve hedefe yönelme kararlarını veren yazılımı potansiyel alan yöntemiyle yazdım.
- Tekne suya inmeden önce her şeyi denediğimiz sanal parkuru Gazebo ve ArduPilot SITL ile kurdum; 1.522 testlik otomatik test paketini oluşturdum.
- Teknenin bilgisayarı ile uçuş kontrol kartı arasındaki MAVLink haberleşmesini kurdum.

## Nasıl çalışıyor

- Kamera, LIDAR ve GPS teknenin çevresini algılıyor.
- Teknenin üstündeki bilgisayar (Jetson Orin Nano) bu bilgilerle nereye gideceğine karar veriyor.
- Motorları ve dümeni, ArduPilot çalıştıran uçuş kontrol kartı (Matek H743) yönetiyor. Bilgisayar karta yalnız "şu yöne git" diyor; motoru nasıl süreceğini kart biliyor.
- Kaçınmanın mantığı potansiyel alan: dubaları mıknatıs gibi düşündük. Engel ve kenar dubaları tekneyi iter, hedef duba çeker; yakındaki duba uzaktakinden çok daha güçlü etki eder. Tekne bu kuvvetlerin toplamına göre yön alır, böylece aynı yöntem bütün parkurlarda çalışır.

## Sahada

- 12 Ağustos 2026'daki ilk gerçek su denemesinde tekne kendi başına dubalardan kaçındı ve kırmızı hedef dubaya kamikaze görevini tamamladı.
- Yarışma günü motor sürücüleri (ESC) arızalandı. Yedek parçayla, ayarları yapılmadan yarışmak zorunda kaldık; tekne hızlı gitti ve parkur kenarındaki duvara çarptı.
- 2027 sezonu için yedekli motor sürücüleri, kıyı ve duvar algısı ve yeni bir kamerayla aynı takımla devam ediyoruz.
