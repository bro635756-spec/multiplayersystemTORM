# multiplayersystemTORM - Bölüm 1: Giriş ve Mimari Vizyon

> **Proje Kapsamı:** Enterprise Real-Time Multiplayer Server & In-Memory Database Core  
> **Modül:** hs/README.md (Parça 1 / 10)  
> **Sürüm:** 5.0.0-RELEASE

---

## 1.1 Projenin Doğuşu ve Mühendislik Felsefesi
`multiplayersystemTORM`, yüksek frekanslı, düşük gecikmeli (low-latency) gerçek zamanlı çok oyunculu (multiplayer) sistemlerin ihtiyaç duyduğu hız ve kararlılığı sağlamak amacıyla sıfırdan inşa edilmiş kurumsal düzeyde bir ağ çekirdeğidir. Geleneksel veritabanı ve sunucu mimarilerinin oyun dünyasındaki anlık konum senkronizasyonlarında yarattığı disk I/O darboğazlarını ortadan kaldırmak için bellek içi (in-memory) mimariyle tasarlanmıştır.

### Temel Tasarım İlkeleri:
* **Sıfır Gecikme Odaklı Bellek Yönetimi:** Tüm aktif oyuncu verileri disk yerine V8 bellek havuzunda (`Map` yapıları) tutulur.
* **Modüler Mikro-Çekirdek Yapısı:** Ağ katmanı, veritabanı, güvenlik ve yönlendirme modülleri birbirine bağımlı olmadan, bağımsız sınıflar halinde çalışır.
* **Çoklu İstemci Desteği:** Unity WebGL, Standalone ve harici web arayüzleri ile tam uyumlu soket protokolleri barındırır.

---

## 1.2 TORM Ekosisteminin Temel Yapısı
Sistemin omurgası, modüllerin birbirini tamamladığı senkronize bir döngü üzerine kuruludur. Başlangıç aşamasından itibaren her bileşen sırayla devreye girer:
1. **Orkestrasyon:** `Main.js` sistemi ayağa kaldırır ve konfigürasyonları okur.
2. **Alt Sistem Denetimi:** `Main2.js` ek modülleri (kimlik doğrulama, fizik, senkronizasyon) tetikler.
3. **Ağ Dağıtımı:** `www.js` ve `ServerCloud.js` soket ağını dış dünyaya açar.

# multiplayersystemTORM - Bölüm 2: Çekirdek Teknolojiler ve Konfigürasyon Dosyaları

> **Proje Kapsamı:** Enterprise Real-Time Multiplayer Server & In-Memory Database Core  
> **Modül:** hs/README.md (Parça 2 / 10)  
> **Sürüm:** 5.0.0-RELEASE

---

## 2.1 Çalışma Zamanı ve Çalışma Ortamı (Runtime Specifications)
Sistemin kararlı bir şekilde çalışabilmesi için belirli standartlar ve kütüphaneler esas alınmıştır. Bu altyapı, eşzamanlı (asynchronous) işlem kapasitesini maksimumda tutar:
* **Node.js Çekirdeği:** ECMAScript 2022+ standartlarına tam uyumlu, v18.x ve üzeri sürüm desteği.
* **Protokol Katmanı:** Düşük gecikmeli veri akışı için WebSocket, güvenli HTTPS tünelleme ve HTTP/1.1 standardı.
* **Serileştirme Biçimleri:** JSON paket yapıları, `xml2js` kütüphanesi ile işlenen XML ayar dosyaları ve INI formatındaki konfigürasyon profilleri.

---

## 2.2 Konfigürasyon Dosyalarının Detaylı İncelemesi
Sistem genelindeki davranış biçimleri harici konfigürasyon dosyalarıyla yönetilir:
* **`Logging.xml`:** Sistem genelindeki loglama eşiklerini (`DEBUG`/`INFO`), dosya sistemi çıktı hedeflerini ve bellek veritabanı parametrelerini tanımlar.
* **`config.json`:** Düşük seviyeli ağ parametrelerini, sunucu adını, aktif port bağlamalarını ve eşzamanlı maksimum oyuncu kotalarını barındırır.
* **`oks.json`:** Doğrulama bayraklarını, sistem durum göstergelerini (`"status": "OK"`) ve kalp atışı (heartbeat) yoklama aralıklarını yönetir.
* **`webstech.ini`:** Çekirdek motor sürümlerini, çerçeve kısıtlamalarını ve CORS politikasını belirten INI formatındaki meta veri dosyasıdır.

# multiplayersystemTORM - Bölüm 3: Dosya Sistemi Ağacı ve Dizin Mimarisi

> **Proje Kapsamı:** Enterprise Real-Time Multiplayer Server & In-Memory Database Core  
> **Modül:** hs/README.md (Parça 3 / 10)  
> **Sürüm:** 5.0.0-RELEASE

---

## 3.1 Dizin Ağacı Yapısı
Projenin kök dizini ve alt klasörleri, modüller arası bağımlılıkları minimumda tutacak şekilde katmanlı bir yapıda tasarlanmıştır:

```text
multiplayersystemTORM/
├── .github/
│   └── workflows/
│       ├── node.js.yml
│       ├── npm-publish-github-packages.yml
│       └── webpack.yml
├── CorrectingSQLhttpsv5/
│   ├── http.js
│   ├── https.js
│   ├── rootingweb.js
│   └── www.js
├── 3.css
├── 5.css
├── 26.css
├── ClientsIDcreateEQ.js
├── Data.js
├── Database.js
├── DatabaseMeta.log
├── ECMA.txt
├── Forms.js
├── JSON.txt
├── LOI.js
├── LastA.js
├── Logging.xml
├── Main.js
├── Main2.js
├── NodeL.js
├── SQL.js
├── ServerCloud.js
├── askappmla.js
├── config.json
├── index.html
├── index.php
├── İndexPriviteAPİ.js
├── oks.json
└── sharedunity.js
# multiplayersystemTORM - Bölüm 4: Çekirdek Servisler ve Yaşam Döngüsü

> **Proje Kapsamı:** Enterprise Real-Time Multiplayer Server & In-Memory Database Core  
> **Modül:** hs/README.md (Parça 4 / 10)  
> **Sürüm:** 5.0.0-RELEASE

---

## 4.1 Sunucu Başlatma ve Orkestrasyon (`Main.js`, `Main2.js`)
Sistemin ayağa kalkma süreci iki aşamalı bir denetçi mekanizmasıyla yönetilir:
* **`Main.js` (Ana Giriş Noktası):** Asenkron olarak `Logging.xml` dosyasını parse eder, sistem genelindeki loglama seviyelerini yapılandırır ve ağ katmanını tetikleyen ilk tetikleyiciyi (`trigger`) çalıştırır.
* **`Main2.js` (İkincil Denetçi):** Ana çekirdek ayağa kalktıktan sonra devreye girer. Yetkilendirme modüllerini, fizik senkronizasyon durumlarını ve veritabanı köprü bağlantılarını (`database bridge connectors`) arka planda hazır hale getirir.

---

## 4.2 Asenkron Görev Kuyruğu ve Yük Dağıtımı (`askappmla.js`, `NodeL.js`)
* **`askappmla.js`:** Yüksek frekanslı istemci istekleri sırasında oluşabilecek yarış koşullarını (`race conditions`) engellemek amacıyla istekleri sıraya koyan bir asenkron mesaj kuyruğu yöneticisidir.
* **`NodeL.js`:** Küme (cluster) içi yönlendirme mantığını yöneterek gelen bağlantı yükünü worker süreçleri arasında dengeli bir şekilde dağıtır.
# multiplayersystemTORM - Bölüm 5: Bellek İçi Veritabanı ve SQL Motoru

> **Proje Kapsamı:** Enterprise Real-Time Multiplayer Server & In-Memory Database Core  
> **Modül:** hs/README.md (Parça 5 / 10)  
> **Sürüm:** 5.0.0-RELEASE

---

## 5.1 Bellek İçi Depolama Mimarisi (`Database.js`, `Data.js`)
`multiplayersystemTORM`, geleneksel disk tabanlı veritabanlarının getirdiği I/O gecikmelerini aşmak için tamamen V8 bellek alanı üzerinde çalışan özel bir anahtar-değer (key-value) mimarisi kullanır:
* **`Database.js`:** `Map` ve `Set` veri yapılarını kullanarak oyuncu pozisyonlarını, envanter verilerini ve oda durumlarını nano-saniye düzeyinde günceller.
* **`Data.js`:** Sunucu genelindeki global parametreleri, aktif oda sayaçlarını ve protokol tanımlarını merkezi bir havuzda tutar.

---

## 5.2 Hafıza İçi SQL Abstraksiyonu (`SQL.js`)
Dışarıdan bir SQL veritabanı sunucusuna (MySQL/PostgreSQL gibi) ihtiyaç duymaksızın, bellek içinde çalışan hafifletilmiş bir sorgu katmanı sunar:
* Programatik tablo oluşturma ve bellek içi kayıt ekleme süreçlerini yönetir.
* Disk darboğazı yaratmadan hedef kayıtları filtreleme ve indeksleme yeteneği sağlar.

# multiplayersystemTORM - Bölüm 6: Ağ Katmanı, Soketler ve Güvenlik

> **Proje Kapsamı:** Enterprise Real-Time Multiplayer Server & In-Memory Database Core  
> **Modül:** hs/README.md (Parça 6 / 10)  
> **Sürüm:** 5.0.0-RELEASE

---

## 6.1 Gerçek Zamanlı Soket Yönetimi (`ServerCloud.js`, `www.js`)
Ağ haberleşmesinin kalbi, eşzamanlı bağlantıları yöneten Socket.io tabanlı altyapıdır:
* **`ServerCloud.js`:** Oyuncu bağlantı yaşam döngülerini (connection lifecycle) takip eder, uzamsal senkronizasyon paketlerini (spatial sync packets) odalara broadcast eder ve kopma (disconnect) durumlarında bellek temizliğini koordine eder.
* **`www.js`:** Üretim ortamında (production) ağ dağıtımını üstlenerek `ServerCloud` modülünü konfigürasyon dosyalarında belirtilen portlar üzerinden dış dünyaya açar.

---

## 6.2 Güvenli Tünelleme ve HTTP Katmanı (`https.js`, `http.js`)
* **`https.js`:** TLS soket yapılarını ve SSL sertifika konfigürasyon rutinlerini sağlayarak şifrelenmiş ağ trafiğini garanti altına alır.
* **`CorrectingSQLhttpsv5/http.js`:** Hammadde HTTP isteklerini araya girerek (middleware) denetler, başlıkları (headers) temizler, payload verilerini normalize eder ve güvenli yönlendirme sağlar.

# multiplayersystemTORM - Bölüm 7: Yönlendirme, Özel API'ler ve İstemci Köprüsü

> **Proje Kapsamı:** Enterprise Real-Time Multiplayer Server & In-Memory Database Core  
> **Modül:** hs/README.md (Parça 7 / 10)  
> **Sürüm:** 5.0.0-RELEASE

---

## 7.1 Web Yönlendirme ve Özel API Ağ Geçidi (`rootingweb.js`, `İndexPriviteAPİ.js`)
* **`rootingweb.js`:** URL yolu çözümlemelerini yöneten merkezi bir yönlendiricidir. Gelen istekleri ilgili endpoint'lere dağıtır ve geçersiz yollar için hata (fallback) yanıtları üretir.
* **`İndexPriviteAPİ.js`:** Yalnızca yetkilendirilmiş istemcilerin ve dahili servislerin erişebileceği özel REST/WebSocket uç noktalarını barındırır. Güvenlik belirteçlerini doğrular ve canlı sistem durum JSON çıktılarını sunar.

---

## 7.2 Unity İstemci Köprüsü ve Veri Doğrulama (`sharedunity.js`, `ClientsIDcreateEQ.js`, `Forms.js`)
* **`sharedunity.js`:** Unity oyun motorundan gelen ham 3D vektör verilerini ($x, y, z$ pozisyonları, rotasyon açıları ve animasyon durumları) yakalar, sayısal sınırları doğrular ve tek tip yayın paketlerine dönüştürür.
* **`ClientsIDcreateEQ.js`:** Yeni kurulan her soket bağlantısı için çarpışma önleyici, kriptografik olarak güvenli benzersiz oturum tanımlayıcıları (`TORM-timestamp-hash`) üretir.
* **`Forms.js`:** İstemcilerden gelen form verilerini ve girdi isteklerini uzunluk sınırlamalarına, karakter temizliğine ve şema kısıtlamalarına göre denetler.

# multiplayersystemTORM - Bölüm 8: İzleme, Loglama ve Hata Kodları

> **Proje Kapsamı:** Enterprise Real-Time Multiplayer Server & In-Memory Database Core  
> **Modül:** hs/README.md (Parça 8 / 10)  
> **Sürüm:** 5.0.0-RELEASE

---

## 8.1 Etkileşim Günlükleri ve Güvenli Kapanış (`LOI.js`, `LastA.js`, `DatabaseMeta.log`)
* **`LOI.js` (Log of Interactions):** Kullanıcı eylem geçmişlerini ayrıntılı bir şekilde kayda alır ve bellek şişmelerini önlemek için döngüsel tampon (rolling buffer) sınırlarını uygular.
* **`LastA.js`:** Sunucu kapatma komutu (shutdown) tetiklendiğinde bellek içi durumların diske güvenli bir şekilde aktarılmasını ve soket kaynaklarının temiz bir şekilde serbest bırakılmasını sağlar.
* **`DatabaseMeta.log`:** Bellek içi veritabanı yazma işlemlerini, sistem başlangıç olaylarını ve konfigürasyon ayrıştırıcı çıktılarını yakalayan kalıcı düz metin işlem günlüğüdür.

---

## 8.2 Sistem Hata Kodları ve Sorun Giderme Kılavuzu
* **`ERR_TORM_PORT_IN_USE`:** Seçilen port başka bir servis tarafından işgal edilmiştir. `config.json` dosyasından port atamasını güncelleyin.
* **`ERR_TORM_UNAUTHORIZED_PACKET`:** Gelen istemci soketi, `ClientsIDcreateEQ.js` tarafından üretilmiş geçerli bir oturum belirtecine sahip değil.
* **`ERR_TORM_DB_CORRUPTION`:** Bellek içi depolama senkronizasyonu başarısız oldu; `DatabaseMeta.log` yazma izinlerini doğrulayın.

# multiplayersystemTORM - Bölüm 9: Arayüz, Veri Paket Yapıları ve Entegrasyon Senaryoları

> **Proje Kapsamı:** Enterprise Real-Time Multiplayer Server & In-Memory Database Core  
> **Modül:** hs/README.md (Parça 9 / 10)  
> **Sürüm:** 5.0.0-RELEASE

---

## 9.1 Canlı Web Paneli ve Tasarım Katmanı (`İndex.html`, `index.php`, Stil Dosyaları)
* **`İndex.html`:** Socket.io istemci bağlamalarıyla güçlendirilmiş; gerçek zamanlı bağlantı rozetlerini, anlık paket akış loglarını ve sistem telemetrisini gösteren canlı web kontrol panelidir.
* **`index.php`:** Hızlı JSON sağlık yoklamalarına (`health check`) ihtiyaç duyan hibrit altyapılar için tasarlanmış hafif bir PHP durum köprüsüdür.
* **Stil Dosyaları (`3.css`, `5.css`, `26.css`):** Geliştirici dostu koyu tema (`#0d1117`), monospace tipografi, kart düzenleri ve esnek esnek paneller (`flex panels`) sunan modüler CSS stilleridir.

---

## 9.2 Veri Alışveriş Formatı ve Senkronizasyon Akışı (`JSON.txt`)
Tüm uzamsal senkronizasyon çerçeveleri, ağ trafiğini minimumda tutmak için standartlaştırılmış JSON şemasına uyar:

```json
{
  "packet_id": "TORM-9921",
  "player": {
    "id": "Client-01",
    "position": { 
      "x": 12.4, 
      "y": 0.0, 
      "z": -45.2 
    },
    "rotation": { 
      "x": 0, 
      "y": 90, 
      "z": 0 
    },
    "status": "moving"
  }
}

# multiplayersystemTORM - Bölüm 10: Kurulum, CI/CD ve Gelecek Yol Haritası

> **Proje Kapsamı:** Enterprise Real-Time Multiplayer Server & In-Memory Database Core  
> **Modül:** hs/README.md (Parça 10 / 10)  
> **Sürüm:** 5.0.0-RELEASE

---

## 10.1 Kurulum, Başlatma ve Dağıtım Rehberi
Sistemi yerel ortamda veya üretim sunucularında ayağa kaldırmak için adım adım takip edilmesi gereken prosedürler:

### Ön Koşullar:
* **Node.js:** v18.x veya üzeri sürümün sisteminizde kurulu olması gereklidir.
* **NPM:** Paket yönetimi için güncel npm sürümü.

### Adım 1: Deponun Klonlanması
```bash
git clone [https://github.com/bro63576-spec/multiplayersystemTORM.git](https://github.com/bro63576-spec/multiplayersystemTORM.git)
cd multiplayersystemTORM

### Adım 2: Bağımlılıkların Yüklenmesi
Bash:
npm install socket.io xml2js

### Adım 3: Sunucunun Çalıştırılması
Bash:
node Main.js



#10.2 Sürekli Entegrasyon ve Dağıtım (CI/CD GitHub Actions)
#Depo içerisinde .github/workflows/ altında yer alan otomatik iş akışları:

#node.js.yml: Farklı Node.js çalışma zamanı sürümlerinde otomatik derleme ve test scriptlerini koşturur.

#webpack.yml: Ön yüz varlıklarının (frontend assets) paketlenmesini ve optimizasyonunu yönetir.

#npm-publish-github-packages.yml: Kararlı sürümler sonrasında GitHub Packages kayıt defterine otomatik paket yayınlar.

#10.3 Gelecek Yol Haritası (2026 - 2028)
#Faz 1 (Q3 2026): Dağıtık önbellekleme (Distributed Caching) ve Redis durum replikasyon entegrasyonu.

#Faz 2 (Q4 2026): WebRTC tabanlı sesli iletişim ve veri aktarım rölesi.

#Faz 3 (Q1 2027): Kubernetes Helm chart konfigürasyonları ve otomatik küme ölçeklendirme.

#Faz 4 (Q2 2027): Prometheus metrik dışa aktarıcı (/metrics) uç noktası entegrasyonu.

#Faz 5 (Q3/Q4 2027): Unreal Engine 5 ve Godot motorları için yerel C++ / GDScript istemci SDK genişletmeleri.
