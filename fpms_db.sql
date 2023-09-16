-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 07, 2023 at 11:42 AM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fpms_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `crops`
--

CREATE TABLE `crops` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `farm_id` bigint(20) UNSIGNED NOT NULL,
  `crop_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `planting_date` datetime NOT NULL,
  `harvest_date` datetime NOT NULL,
  `expected_product` int(11) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `crops`
--

INSERT INTO `crops` (`id`, `farm_id`, `crop_name`, `planting_date`, `harvest_date`, `expected_product`, `created_at`, `updated_at`) VALUES
(44, 6, 'maharageee', '2023-02-02 00:00:00', '2023-05-02 00:00:00', 45, '2023-06-23 06:28:29', '2023-06-23 06:28:29'),
(45, 6, 'mahindi', '2023-02-02 00:00:00', '2023-05-02 00:00:00', 45, '2023-06-23 06:30:06', '2023-06-23 06:30:06'),
(46, 6, 'rice', '2023-02-02 00:00:00', '2023-05-02 00:00:00', 45, '2023-06-23 06:31:23', '2023-06-23 06:31:23'),
(49, 3, 'rice', '2023-04-02 00:00:00', '2023-04-02 00:00:00', 3, '2023-06-23 14:46:20', '2023-06-23 14:46:20');

-- --------------------------------------------------------

--
-- Table structure for table `equipment`
--

CREATE TABLE `equipment` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `input_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `equipment`
--

INSERT INTO `equipment` (`id`, `user_id`, `input_id`, `quantity`, `created_at`, `updated_at`) VALUES
(3, 3, 3, '12', '2023-06-22 09:55:46', '2023-06-22 09:57:48'),
(4, 3, 4, '6', '2023-06-22 09:57:56', '2023-06-22 09:57:56'),
(19, 2, 19, '13', '2023-06-25 15:13:40', '2023-06-25 15:14:03'),
(20, 3, 20, '1', '2023-06-25 15:16:54', '2023-06-25 15:16:54');

-- --------------------------------------------------------

--
-- Table structure for table `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `farmers`
--

CREATE TABLE `farmers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `owned_land_size` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `farms`
--

CREATE TABLE `farms` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `size` decimal(10,2) NOT NULL,
  `location` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `land_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `farms`
--

INSERT INTO `farms` (`id`, `user_id`, `name`, `size`, `location`, `land_title`, `created_at`, `updated_at`) VALUES
(3, 2, 'nothern estate land 1', '12.00', 'mbeya', 'TZA Patent No. TZ123451', '2023-06-08 18:22:17', '2023-06-23 12:18:37'),
(4, 3, 'RAPH ESTATE', '7.00', 'morogoro', 'TZ 12345', '2023-06-16 07:14:04', '2023-06-16 07:14:33'),
(6, 2, 'solo estate', '9.00', 'mbeya', 'TZ1212345', '2023-06-23 03:59:35', '2023-06-23 03:59:35'),
(11, 8, 'solo estate', '67.00', 'mbeya', 'TZA Patent no TZ121212', '2023-06-26 02:56:16', '2023-06-26 02:56:16'),
(12, 1, 'mpunga', '70.00', 'mbeya', '12335616', '2023-07-03 14:56:17', '2023-07-03 14:56:17');

-- --------------------------------------------------------

--
-- Table structure for table `farm_assigments`
--

CREATE TABLE `farm_assigments` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `worker_id` bigint(20) UNSIGNED NOT NULL,
  `farm_id` bigint(20) UNSIGNED NOT NULL,
  `task_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `time_start` datetime NOT NULL,
  `time_assigned` datetime NOT NULL,
  `time_complished` datetime DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `farm_assigments`
--

INSERT INTO `farm_assigments` (`id`, `worker_id`, `farm_id`, `task_name`, `status`, `time_start`, `time_assigned`, `time_complished`, `created_at`, `updated_at`) VALUES
(2, 2, 3, 'inspect', 'incomplete', '2023-06-09 00:00:00', '2023-06-16 00:00:00', '2023-06-09 00:00:00', '2023-06-08 18:35:50', '2023-06-08 18:55:51'),
(7, 6, 6, 'Plant', 'in progress', '2023-06-23 00:00:00', '2023-06-30 00:00:00', NULL, '2023-06-23 14:23:37', '2023-06-23 14:23:37');

-- --------------------------------------------------------

--
-- Table structure for table `inputs`
--

CREATE TABLE `inputs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `inputs`
--

INSERT INTO `inputs` (`id`, `name`, `created_at`, `updated_at`) VALUES
(3, 'mpin', '2023-06-22 09:55:46', '2023-06-22 09:55:46'),
(4, 'mpini', '2023-06-22 09:57:56', '2023-06-22 09:57:56'),
(6, 'jembe la mkono', '2023-06-23 03:40:22', '2023-06-23 03:40:47'),
(19, 'trector', '2023-06-25 15:13:40', '2023-06-25 15:13:40'),
(20, 'trector', '2023-06-25 15:16:54', '2023-06-25 15:16:54'),
(21, 'trector', '2023-06-25 15:21:27', '2023-06-25 15:22:18');

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_resets_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2023_03_28_145014_create_roles_table', 1),
(6, '2023_03_28_145401_create_farmers_table', 1),
(7, '2023_03_28_202751_create_workers_table', 1),
(8, '2023_03_28_205014_create_worker_referees_table', 1),
(9, '2023_03_28_210339_create_farms_table', 1),
(10, '2023_03_28_211136_create_farm_assigments_table', 1),
(11, '2023_03_28_212043_create_inputs_table', 1),
(12, '2023_03_28_212721_create_owner_inputs_table', 1),
(13, '2023_03_28_213520_create_equipment_table', 1),
(14, '2023_05_14_095009_create_crops_table', 1),
(15, '2023_05_14_122743_create_products_table', 1);

-- --------------------------------------------------------

--
-- Table structure for table `owner_inputs`
--

CREATE TABLE `owner_inputs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `farm_id` bigint(20) UNSIGNED NOT NULL,
  `input_id` bigint(20) UNSIGNED NOT NULL,
  `quantity` int(11) NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(2, 'App\\Models\\User', 1, 'API token of', '306d2951e8dcd2f6a97d672f45bed910579fc736691b3975a98a7181372738a4', '[\"*\"]', NULL, NULL, '2023-07-03 14:59:00', '2023-07-03 14:59:00'),
(3, 'App\\Models\\User', 2, 'API token of', '3acb8187127df06a625e6fc551af35df0c96617e10ce76b15f802863b3cece4f', '[\"*\"]', '2023-07-06 20:23:56', NULL, '2023-07-06 20:23:48', '2023-07-06 20:23:56');

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `crop_id` bigint(20) UNSIGNED NOT NULL,
  `farm_id` bigint(20) UNSIGNED NOT NULL,
  `product_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `harvest_date` datetime NOT NULL,
  `quantity` int(11) NOT NULL DEFAULT 0,
  `status` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `crop_id`, `farm_id`, `product_name`, `harvest_date`, `quantity`, `status`, `created_at`, `updated_at`) VALUES
(16, 44, 6, 'maharage', '2023-02-03 00:00:00', 4, 'sold', '2023-06-23 06:29:12', '2023-06-23 06:29:55'),
(17, 45, 6, 'mahindi', '2023-02-02 00:00:00', 1, 'sold', '2023-06-23 06:30:55', '2023-06-23 06:31:15'),
(18, 46, 6, 'rice', '2023-02-02 00:00:00', 2, 'sold', '2023-06-23 06:32:12', '2023-06-23 06:32:32'),
(20, 49, 3, 'rice', '2023-03-06 00:00:00', 4, 'processed', '2023-06-23 14:49:40', '2023-06-23 14:49:40');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `fname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `role` smallint(6) NOT NULL DEFAULT 0,
  `isactive` smallint(6) NOT NULL DEFAULT 1,
  `sex` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `physical_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` bigint(20) NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `fname`, `lname`, `role`, `isactive`, `sex`, `physical_address`, `phone_number`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'solomon', 'mwalupani', 1, 1, 'male', 'p.o box 1, mzumbe', 789026656, 'mwalupani@gmail.com', NULL, '$2y$10$VYvr1hE5rY/XUMeWS.ghhOiLBMj11WRQiheV/Tm0wdxoXoFraGUqK', NULL, '2023-06-08 17:46:43', '2023-06-08 17:46:43'),
(2, 'jenina', 'solomon', 0, 1, 'female', 'p.o box 2, mbeya', 620174213, 'jenina@gmail.com', NULL, '$2y$10$Sr9EC6y7mYucK3YyZhIGyOyHh2cVNfoiWjj.S7Ygzwx6r.kpm67ya', 'GpXls4h6minExbVYPrlx1AkOg7PPDnzZxMrLT4cjS4ivkaLi6dteVXcVjVya', '2023-06-08 17:47:52', '2023-06-23 12:09:24'),
(3, 'rapha', 'rapha', 0, 1, 'male', 'mor', 789026658, 'raphael@gmail.com', NULL, '$2y$10$oCE7yLYq5NkJDfqAx.vpbemM7YloJbGVBll0nn9Lr1ztmm0i6yJLa', NULL, '2023-06-16 07:12:13', '2023-06-16 07:12:13'),
(6, 'Solomon', 'Mwalupani', 0, 0, 'male', 'Ilomba', 789026656, 'mwalupani124@gmail.com', NULL, '$2y$10$eej1awXWZTO5IzRdAAtk4.kP0Sqdd0K1VoHMVfDAD8UCZdm7aFqKC', NULL, '2023-06-23 11:54:49', '2023-06-26 01:30:32'),
(8, 'solo', 'solo', 0, 1, 'male', 'p.o box 1, mzumbe', 767676767, 'solo@gmail.com', NULL, '$2y$10$VFJzV86O2u7AQDI2YpPPl.xeLo6Ad09YCmT4CEOmpxT5IzIoT4LSq', NULL, '2023-06-26 02:40:57', '2023-06-26 02:40:57');

-- --------------------------------------------------------

--
-- Table structure for table `workers`
--

CREATE TABLE `workers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `fname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `mname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `sex` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `physical_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `workers`
--

INSERT INTO `workers` (`id`, `user_id`, `fname`, `mname`, `lname`, `sex`, `physical_address`, `phone_number`, `created_at`, `updated_at`) VALUES
(1, 2, 'solomon', 'petro', 'mwalupani', 'male', 'p.o box 2, tanga', 789898989, '2023-06-08 18:27:06', '2023-06-08 19:01:22'),
(2, 2, 'frolian', 'silvano', 'ernest', 'male', 'p.o box 3, iringa', 623232323, '2023-06-08 18:29:03', '2023-06-08 18:29:03'),
(3, 2, 'janeth', 'solomon', 'mwalupani', 'female', 'p.o box 1, njombe', 789988998, '2023-06-08 18:29:54', '2023-06-08 18:29:54'),
(6, 2, 'james', 'james', 'james', 'male', 'iringa', 789878989, '2023-06-23 12:43:09', '2023-06-23 12:43:09'),
(14, 8, 'solo', 'solo', 'isolo', 'male', 'moro', 789898988, '2023-06-26 03:17:37', '2023-06-26 03:17:37');

-- --------------------------------------------------------

--
-- Table structure for table `worker_referees`
--

CREATE TABLE `worker_referees` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `worker_id` bigint(20) UNSIGNED NOT NULL,
  `fname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone_number` bigint(20) NOT NULL,
  `physical_address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `worker_referees`
--

INSERT INTO `worker_referees` (`id`, `worker_id`, `fname`, `lname`, `phone_number`, `physical_address`, `created_at`, `updated_at`) VALUES
(1, 1, 'frenk', 'philimon', 789024434, 'tanga', '2023-06-08 19:17:09', '2023-06-08 19:17:51'),
(2, 1, 'james', 'yona', 765554545, 'moro', '2023-06-08 19:18:27', '2023-06-08 19:18:27'),
(5, 6, 'james', 'solomon', 789876543, 'changalawe', '2023-06-23 14:02:45', '2023-06-23 14:02:45');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `crops`
--
ALTER TABLE `crops`
  ADD PRIMARY KEY (`id`),
  ADD KEY `crops_farm_id_foreign` (`farm_id`);

--
-- Indexes for table `equipment`
--
ALTER TABLE `equipment`
  ADD PRIMARY KEY (`id`),
  ADD KEY `equipment_user_id_foreign` (`user_id`),
  ADD KEY `equipment_input_id_foreign` (`input_id`);

--
-- Indexes for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indexes for table `farmers`
--
ALTER TABLE `farmers`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `farms`
--
ALTER TABLE `farms`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `farms_land_title_unique` (`land_title`),
  ADD KEY `farms_user_id_foreign` (`user_id`);

--
-- Indexes for table `farm_assigments`
--
ALTER TABLE `farm_assigments`
  ADD PRIMARY KEY (`id`),
  ADD KEY `farm_assigments_worker_id_foreign` (`worker_id`),
  ADD KEY `farm_assigments_farm_id_foreign` (`farm_id`);

--
-- Indexes for table `inputs`
--
ALTER TABLE `inputs`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `owner_inputs`
--
ALTER TABLE `owner_inputs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `owner_inputs_farm_id_foreign` (`farm_id`),
  ADD KEY `owner_inputs_input_id_foreign` (`input_id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD PRIMARY KEY (`email`);

--
-- Indexes for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD KEY `products_crop_id_foreign` (`crop_id`),
  ADD KEY `products_farm_id_foreign` (`farm_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `workers`
--
ALTER TABLE `workers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `workers_phone_number_unique` (`phone_number`),
  ADD KEY `workers_user_id_foreign` (`user_id`);

--
-- Indexes for table `worker_referees`
--
ALTER TABLE `worker_referees`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `worker_referees_phone_number_unique` (`phone_number`),
  ADD KEY `worker_referees_worker_id_foreign` (`worker_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `crops`
--
ALTER TABLE `crops`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `equipment`
--
ALTER TABLE `equipment`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `farmers`
--
ALTER TABLE `farmers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `farms`
--
ALTER TABLE `farms`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `farm_assigments`
--
ALTER TABLE `farm_assigments`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `inputs`
--
ALTER TABLE `inputs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `owner_inputs`
--
ALTER TABLE `owner_inputs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `workers`
--
ALTER TABLE `workers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `worker_referees`
--
ALTER TABLE `worker_referees`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `crops`
--
ALTER TABLE `crops`
  ADD CONSTRAINT `crops_farm_id_foreign` FOREIGN KEY (`farm_id`) REFERENCES `farms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `equipment`
--
ALTER TABLE `equipment`
  ADD CONSTRAINT `equipment_input_id_foreign` FOREIGN KEY (`input_id`) REFERENCES `inputs` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `equipment_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `farms`
--
ALTER TABLE `farms`
  ADD CONSTRAINT `farms_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `farm_assigments`
--
ALTER TABLE `farm_assigments`
  ADD CONSTRAINT `farm_assigments_farm_id_foreign` FOREIGN KEY (`farm_id`) REFERENCES `farms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `farm_assigments_worker_id_foreign` FOREIGN KEY (`worker_id`) REFERENCES `workers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `owner_inputs`
--
ALTER TABLE `owner_inputs`
  ADD CONSTRAINT `owner_inputs_farm_id_foreign` FOREIGN KEY (`farm_id`) REFERENCES `farms` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `owner_inputs_input_id_foreign` FOREIGN KEY (`input_id`) REFERENCES `inputs` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_crop_id_foreign` FOREIGN KEY (`crop_id`) REFERENCES `crops` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `products_farm_id_foreign` FOREIGN KEY (`farm_id`) REFERENCES `farms` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `workers`
--
ALTER TABLE `workers`
  ADD CONSTRAINT `workers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `worker_referees`
--
ALTER TABLE `worker_referees`
  ADD CONSTRAINT `worker_referees_worker_id_foreign` FOREIGN KEY (`worker_id`) REFERENCES `workers` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
