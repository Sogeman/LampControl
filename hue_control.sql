-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Erstellungszeit: 22. Jan 2019 um 12:17
-- Server-Version: 10.1.31-MariaDB
-- PHP-Version: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Datenbank: `hue_control`
--

-- --------------------------------------------------------

--
-- Tabellenstruktur für Tabelle `scenes`
--

CREATE TABLE `scenes` (
  `id` bigint(20) NOT NULL,
  `name` varchar(32) NOT NULL,
  `brightness` int(11) DEFAULT NULL,
  `x` float DEFAULT NULL,
  `y` float DEFAULT NULL,
  `rgb` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Daten für Tabelle `scenes`
--

INSERT INTO `scenes` (`id`, `name`, `brightness`, `x`, `y`, `rgb`) VALUES
(1, 'Sonnenaufgang', 153, 0.3946, 0.4495, NULL),
(2, 'Sonnenuntergang', 153, 0.6162, 0.3484, NULL),
(3, 'Lesen', 254, 0.3203, 0.3441, NULL),
(4, 'Entspannen', 180, 0.5514, 0.3601, NULL),
(5, 'Energie', 254, 0.2732, 0.2878, NULL),
(6, 'Sakura', 254, 0.4068, 0.2409, NULL),
(7, 'Gemütlich', 140, 0.3578, 0.4191, NULL),
(8, 'Nachtlicht', 15, 0.6874, 0.3056, NULL),
(9, 'Test', 254, 0.2879, 0.1931, NULL),
(10, 'Test2', 254, 0.4243, 0.1738, 'rgb(149,50,129)'),
(11, 'Test 3', 25, 0.3125, 0.6346, 'rgba(145,201,26,0.1)');

--
-- Indizes der exportierten Tabellen
--

--
-- Indizes für die Tabelle `scenes`
--
ALTER TABLE `scenes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT für exportierte Tabellen
--

--
-- AUTO_INCREMENT für Tabelle `scenes`
--
ALTER TABLE `scenes`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
