package com.orbitallcorp.hack21.cards.services;

import com.orbitallcorp.hack21.cards.domains.Card;
import com.orbitallcorp.hack21.cards.exceptions.IdInvalid;
import com.orbitallcorp.hack21.cards.exceptions.NotFoundInRepository;
import com.orbitallcorp.hack21.cards.repositories.CardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CardService {

    @Autowired
    private CardRepository cardRepository;

    public Card save(Card card) {
        return cardRepository.save((card));
    }

    public List<Card> findAll() {

        List<Card> cards = new ArrayList<>();
        cardRepository.findAll().forEach(cards::add);

        return cards;
    }
    public void delete(Long id) {

        idValid(id);

        try {

            cardRepository.deleteById(id);

        } catch (EntityNotFoundException ex) {

            throw new NotFoundInRepository("Card not found to id = " + id + ".");

        }

    }

    @Transactional(readOnly = true)
    public Card findById(Long id) {

        return cardRepository.findById(id).get();
    }

    public void update(Long id, Card card) {
        card.setId(idValid(id));

        Card ncard = cardRepository.findById(id).get();
        ncard = card;

        cardRepository.save(ncard);
    }

    private Long idValid(Long id) {
        if (id <= 0) {
            throw new IdInvalid("Valor do campo id está invalido. Deve ser uma valor inteiro maior que zero.");
        }
        return id;
    }
}
