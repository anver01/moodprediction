from rest_framework import serializers


class SnippetSerializer(serializers.Serializer):
    image = serializers.ImageField()
