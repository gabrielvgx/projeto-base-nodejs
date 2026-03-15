<?php

namespace App\DTO;

enum UserRole: string
{
    case ADMIN = 'admin';
    case CUSTOMER = 'customer';
}
