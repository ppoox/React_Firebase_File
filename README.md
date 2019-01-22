## React와 Firebase의 storage를 이용한 File upload와 download


**시작 :**      
  config 폴더의 firebaseConfig.js에 본인 파이어베이스 콘솔의 웹프로젝트 정보 입력      
  참고 => [https://firebase.google.com/docs/web/setup]   


**upload :**   
   upload시에 인증이 필요하지만 여기서는 인증을 미구현했기 때문에   
   본인 파이어베이스 콘솔의 스토리지에서 규칙을 모두 허용으로 수정    
   (스토리지 들어가면 왼쪽 상단 드로우 메뉴 옆에서 수정)     
   참고 => [https://firebase.google.com/docs/storage/security/start#sample-rules]

**download :**    
download시의 cors 설정    
            gstuil 설치 링크 [https://cloud.google.com/storage/docs/gsutil_install]   
        설치후 config 폴더의 cors.json 실행 ->     
        파일 있는 디렉토리에서 콘솔창에서 gsutil cors set cors.json gs://[your-cloud-storage-bucket] 입력     
        [your-cloud-storage-bucket]은 본인 스토리지내 중앙 상단에 gs://~~~~~ 적혀있음   
        "origin"란에 http://localhost:3000 은 로컬 도메인으로 접근 제한하겠다는 뜻    
        ["*"] 으로 모든 도메인 접근 허용이나 원하는 도메인 입력으로 접근 제한 가능     
       참고 => [https://firebase.google.com/docs/storage/web/download-files]     

