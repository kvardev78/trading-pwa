import flet as ft
import asyncio
import httpx # По-бърза алтернатива на requests за асинхронна работа

async def main(page: ft.Page):
    page.title = "Vardev ETH Flow Monitor"
    page.theme_mode = ft.ThemeMode.DARK
    page.padding = 10
    page.bgcolor = "#000000"
    
    # 1. Елементи за Flow Данните (аналог на твоите <span> в HTML)
    flow_volume = ft.Text("—", size=16, color="#00ff99", weight="bold")
    flow_oi = ft.Text("—", size=16, color="#00ff99", weight="bold")
    flow_funding = ft.Text("—", size=16, color="#00ff99", weight="bold")
    flow_cvd = ft.Text("—", size=16, color="#00ff99", weight="bold")

    # 2. Функция за взимане на данни (аналог на fetchFlow)
    async def fetch_flow_data():
        while True:
            try:
                async with httpx.AsyncClient() as client:
                    # Използвам твоя линк от Coinalyze
                    response = await client.get("https://api.coinalyze.net/v1/eth/flow")
                    if response.status_code == 200:
                        data = response.json()
                        flow_volume.value = str(data.get("volume", "—"))
                        flow_oi.value = str(data.get("oi", "—"))
                        flow_funding.value = str(data.get("funding", "—"))
                        flow_cvd.value = str(data.get("cvd", "—"))
                        page.update()
            except Exception as e:
                print(f"API Error: {e}")
            await asyncio.sleep(5) # Обновява на всеки 5 секунди

    # 3. Трейдинг Вю Графика (Интегрирана чрез WebView)
    # Забележка: В мобилното приложение това зарежда директно джаджата
    chart_widget = ft.HtmlElement(
        srcdoc="""
        <div id="tv_chart" style="height:400px;"></div>
        <script type="text/javascript" src="https://s3.tradingview.com/tv.js"></script>
        <script>
            new TradingView.widget({
                "autosize": true, "symbol": "BINANCE:ETHUSDT", "interval": "15",
                "theme": "dark", "style": "1", "locale": "bg", "container_id": "tv_chart"
            });
        </script>
        """
    )

    # 4. Изграждане на интерфейса (Layout)
    page.add(
        ft.Column([
            ft.Text("ETH/USDT REAL-TIME FLOW", size=22, weight="bold", color="white"),
            ft.Divider(color="white10"),
            
            # Секция с метрики (Card стил)
            ft.Container(
                content=ft.Row([
                    ft.Column([ft.Text("Volume"), flow_volume]),
                    ft.Column([ft.Text("Open Interest"), flow_oi]),
                    ft.Column([ft.Text("Funding"), flow_funding]),
                    ft.Column([ft.Text("CVD"), flow_cvd]),
                ], alignment=ft.MainAxisAlignment.SPACE_AROUND),
                padding=15,
                border_radius=10,
                bgcolor="#111111"
            ),
            
            ft.Text("TradingView Live Chart", size=18, weight="bold"),
            ft.Container(content=chart_widget, height=400, border_radius=10),
            
            # Долна навигация (аналог на твоите nav-buttons)
            ft.Tabs(
                selected_index=0,
                tabs=[
                    ft.Tab(text="Monitor", icon=ft.icons.SCREEN_SEARCH_DESKTOP_OUTLINED),
                    ft.Tab(text="Analysis", icon=ft.icons.ANALYTICS_OUTLINED),
                    ft.Tab(text="Settings", icon=ft.icons.SETTINGS),
                ],
            )
        ], scroll=ft.ScrollMode.ADAPTIVE)
    )

    # Стартираме фоновата задача за обновяване на данните
    asyncio.create_task(fetch_flow_data())

ft.app(target=main)