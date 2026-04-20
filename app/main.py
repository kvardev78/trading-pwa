import flet as ft
import pandas as pd
import requests

# Основна логика на приложението
def main(page: ft.Page):
    page.title = "Trading Terminal - ETH Futures"
    page.theme_mode = ft.ThemeMode.DARK
    page.padding = 10
    page.spacing = 20
    
    # Адаптация за мобилен екран
    page.window_width = 400
    page.window_height = 800

    # Заглавие
    header = ft.Text("ETH/USDT - 5x Leverage", size=24, weight=ft.FontWeight.BOLD, color="blue")

    # Секция за цена (Примерна интеграция)
    price_text = ft.Text("Зареждане на цена...", size=30, color="green")

    def get_eth_price():
        try:
            # Публично API на Binance за актуална цена
            res = requests.get("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT")
            data = res.json()
            return f"{float(data['price']):.2f} USDT"
        except:
            return "Грешка при връзка"

    def refresh_price(e):
        price_text.value = get_eth_price()
        page.update()

    # Бутон за опресняване
    refresh_btn = ft.ElevatedButton("Опресни цена", on_click=refresh_price)

    # Контейнер за технически показатели (Placeholder за TradingView инструментите)
    indicators = ft.Column([
        ft.Text("Технически анализ:", size=18, weight="bold"),
        ft.Row([ft.Text("EMA Ribbon:"), ft.Text("Neutral", color="orange")]),
        ft.Row([ft.Text("RSI (14):"), ft.Text("55.4", color="green")]),
        ft.Row([ft.Text("CVD:"), ft.Text("Increasing", color="green")]),
    ])

    # Добавяне на елементите в страницата
    page.add(
        header,
        ft.Divider(),
        ft.Column([
            ft.Text("Текуща цена на ETH:"),
            price_text,
            refresh_btn
        ], horizontal_alignment=ft.CrossAxisAlignment.CENTER),
        ft.Divider(),
        indicators,
        ft.Container(
            content=ft.Text("TradingView Analysis (OI, SMC, ML) - Active", size=12),
            padding=10,
            bgcolor=ft.colors.SURFACE_VARIANT,
            border_radius=10
        )
    )

    # Първоначално зареждане на цената
    price_text.value = get_eth_price()
    page.update()

# ВАЖНО: За Vercel премахваме директното стартиране тук.
# Приложението се стартира от api/index.py.
# Ако искаш да тестваш локално, ползвай: flet run app/main.py
if __name__ == "__main__":
    ft.app(target=main)