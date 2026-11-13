---
lang: "tr"
projectSlug: "smart-campus"
title: "Smart Campus"
tagline: "Akıllı kampüs yönetim sistemi"
year: "2025"
meta: "Ders projesi · 4 kişilik ekip · Ekip yönetimi, backend ve veritabanı"
summary: "Smart Campus, bir üniversitenin günlük işlerini tek yerde toplayan bir web uygulaması: ders kaydı ve notlar, yoklama, yemekhane ve kampüs etkinlikleri. Web ve Mobil Programlama dersinin dönem projesi olarak 4 kişilik bir ekiple geliştirdik."
tags:
  - "Java"
  - "Spring Boot"
  - "React"
  - "TypeScript"
  - "Docker"
repos:
  - label: "Kaynak kod (Backend)"
    url: "https://github.com/ahmetberacelik/smart-campus-backend"
  - label: "Kaynak kod (Frontend)"
    url: "https://github.com/ahmetberacelik/smart-campus-frontend"
  - label: "Kaynak kod (Veritabanı)"
    url: "https://github.com/ahmetberacelik/smart-campus-database"
facts:
  - label: "Tür"
    value: "Ders projesi · 4 kişilik ekip"
  - label: "Rol"
    value: "Ekip yönetimi, backend ve veritabanı"
  - label: "Backend"
    value: "Java 17, Spring Boot 3.2"
  - label: "Veritabanı"
    value: "MySQL 8, JPA"
  - label: "Arayüz"
    value: "React 18, TypeScript, Vite"
  - label: "Dağıtım"
    value: "Docker, DigitalOcean"
media: []
technicalDetailsTitle: "Teknik ayrıntılar"
technicalDetails:
  - "Mimari: Spring Cloud Gateway arkasında beş Spring Boot servisi (Java 17, Spring Boot 3.2). Servisler Docker Compose ile birlikte ayağa kalkıyor."
  - "Güvenlik: Spring Security, JWT ve yenileme tokenı, rol tabanlı yetkilendirme, e-posta doğrulama ve şifre sıfırlama."
  - "Veritabanı: MySQL 8 ve JPA; şema sürümlü göç dosyalarıyla yönetiliyor."
  - "Yoklama: mesafe Haversine formülüyle hesaplanıyor; izin verilen yarıçap varsayılan 15 metre ve oturum bazında ayarlanabiliyor. QR kod 5 saniyede bir yenileniyor, sunucu süresi geçmiş kodu kabul etmiyor. Devamsızlığı %30'u geçen öğrenciye haftalık uyarı gidiyor."
  - "Ders kaydı: önkoşullar zincirleme kontrol ediliyor (önkoşulun önkoşulu dahil)."
  - "Arayüz: React 18, TypeScript ve Vite; harita için Leaflet, grafikler için Recharts."
  - "Dosyalar ve e-posta: DigitalOcean Spaces ve SMTP."
order: 2
featured: true
---

## Benim katkım

- 4 kişilik ekibi yönettim: işi parçalara böldüm, görevleri dağıttım ve parçaların birbirine uymasını takip ettim.
- Backend'in neredeyse tamamını yazdım: kimlik doğrulama, akademik işler, yoklama, yemek ve etkinlik için beş ayrı servis ve bunların önündeki API geçidi.
- Veritabanını tasarladım: 25 adımlık sürümlü şema, örnek veriler ve kurulum betikleri.
- Sistemi Docker ile paketleyip DigitalOcean üzerinde yayına aldım.

## Nasıl çalışıyor

- Öğrenci, öğretim üyesi ve yönetici ayrı yetkilerle giriş yapıyor; herkes yalnız kendi işine ait ekranları görüyor.
- Öğrenci derse kaydolurken sistem kontenjanı, önkoşul derslerini ve ders programı çakışmasını kendisi kontrol ediyor. Notlar girildiğinde harf notu ve ortalama hesaplanıyor, transkript PDF olarak alınabiliyor.
- Yoklamayı öğretim üyesi dersliğin konumuyla açıyor. Öğrenci telefonundan katıldığında sistem aradaki mesafeyi ölçüyor ve yalnız dersliğe yeterince yakın olanları kabul ediyor. İkinci yol, tahtaya yansıtılan ve birkaç saniyede bir değişen QR kod.
- Yemekhanede öğrenci öğününü önceden ayırtıyor; ücret cüzdanından düşüyor ya da burs hakkı kullanılıyor. Girişte rezervasyonun QR kodu okutuluyor.
- Etkinliklerde kontenjan dolunca yeni başvurular yedek listeye alınıyor; biri vazgeçince sıradaki kişi otomatik olarak kayda geçiyor.
