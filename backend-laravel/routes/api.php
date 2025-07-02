<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/profile', function () {
    return response()->json([
        'name' => 'Kukanenthiran Purusothman',
        'title' => 'Laravel Developer',
        'bio' => 'I am a passionate and driven IT professional currently pursuing my Higher National Diploma in Information Technology at SLIATE Jaffna. As a Software Engineer Intern at Bohar Solutions, I am gaining hands-on experience in software development, refining my technical skills, and contributing to innovative projects. 

With a strong foundation in Laravel and other modern technologies, I thrive in collaborative environments that challenge me to learn and grow. My academic journey and professional experiences have shaped my problem-solving mindset and adaptability, preparing me to make meaningful contributions to the tech industry.',
        'projects' => [
            [
                'title' => 'Portfolio Website',
                'description' => 'A personal portfolio site built with Laravel and React.'
            ],
            [
                'title' => 'E-commerce Platform',
                'description' => 'A complete shopping site using Laravel API and React frontend.'
            ]
        ]
    ]);
});
