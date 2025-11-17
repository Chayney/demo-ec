# ECサイト  
laravelAPIとReactのViteを繋いだ環境です。   

## 認証方式  
JWTトークン認証  
https://manabupanda.net/practice_web_programming/php_laravel/laravel-react-jwt-authentication/  

フロントエンドはlocalStorageでトークンを保持  

## 技術構成  
### フロントエンド  
・typescript  
・react  
・react-dom  
・react-route  
・react-hook-form  
・zod  
・storybook  
・ESlint  
・Prettier  
・vitest  
・testing library  
・github actions  
・@hookform/resolvers  
・@tanstack/react-query  
・@fortawesome/react-fontawesom  
・@fortawesome/free-solid-svg-icons  

### バックエンド  
・laravel  
・tymon/jwt-auth  

### その他  
・mysql  
・docker  

## 環境構築

### コマンドライン上
$git clone https://github.com/Chayney/demo-ec.git    
$docker-compose up -d --build  
$docker-compose exec php bash

### PHPコンテナ内
$composer install

### laravel上
$cp .env.example .env

### PHPコンテナ内
$php artisan key:generate  
$php artisan jwt:secret  
$php artisan migrate  
$php artisan db:seed  
$php artisan storage:link  

### クロスオリジン  
config/cors.php  
'allowed_origins' => ['http://localhost:5173']  

### react上  
$cp .env.example .env  

## ダミーユーザー  
・email: test@example.com  
・password: password  

## URL
・laravel-api: http://localhost/api/products    
・phpMyAdmin: http://localhost:8080  
・ユーザー登録ページ: http://localhost:5173/signup  
・ユーザーログインページ: http://localhost:5173/signin  
・商品一覧ページ: http://localhost:5173/products  
