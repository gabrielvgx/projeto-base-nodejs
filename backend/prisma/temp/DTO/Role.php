<?php

namespace App\DTO;

enum Role: string
{
    case CUSTOMER = 'customer';
    case ADMIN = 'admin';
    case PROFESSIONAL = 'professional';
}
