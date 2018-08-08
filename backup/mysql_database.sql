-- phpMyAdmin SQL Dump
-- version 4.5.4.1deb2ubuntu2
-- http://www.phpmyadmin.net
--
-- Client :  localhost
-- Généré le :  Sam 21 Juillet 2018 à 20:56
-- Version du serveur :  5.7.22-0ubuntu0.16.04.1
-- Version de PHP :  7.0.30-0ubuntu0.16.04.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `takadmin`
--
CREATE DATABASE IF NOT EXISTS `takadmin` DEFAULT CHARACTER SET latin1 COLLATE latin1_swedish_ci;
USE `takadmin`;

-- --------------------------------------------------------

--
-- Structure de la table `trashOwner`
--

DROP TABLE IF EXISTS `trashOwner`;
CREATE TABLE `trashOwner` (
  `id` int(11) NOT NULL,
  `serialNumber` varchar(15) NOT NULL,
  `userId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Contenu de la table `trashOwner`
--

INSERT INTO `trashOwner` (`id`, `serialNumber`, `userId`) VALUES
(1, '100PRO', 11),
(2, '102PRO', 11),
(3, '105PRO', 11),
(4, '104PRO', 11),
(5, '120PRO', 11),
(6, '109PRO', 11),
(7, '117PRO', 11),
(8, '118PRO', 11),
(9, '113PRO', 11),
(10, '116PRO', 11),
(11, '127PAR', 5),
(12, '101PAR', 1),
(13, '106PAR', 1),
(14, '108PAR', 2),
(15, '111PAR', 2),
(16, '107PAR', 3),
(17, '112PAR', 3),
(18, '191PAR', 4),
(19, '128PAR', 5),
(20, '124PAR', 5),
(21, '176PAR', 6),
(22, '178PAR', 7),
(23, '181PAR', 7),
(24, '183PAR', 7),
(25, '184PAR', 7),
(26, '185PAR', 8),
(28, '189PAR', 9),
(29, '196PAR', 10),
(30, '197PAR', 10),
(55, '374PAR', 79),
(57, '377PAR', 79),
(58, '440PAR', 16),
(59, '445PAR', 16),
(60, '315PRO', 31),
(61, '320PRO', 31),
(62, '585PAR', 85);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstname` varchar(255) DEFAULT NULL,
  `lastname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `address_diffusion` tinyint(1) NOT NULL DEFAULT '0',
  `address` varchar(255) DEFAULT NULL,
  `zip_code` int(11) DEFAULT NULL,
  `city` varchar(150) DEFAULT NULL,
  `permission` varchar(25) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `users`
--

INSERT INTO `users` (`id`, `firstname`, `lastname`, `email`, `password`, `createdAt`, `address_diffusion`, `address`, `zip_code`, `city`, `permission`) VALUES
(1, 'Alphonse', 'de la Rose', 'lol@lol.com', '$2a$08$W0BXmYW7AW.m7G4qM/7lf.FSv8beq9xYlAY3FnGvusiTGU4JYnJ8i', '2018-05-30 15:48:19', 0, '7, Place Napoléon', 59130, 'LAMBERSART', ''),
(2, 'Sandy', 'Valentino', 'olo@ol.com', '$2a$08$Nzu1u0Thdq6gd8H5qYzQ/uH7cNJtcUSinqTB0L.EU373H9cuEa3tu', '2018-05-31 08:54:34', 0, '22, rue Descartes', 67200, 'STRASBOURG ', ''),
(3, 'Jean', 'ValJean', 'dazdas@zdz.com', '$2a$08$v0Qgu.qoGU6YkiMEtaD2XO27jDfXz5jvWfsFDb.EnYoE39mIRKEq.', '2018-05-31 09:03:06', 0, '79, rue Saint Germain', 91190, 'GIF-SUR-YVETTE ', ''),
(4, 'Jean', 'Bono', 'dfdd@zdz.com', '$2a$08$Gh6uvy62ok09gcyisLlxR.MZrnMVury2f2gFy51ZeQHMvPZ0gSuo6', '2018-05-31 09:07:46', 0, '66, Chemin Des Bateliers', 49100, 'ANGERS ', ''),
(5, 'Adéle', 'Mimosa', 'popo@popo.com', '$2a$08$78QZRRTYfqw2prvie41jNOPFYuWZAhCQ7b2.ocS1D97cY25J6iAQ.', '2018-05-31 09:59:28', 0, '27, rue Léon Dierx', 14100, 'LISIEUX ', ''),
(6, 'Geneviève', 'Givry', 'Genevieve@givry.com', 'abracadabra', '2018-05-31 09:59:28', 0, '35, rue Beauvau', 13002, 'MARSEILLE', ''),
(7, 'Christelle', 'Pitre', 'christelle@pitre.com', 'poupoupidou', '2018-05-31 09:59:28', 1, '58, rue Jean-Monnet', 95500, 'GONESSE', 'utilisateur'),
(8, 'Michèle', 'Bordeaux', 'michele@bordeaux.com', 'yallah', '2018-05-31 09:59:28', 0, '85, avenue Ferdinand de Lesseps', 38100, 'GRENOBLE', ''),
(9, 'Melisande', 'Achin', 'melisande@achin.com', 'alooooaa', '2018-05-31 09:59:28', 0, '3, boulevard Albin Durand', 71100, 'CHALON-SUR-SAÔNE ', ''),
(11, NULL, NULL, 'hotel@3.stars', 'hotel', '2018-06-20 10:15:00', 0, '5, place de la victoire', 33000, 'BORDEAUX', ''),
(12, 'dev', 'team', 'dev@team.wcs', '$2b$10$bM.NixrgW6AvrEEZXsqPGOH7SId56.0D82m6EuRnRyF3iB/JLv/xS', '2018-06-25 16:54:20', 0, NULL, NULL, NULL, 'administrateur'),
(13, 'baptiste', 'ivaldi-brunel', 'baptiste@taka.com', '$2b$10$Lx7iQTndMNcuz3s3psBOrebLfEK7enmaF/ZIpbrm5h2dkiur3V7lq', '2018-06-25 16:54:20', 0, NULL, NULL, NULL, 'administrateur'),
(16, 'maurice', 'bellecourt', 'maurice.bellecourt@free.fr', '$2b$10$ltO55EUkZToE6Ixjfg.nOuqoCqWkt63VNOH9rQH8hDH.LTy0TuNPK', '2018-07-04 10:31:13', 1, '75, route de la maison', 57750, 'Montreuil', 'professionnel'),
(31, 'leon', 'debruxelle', 'leon@bruxelle.com', '$2b$10$v0nTOHg3YG33T1LRYqVPCOkdYggy46rvKza5GzOz9v3/m/9DH.3L2', '2018-05-30 13:48:19', 1, 'chocolaterie de bruges', 37628, 'Pekin', 'professionnel'),
(45, 'coralie', 'Broteilles', 'coco@wcs.fr', '$2b$10$Bq7Q5jHKff2flZqWWW6p1.G/AuTG.TOcJqb8mV/z7fOojuPJJYnXe', '2018-07-11 20:34:42', 0, NULL, NULL, NULL, 'administrateur'),
(47, 'simon', 'rulquin', 'sim@rul.com', '$2b$10$kD5TyoKiBPj.xNs72TL/1utScUMwrrsw49hi8R.7Ue5SObE5h66Hu', '2018-07-11 20:44:47', 0, NULL, NULL, NULL, 'administrateur'),
(48, 'benjamin', 'seurin', 'benjo@prof.fr', '$2b$10$73nWD7r8wPljJMKhw8yuYO3TashYeBOZkAYkvr7KqgroXDmm1r0Zm', '2018-07-11 20:47:38', 0, NULL, NULL, NULL, 'administrateur'),
(49, 'jeremy', 'Roulon', 'jerem@veggy.com', '$2b$10$tTv.MqlP0lHGANzUQoccwu7yG6UPvaM60/NSrE7t9h0x/KW.TK7iC', '2018-07-11 21:30:06', 0, NULL, NULL, NULL, 'administrateur'),
(52, 'valentin', 'bouzin', 'val@bz.fr', '$2b$10$R7dFni0UFDrjyl8r/Hl6uur1ER.CIKSuRcz6./zZBC5AxXiq3/fCG', '2018-07-12 13:41:34', 0, NULL, NULL, NULL, 'administrateur'),
(71, 'Sainte', 'Estelle', 'est@elle.com', '$2b$10$FwPxlzIMWy/RtXAEgkt5huNLKTDRNTrhYD0VjatvWDU4wsRvH7ZoG', '2018-07-12 15:00:42', 0, NULL, NULL, NULL, 'administrateur'),
(85, 'bob', 'morane', 'bob@morane.fr', '$2b$10$b1gs6kuQR.Z/C3.k16mIpOha5dgFrg1Q9/2ywVv60fNaCqNHa0IJK', '2018-05-30 13:48:19', 0, '3 route de lille', 75016, 'PARIS', 'particulier');

--
-- Index pour les tables exportées
--

--
-- Index pour la table `trashOwner`
--
ALTER TABLE `trashOwner`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `trashOwner`
--
ALTER TABLE `trashOwner`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=63;
--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=92;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
