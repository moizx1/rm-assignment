package com.redmath.assignment.utility;

import java.security.SecureRandom;
import java.util.Random;

public class AccountNumberUtil {
    private static final String CHARACTERS = "0123456789";
    private static final int LENGTH = 10;
    private static final Random RANDOM = new SecureRandom();

    public static String generateRandomAccount() {
        StringBuilder password = new StringBuilder(LENGTH);
        for (int i = 0; i < LENGTH; i++) {
            password.append(CHARACTERS.charAt(RANDOM.nextInt(CHARACTERS.length())));
        }
        return password.toString();
    }

}

