# webGIS
简单的发帖回帖网站
在mysql中创建数据库，并创建以下表：  

    CREATE TABLE `messages` (
      `id` int NOT NULL AUTO_INCREMENT,
      `sender` varchar(50) NOT NULL,
      `receiver` varchar(50) NOT NULL,
      `content` text,
      `timestamp` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
      PRIMARY KEY (`id`)
    )  
帖子表
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
回复表
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
需求供应表
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
用户表
    CREATE TABLE `users` (
      `id` int NOT NULL AUTO_INCREMENT,
      `username` varchar(50) NOT NULL,
      `password` varchar(255) NOT NULL,
      PRIMARY KEY (`id`),
      UNIQUE KEY `username` (`username`)
    )  
选项表
    CREATE TABLE `Options` (
      `id` int NOT NULL AUTO_INCREMENT,
      `poll_id` int DEFAULT NULL,
      `text` varchar(255) DEFAULT NULL,
      `vote_count` int DEFAULT NULL,
      PRIMARY KEY (`id`),
      KEY `poll_id` (`poll_id`)
    )
投票主题表
    CREATE TABLE `Polls` (
      `id` int NOT NULL AUTO_INCREMENT,
      `title` varchar(50) DEFAULT NULL,
      `description` varchar(255) DEFAULT NULL,
      `username` varchar(50) DEFAULT NULL,
      `create_date` date DEFAULT NULL,
      `deadline_date` date DEFAULT NULL,
      PRIMARY KEY (`id`),
      KEY `username` (`username`),
      CONSTRAINT `Polls_ibfk_1` FOREIGN KEY (`username`) REFERENCES `users` (`username`)
    )
完善config.txt文件 。
安装nodejs后，在项目文件夹里右键打开终端，输入 node .\webGISlogin-reg 即可运行。
