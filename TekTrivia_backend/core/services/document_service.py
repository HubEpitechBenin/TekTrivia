import requests
import json
import PyPDF2
import json
import re

from rest_framework.request import Request


class DocumentService:
    """
    A service that handles all tasks related to the acquisition of documents from the request body
    """

    def receive_document(self, body, files):
        if body is None:
            raise ValueError("Invalid request")
        if 'document_text' in body:
            return self.received_text_from_request(body['document_text'])
        if files:
            if 'document_file' in files:
                return self.received_file_from_request(files['document_file'])
        if 'document_url' in body:
            return self.received_url_from_request(body['document_url'])


        raise ValueError("Invalid request. No option matches the expected document formats.")

    @staticmethod
    def received_text_from_request(text:str):
        """"
        Receive text directly from the request. No work required
        """
        if text is None:
            raise ValueError("Invalid request. No document text provided.")
        return text

    def received_file_from_request(self, file):
        """
        Receive a file from request. Must convert it into a string depending on its type

        :param file:

        :return str
        """

        pass

    def received_url_from_request(self, url):
        """
        Receive an url from request. Must acquire text from it.
        :param url:
        :return: str
        """
        pass


