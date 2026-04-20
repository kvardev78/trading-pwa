import flet as ft
import flet.fastapi as fastapi # Важно: Трябва за Vercel
import requests

def main(page: ft.Page):
    page.title = "Trading Terminal"
    page.theme_mode = ft.ThemeMode.DARK
    page.vertical_alignment = ft.MainAxisAlignment.CENTER
    
    # Заглавие
    header = ft.Text("ETH/USDT 5x Leverage", size=25, weight="bold", color="blue")
    
    # Логика за цената
    price_text = ft.Text("Зареждане...", size=35, color="green")
    
    def get_price():
        try:
            r = requests.get("https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT")
            return f"{float(r.json()['price']):.2f} USDT"
        except:
            return "Грешка"

    def update_price(e):
        price_text.value = get_price()
        page.update()

    btn = ft.ElevatedButton("Refresh Price", on_click=update_price)
    
    page.add(
        header,
        ft.Divider(),
        price_text,
        btn,
        ft.Text("TradingView: EMA, RSI, CVD Active", size=12, color="grey")
    )
    
    price_text.value = get_price()
    page.update()

# ТОВА Е КЛЮЧЪТ ЗА VERCEL:
# Създаваме FastAPI приложение, което обвива Flet
app = fastapi.app(main)

if __name__ == "__main__":
    ft.app(target=main)