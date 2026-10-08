package org.krishisathi.diagnosisservice.exception;

public class DiagnosisNotFoundException
        extends RuntimeException {

    public DiagnosisNotFoundException(String message) {

        super(message);
    }
}