delimiter $$

CREATE DATABASE `scoreboard` /*!40100 DEFAULT CHARACTER SET utf8 */$$

delimiter $$


CREATE TABLE `categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8$$

delimiter $$

CREATE TABLE `questions` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `question` varchar(255) NOT NULL,
  `categoryId` int(11) NOT NULL,
  FOREIGN KEY (categoryId) REFERENCES categories(id)
    ON DELETE CASCADE,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8$$

delimiter $$

CREATE TABLE `answers` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `questionId` int(11) NOT NULL,
  `answer` varchar(255) NOT NULL,
  `isCorrect` tinyint(4) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8$$

