<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/profile', function () {
    return response()->json([
        'name' => 'Kukanenthiran Purusothman',
        'title' => 'Laravel Developer',
        'bio' => 'I’m a passionate IT student at SLIATE Jaffna and a Software Engineer Intern at Bohar Solutions. I specialize in Laravel and modern web technologies, gaining hands-on experience through real-world projects. I thrive in collaborative, growth-focused environments and am driven to build impactful tech solutions.',
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
