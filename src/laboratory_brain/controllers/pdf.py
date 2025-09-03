from fpdf import FPDF
from laboratory_brain.controllers.search import Search_API
import webview
import os


class NotaPDF(FPDF):
    def header(self):

        self.set_font("Arial", "B", 12)
        self.cell(0, 10, "COLLAB LABORATORIO DE PROTESE DENTARIA", ln=True, align="C")
        self.set_font("Arial", "", 10)
        self.cell(0, 6, "ENDEREÇO: RUA BAHIA, 2040 - IPIRANGA", ln=True, align="C")
        self.cell(0, 6, "FONE: (16) 98108-4400 / (16) 99238-5416", ln=True, align="C")
        self.ln(10)

    def footer(self):
        self.set_y(-15)
        self.set_font("Arial", "I", 8)
        self.cell(0, 10, "Página %s" % self.page_no(), align="C")


class Pdf_API():
    def make_note(self, noteData):
        folder = webview.windows[0].create_file_dialog(
            webview.FOLDER_DIALOG
        )
        if folder:
            file_path = os.path.join(folder[0], f"nota_{noteData['id']}_{noteData['client_name']}_{noteData['date']}.pdf")
            


        pdf = NotaPDF()
        pdf.set_auto_page_break(auto=True, margin=15)
        pdf.add_page()

        # Título
        pdf.set_font("Arial", "B", 14)
        pdf.cell(0, 10, f"NOTA DE COBRANÇA Nº {noteData['id']}", ln=True, align="C")
        pdf.ln(5)

        # Cliente
        pdf.set_font("Arial", "B", 12)
        pdf.cell(0, 8, f"CLIENTE: {noteData['client_name']}", ln=True)
        pdf.ln(5)

        # Cabeçalho da tabela
        pdf.cell(35, 8, "Paciente", 1)
        pdf.cell(35, 8, "Dentista", 1)
        pdf.cell(45, 8, "Descrição do Trabalho", 1)
        pdf.cell(15, 8, "Qtd", 1, align="C")
        pdf.cell(15, 8, "Dente", 1, align="C")
        pdf.cell(25, 8, "Vlr Unit.", 1)
        pdf.cell(25, 8, "Total", 1, ln=True)


        # Conteúdo da tabela
        pdf.set_font("Arial", "", 10)
        total = 0
        works = Search_API().search_work_in_notes(noteData['id'])
        for w in works:
            pdf.cell(35, 8, w['pacient'], 1)
            pdf.cell(35, 8, w['dentist'], 1)
            pdf.cell(45, 8, w['work_description'], 1)
            pdf.cell(15, 8, str(w['quantity']), 1, align="C")
            pdf.cell(15, 8, str(w['tooth']), 1, align="C")
            pdf.cell(25, 8, f"R$ {w['unit_price']:.2f}", 1, align="R")
            pdf.cell(25, 8, f"R$ {w['total_price']:.2f}", 1, ln=True, align="R")

            total += w['total_price']

        pdf.ln(5)
        pdf.set_font("Arial", "B", 12)
        pdf.cell(0, 10, f"TOTAL: R$ {total:.2f}", ln=True, align="R")

        # PIX / Dados pagamento
        pdf.set_font("Arial", "", 10)
        pdf.cell(0, 8, "PIX CNPJ: 59800663000133", ln=True, align="C")
        pdf.cell(0, 8, "COLLAB LABORATORIO DE PROTESE LTDA - MERCADO PAGO", ln=True, align="C")

        # Salvar no local escolhido
        pdf.output(file_path, "F")


        return f"Nota salva em: {file_path}"
