# webGIS
简单的发帖回帖网站
需要安装nodejs、mysql  
设置你在mysql里的用户名称和密码  
在mysql中创建webGISdatabase数据库，并创建以下表：  

    CREATE TABLE `messages` (
      `id` int NOT NULL AUTO_INCREMENT,
      `sender` varchar(50) NOT NULL,
      `receiver` varchar(50) NOT NULL,
      `content` text,
      `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    )  

    CREATE TABLE `posts` (
      `post_id` int NOT NULL AUTO_INCREMENT,
      `post_subject` varchar(255) NOT NULL,
      `post_author` varchar(255) NOT NULL,
      `post_tags` varchar(255) DEFAULT NULL,
      `reply_count` int DEFAULT '0',
      `like_count` int DEFAULT '0',
      `post_content` text,
      `post_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`post_id`)
    )  

    CREATE TABLE `replies` (
      `reply_id` int NOT NULL AUTO_INCREMENT,
      `post_id` int DEFAULT NULL,
      `username` varchar(255) DEFAULT NULL,
      `content` text,
      `parent_reply_id` int DEFAULT NULL,
      `reply_time` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`reply_id`),
      KEY `post_id` (`post_id`),
      KEY `username` (`username`),
      KEY `parent_reply_id` (`parent_reply_id`),
      CONSTRAINT `replies_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`post_id`),
      CONSTRAINT `replies_ibfk_2` FOREIGN KEY (`username`) REFERENCES `users` (`username`),
      CONSTRAINT `replies_ibfk_3` FOREIGN KEY (`parent_reply_id`) REFERENCES `replies` (`reply_id`)
    )  

    CREATE TABLE `sdinfo` (
      `id` int NOT NULL AUTO_INCREMENT,
      `support` varchar(50) DEFAULT NULL,
      `need` varchar(50) DEFAULT NULL,
      `description` varchar(255) DEFAULT NULL,
      `username` varchar(20) DEFAULT NULL,
      `lon` float DEFAULT NULL,
      `lat` float DEFAULT NULL,
      PRIMARY KEY (`id`)
    )  

    CREATE TABLE `users` (
      `id` int NOT NULL AUTO_INCREMENT,
      `username` varchar(50) NOT NULL,
      `password` varchar(255) NOT NULL,
      PRIMARY KEY (`id`),
      UNIQUE KEY `username` (`username`)
    )  
    
请更改webGISlogin-reg中有关数据库连接的内容。
安装nodejs后，在项目文件夹里右键打开终端，输入 node .\webGISlogin-reg 即可运行。然后在浏览器中打开  

    localhost:3001
