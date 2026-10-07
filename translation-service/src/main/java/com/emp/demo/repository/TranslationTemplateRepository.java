package com.emp.demo.repository;

import com.emp.demo.entity.TranslationTemplate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TranslationTemplateRepository extends JpaRepository<TranslationTemplate, Long> {

    Optional<TranslationTemplate> findByTemplateKeyAndLanguageCode(String templateKey, String languageCode);

    List<TranslationTemplate> findByTemplateKey(String templateKey);

    @Query("SELECT DISTINCT t.languageCode FROM TranslationTemplate t")
    List<String> findSupportedLanguages();
}