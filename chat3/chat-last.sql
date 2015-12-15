-- phpMyAdmin SQL Dump
-- version 3.4.11.1deb2
-- http://www.phpmyadmin.net
--
-- Servidor: localhost
-- Tiempo de generación: 14-07-2014 a las 14:35:32
-- Versión del servidor: 5.5.31
-- Versión de PHP: 5.4.4-14+deb7u4

SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Base de datos: `chat`
--
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ajax_chat_bans`
--

DROP TABLE IF EXISTS `ajax_chat_bans3`;
CREATE TABLE `ajax_chat_bans3` (
  `userID` int(11) NOT NULL,
  `userName` varchar(64) COLLATE utf8_bin NOT NULL,
  `dateTime` datetime NOT NULL,
  `ip` varbinary(16) NOT NULL,
  PRIMARY KEY (`userID`),
  KEY `userName` (`userName`),
  KEY `dateTime` (`dateTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ajax_chat_invitations`
--

DROP TABLE IF EXISTS `ajax_chat_invitations3`;
CREATE TABLE `ajax_chat_invitations3` (
  `userID` int(11) NOT NULL,
  `channel` int(11) NOT NULL,
  `dateTime` datetime NOT NULL,
  PRIMARY KEY (`userID`,`channel`),
  KEY `dateTime` (`dateTime`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ajax_chat_messages`
--

DROP TABLE IF EXISTS `ajax_chat_messages3`;
CREATE TABLE `ajax_chat_messages3` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `userName` varchar(64) COLLATE utf8_bin NOT NULL,
  `userRole` int(1) NOT NULL,
  `channel` int(11) NOT NULL,
  `dateTime` datetime NOT NULL,
  `ip` varbinary(16) NOT NULL,
  `text` text COLLATE utf8_bin,
  PRIMARY KEY (`id`),
  KEY `message_condition` (`id`,`channel`,`dateTime`),
  KEY `dateTime` (`dateTime`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_bin AUTO_INCREMENT=704 ;

--
-- Volcado de datos para la tabla `ajax_chat_messages`
--


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ajax_chat_online`
--

DROP TABLE IF EXISTS `ajax_chat_online3`;
CREATE TABLE `ajax_chat_online3` (
  `userID` int(11) NOT NULL,
  `userName` varchar(64) COLLATE utf8_bin NOT NULL,
  `userRole` int(1) NOT NULL,
  `channel` int(11) NOT NULL,
  `dateTime` datetime NOT NULL,
  `ip` varbinary(16) NOT NULL,
  `channelSwitch` tinyint(1) NOT NULL DEFAULT '0',
  `newChannel` int(11) NOT NULL,
  `opinionValue` int(11) NOT NULL DEFAULT '4',
  `state` int(11) NOT NULL DEFAULT '0',
  `stateSwitch` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Volcado de datos para la tabla `ajax_chat_online`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `channels`
--

DROP TABLE IF EXISTS `channels3`;
CREATE TABLE `channels3` (
  `id` mediumint(9) NOT NULL,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `current_round_data`
--

DROP TABLE IF EXISTS `current_round_data3`;
CREATE TABLE `current_round_data3` (
  `data` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opinion_changes`
--

DROP TABLE IF EXISTS `opinion_changes3`;
CREATE TABLE `opinion_changes3` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `channelID` int(11) NOT NULL,
  `before` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `client_time` datetime NOT NULL,
  `server_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


DROP TABLE IF EXISTS `opinion_modification3`;
CREATE TABLE `opinion_modification3` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `ronda` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `results`
--

-- DROP TABLE IF EXISTS `results`;
-- CREATE TABLE `results` (
--  `id` int(11) NOT NULL AUTO_INCREMENT,
--  `dateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--  `exp` int(11),
--  `data` text NOT NULL,
--  PRIMARY KEY (`id`)
-- ) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=35 ;

--
-- Volcado de datos para la tabla `results`
--
DROP TABLE IF EXISTS `actual_arguments3`;
CREATE TABLE `actual_arguments3` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT uc_Argument UNIQUE (userID,value)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=35 ;

DROP TABLE IF EXISTS `arguments3`;
CREATE TABLE `arguments3` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `ronda` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  CONSTRAINT uc_Argument UNIQUE (userID,value,ronda)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=35 ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seen_pairs`
--

DROP TABLE IF EXISTS `seen_pairs3`;
CREATE TABLE `seen_pairs3` (
  `one` int(11) NOT NULL,
  `other` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
