package com.orbitallcorp.hack21.cards.exceptions;

public class NotFoundInRepository extends RuntimeException{
        public NotFoundInRepository(String message) {
            super(message);
        }
}
