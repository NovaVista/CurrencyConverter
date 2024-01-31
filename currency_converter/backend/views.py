# currency_converter_project/converter/views.py
from django.shortcuts import render
from django.http import JsonResponse
import requests
import json


def homepage(request):
    return render(request, 'index.html')

def convert_currency(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            amount = float(data.get('amount', ''))
            from_currency = data.get('from_currency', '')
            to_currency = data.get('to_currency', '')

            if not amount or not from_currency or not to_currency:
                return JsonResponse({'error': 'Invalid input parameters'}, status=400)

            api_url = f'https://api.exchangerate-api.com/v4/latest/{from_currency}'

            response = requests.get(api_url)
            data = response.json()

            if 'rates' not in data or to_currency not in data['rates']:
                return JsonResponse({'error': 'Invalid currency conversion'}, status=400)

            exchange_rate = data['rates'][to_currency]
            converted_amount = amount * exchange_rate

            return JsonResponse({'converted_amount': converted_amount})

        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)
        except ValueError:
            return JsonResponse({'error': 'Invalid amount'}, status=400)

    return render(request, 'converter.html')

def sos(request):
    return render(request, 'sos.html')

