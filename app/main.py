import flet as ft
import asyncio

async def main(page: ft.Page):
    # Настройки от твоя Manifest & CSS
    page.title = "Trading App - ETH"
    page.bgcolor = "#000000"
    page.theme_mode = ft.ThemeMode.DARK
    page.padding = 0
    page.spacing = 0

    # 1. СЕКЦИЯ: CHART (TradingView)
    chart_view = ft.Container(
        content=ft.HtmlElement(
            srcdoc="""
            <div id="tv_chart" style="height:100vh;"></div>
            <script src="https://s3.tradingview.com/tv.js"></script>
            <script>
                new TradingView.widget({
                    "autosize": true, "symbol": "BYBIT:ETHUSDT.P", "interval": "15",
                    "theme": "dark", "style": "1", "locale": "bg", "container_id": "tv_chart",
                    "hide_side_toolbar": false, "allow_symbol_change": true, "details": true
                });
            </script>
            """
        ),
        expand=True,
        visible=True
    )

    # 2. СЕКЦИЯ: FLOW (Твоите Flow Boxes от Index.html)
    def create_box(label, value="Броене...", color="#ffffff"):
        return ft.Container(
            content=ft.Column([
                ft.Text(label, size=12, color="#aaaaaa"),
                ft.Text(value, size=18, color=color, weight="bold")
            ], spacing=2),
            padding=12, bgcolor="#111111", border=ft.border.all(1, "#222222"),
            border_radius=6, expand=1
        )

    flow_view = ft.Column([
        ft.Container(height=10),
        ft.Row([create_box("Обем (24h)", "2.4B"), create_box("Open Interest", "+4.2%")], spacing=10),
        ft.Row([create_box("CVD Delta", "-120M", "#ff4444"), create_box("Funding Rate", "0.01%")], spacing=10),
        ft.Row([create_box("Ликвидации", "1.2M", "#ff4444"), create_box("Market Bias", "BULLISH", "#00ff99")], spacing=10),
        ft.Container(
            content=ft.Text("Orderbook Heatmap (Placeholder)", color="#555555"),
            height=150, bgcolor="#080808", alignment=ft.alignment.center, border_radius=6
        )
    ], scroll=ft.ScrollMode.AUTO, padding=10, visible=False)

    # 3. СЕКЦИЯ: AI (Подготовка за Етап 3)
    ai_view = ft.Column([
        ft.Container(
            content=ft.Column([
                ft.Text("AI Market Scanner", size=22, weight="bold"),
                ft.Text("Анализиране на Order Blocks & FVG...", italic=True, color="gold"),
                ft.Divider(color="#333333"),
                ft.Text("• Market Structure: Bullish Break (BOS)", size=16),
                ft.Text("• Liquidity Path: Target $2,850", size=16),
                ft.Text("• Probability: 72% High", color="#00ff99", weight="bold")
            ]),
            padding=20, bgcolor="#111111", border_radius=12, margin=10
        )
    ], visible=False)

    # 4. СЕКЦИЯ: JOURNAL
    journal_view = ft.Text("Journal & Risk Management - Coming Soon", visible=False, size=20)

    # ЛОГИКА ЗА НАВИГАЦИЯ
    def navigate(e):
        idx = e.control.selected_index
        chart_view.visible = (idx == 0)
        flow_view.visible = (idx == 1)
        ai_view.visible = (idx == 2)
        journal_view.visible = (idx == 3)
        page.update()

    page.navigation_bar = ft.NavigationBar(
        destinations=[
            ft.NavigationDestination(icon=ft.icons.SHOW_CHART, label="Chart"),
            ft.NavigationDestination(icon=ft.icons.ANALYTICS, label="Flow"),
            ft.NavigationDestination(icon=ft.icons.AUTO_AWESOME, label="AI"),
            ft.NavigationDestination(icon=ft.icons.MENU_BOOK, label="Journal"),
        ],
        bgcolor="#000000",
        on_change=navigate
    )

    page.add(chart_view, flow_view, ai_view, journal_view)

app = ft.app(target=main, export_asgi=True)