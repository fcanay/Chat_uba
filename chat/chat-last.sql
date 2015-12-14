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

DROP TABLE IF EXISTS `ajax_chat_bans`;
CREATE TABLE `ajax_chat_bans` (
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

DROP TABLE IF EXISTS `ajax_chat_invitations`;
CREATE TABLE `ajax_chat_invitations` (
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

DROP TABLE IF EXISTS `ajax_chat_messages`;
CREATE TABLE `ajax_chat_messages` (
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

INSERT INTO `ajax_chat_messages` (`id`, `userID`, `userName`, `userRole`, `channel`, `dateTime`, `ip`, `text`) VALUES
(697, 2147483647, 'Moderador', 4, 0, '2014-04-23 14:02:47', '\0\0', '/close_experiment'),
(698, 2147483647, 'Moderador', 4, 0, '2014-04-23 14:03:15', '\0\0', '/kick usuario2920'),
(699, 2147483647, 'Moderador', 4, 0, '2014-04-23 14:03:16', '\0\0', '/kick usuario2093'),
(700, 2147483647, 'Moderador', 4, 0, '2014-06-02 12:26:49', '\0\0', '/login usuario0815'),
(701, 2147483647, 'Moderador', 4, 0, '2014-06-02 12:26:51', '\0\0', '/logout admin Timeout'),
(702, 2147483647, 'Moderador', 4, 0, '2014-07-14 14:32:31', '\0\0', '/logout usuario0815 Timeout'),
(703, 2147483647, 'Moderador', 4, 0, '2014-07-14 14:32:32', '\0\0', '/login usuario1613');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ajax_chat_online`
--

DROP TABLE IF EXISTS `ajax_chat_online`;
CREATE TABLE `ajax_chat_online` (
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

INSERT INTO `ajax_chat_online` (`userID`, `userName`, `userRole`, `channel`, `dateTime`, `ip`, `channelSwitch`, `newChannel`, `opinionValue`) VALUES
(2, 'usuario1613', 1, 0, '2014-07-14 14:32:34', '\0\0', 0, 0, 50);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `channels`
--

DROP TABLE IF EXISTS `channels`;
CREATE TABLE `channels` (
  `id` mediumint(9) NOT NULL,
  `name` varchar(64) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `current_round_data`
--

DROP TABLE IF EXISTS `current_round_data`;
CREATE TABLE `current_round_data` (
  `data` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `opinion_changes`
--

DROP TABLE IF EXISTS `opinion_changes`;
CREATE TABLE `opinion_changes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userID` int(11) NOT NULL,
  `channelID` int(11) NOT NULL,
  `before` int(11) NOT NULL,
  `value` int(11) NOT NULL,
  `client_time` datetime NOT NULL,
  `server_time` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 AUTO_INCREMENT=1 ;


DROP TABLE IF EXISTS `opinion_modification`;
CREATE TABLE `opinion_modification` (
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

DROP TABLE IF EXISTS `results`;
CREATE TABLE `results` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dateTime` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `exp` int(11),
  `data` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 AUTO_INCREMENT=35 ;

--
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `seen_pairs`
--

DROP TABLE IF EXISTS `seen_pairs`;
CREATE TABLE `seen_pairs` (
  `one` int(11) NOT NULL,
  `other` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
