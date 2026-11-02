use std::{fs, io, thread::sleep, time};
use clearscreen;
use serde::{Deserialize, Serialize};
use rand;
//membuat home page, clear terminal, fitur 1, 2, 3, login, constructure cekW

enum BankPage {
    Verification,
    Activity
}

#[derive(Serialize, Deserialize, Debug, Clone)]
struct BankAccount {
    number: String,
    customer_name: String,
    balance: u64,
    pin: String
}

impl BankAccount {
    fn new(name: String, money: u64, key: String, nomor: String) -> Result<Self, String> {
        if key.len() != 6 || !key.chars().all(|c| c.is_ascii_digit()) {
            return Err("Gagal membuat akun!!".to_string());
        }

        Ok(BankAccount { number: nomor, customer_name: name, balance: money, pin: key })
    }

    fn show_balance(&self) {
        println!("========================================");
        println!("        RUST BANK - SHOW BALANCE        ");
        println!("========================================");
        println!("Pemilik Rekening : {}", self.customer_name);
        println!("Saldo Sah Ini : Rp {}", self.balance);
        println!("========================================");
        print!("Tekan Enter untuk kembali ke menu...");
        let mut enter: String = String::new();
        io::Write::flush(&mut io::stdout()).unwrap();
        io::stdin().read_line(&mut enter).expect("Tekan enter doang loh");
        clear_terminal();
        return;
    }

    fn deposit(&mut self, money: u64) {
        self.balance += money;
        println!("\n✅ Berhasil menyetor Rp {}", money);
        println!("Saldo terbaru Anda: Rp {}\n", self.balance);
        return;
    }
    
    fn withdraw(&mut self, money: u64) {
        self.balance -= money;
        println!("\n✅ Berhasil menarik Rp {}", money);
        println!("Sisa saldo Anda: Rp {}\n", self.balance);
        return;
    }
}

fn main() {
    let mut pages: BankPage = BankPage::Verification;
    let mut account: BankAccount = BankAccount {
        number: "".to_string(),
        customer_name: "".to_string(),
        balance: 0,
        pin: "".to_string(),
    };

    loop {
        
        match pages {
            BankPage::Verification => {
                let choice: Result<u16, String> = account_verification();
                let real_choice: u16 = match choice {
                    Ok(value) => value,
                    Err(e) => {
                        println!("\nError : {e}");
                        std::thread::sleep(std::time::Duration::from_secs(1));
                        continue;
                    }
                };
                
                match real_choice {
                    1 => {
                        let result: Option<BankAccount> = login();
                        println!("----------------------------------------");
                        println!("\nMemproses...");
                        sleep(time::Duration::from_secs(1));
                        match result {
                            Some(value) => {
                                pages = BankPage::Activity;
                                account = value;
                                println!("[✔ ] Autentikasi Berhasil! Memuat data akun...");
                                sleep(time::Duration::from_secs(2));
                                continue;
                            }
                            None => {
                                println!("[✖ ] Error: Nomor rekening atau PIN salah! Silakan coba lagi.");
                                sleep(time::Duration::from_secs(2));
                            }
                        }
                    }
                    2 => {
                        register();
                    }
                    3 => {
                        clear_terminal();
                        println!("Terima kasih telah memakai layanan kami!!");
                        std::thread::sleep(std::time::Duration::from_secs(1));
                        break;
                    }
                    _ => {}
                }
            }
            BankPage::Activity => {
                let choice:Result<u16, String> = home_page();
                let real_choice = match choice {
                    Ok(value) => value,
                    Err(err_msg) => {
                        println!("\nError : {err_msg}");
                        std::thread::sleep(std::time::Duration::from_secs(1));
                        continue;
                    }
                };
                
                match real_choice {
                    1 => {
                        clear_terminal();
                        account.show_balance();
                    }
                    2 => {
                        add_balance(&mut account);
                    }
                    3 => {
                        take_money(&mut  account);
                    }
                    4 => {
                        clear_terminal();
                        println!("Terima kasih telah memakai layanan kami!!");
                        std::thread::sleep(std::time::Duration::from_secs(1));
                        break;
                    }
                    _ => {
                        println!("\nError : pilih menu dari 1 - 4");
                        std::thread::sleep(std::time::Duration::from_secs(1));
                        clear_terminal();
                        continue;
                    }
                }
            }
        }
    }

}

fn clear_terminal() {
    clearscreen::clear().expect("Gagal clear");
}

fn home_page() -> Result<u16, String>{
    clear_terminal();
    println!("========================================");
    println!("        RUST BANK SYSTEM CLI APP        ");
    println!("========================================");
    println!("1. Cek Saldo");
    println!("2. Setor Tunai (Deposit)");
    println!("3. Tarik Tunai (Withdraw)");
    println!("4. Keluar");
    println!("--------------------------------------");
    print!("Silahkan pilih menu (1-4): ");
    
    let mut choice: String = String::new();
    io::Write::flush(&mut io::stdout()).unwrap();
    io::stdin().read_line(&mut choice).expect("Error Input");
    
    let convert: Result<u16, _> = choice.trim().parse();
    let mut real_choice: u16 = 0;
    match convert {
        Ok(value) => {
            real_choice += value;
        }
        Err(_) => {
            return Err("Gagal Memparse data".to_string());
        }
    }
    
    Ok(real_choice)
    
}

fn account_verification() -> Result<u16, String> {
    clear_terminal();
    println!("========================================");
    println!("         RUST SECURE BANK - ATM         ");
    println!("========================================");
    println!("Selamat datang di layanan perbankan digital\nterenkripsi berbasis terminal.");
    println!("----------------------------------------");
    println!("[1]. Masuk ke Akun (Login)");
    println!("[2]. Buka Rekening Baru (Register)");
    println!("[3]. Keluar Aplikasi");
    println!("========================================");
    print!("Silahkan pilih menu (1-3): ");

    let mut choice: String = String::new();
    io::Write::flush(&mut io::stdout()).unwrap();
    io::stdin().read_line(&mut choice).expect("Error Input");
    
    let convert: Result<u16, _> = choice.trim().parse();
    let mut real_choice: u16 = 0;
    match convert {
        Ok(value) => {
            real_choice += value;
        }
        Err(_) => {
            return Err("Gagal Memparse data".to_string());
        }
    }
    
    Ok(real_choice)
}

// function page

fn add_balance(akun: &mut BankAccount) {
    let mut uang: u64 = 0;
    loop {
        clear_terminal();
        let mut money_string: String = String::new();
        println!("========================================");
        println!("        RUST BANK SYSTEM CLI APP        ");
        println!("========================================");
        print!("Masukkan jumlah setoran (Rp): ");
        
        io::Write::flush(&mut io::stdout()).unwrap();
        io::stdin().read_line(&mut money_string).expect("Gagal membaca input");

        let parse_money: Result<u64, _> = money_string.trim().parse();
        let mut money: u64 = 0;
        match parse_money {
            Ok(value) => {
                money += value;
            }
            Err(_) => {
                println!("\nTolong masukkan jumlah uang!!");
                sleep(time::Duration::from_secs(1));
                continue;
            }
        }
        
        if money <= 0 {
            println!("\nJumlah uang tidak valid : {money}");
            sleep(time::Duration::from_secs(1));
            continue;
        }
        uang += money;
        fs::write("data.txt", format!("{uang}")).expect("Gagal nyimpen data uang");
        break;
    }
    
    akun.deposit(uang);
    print!("Tekan Enter untuk kembali ke menu...");
    let mut back: String = String::new();
    
    io::Write::flush(&mut io::stdout()).unwrap();
    io::stdin().read_line(&mut back).expect("wrong input");
    clear_terminal();
    return;
}

fn take_money(akun: &mut BankAccount) {
    let mut uang: u64 = 0;
    loop {
        clear_terminal();
        let mut money_string: String = String::new();
        println!("========================================");
        println!("        RUST BANK SYSTEM CLI APP        ");
        println!("========================================");
        print!("Masukkan jumlah setoran (Rp): ");
        
        io::Write::flush(&mut io::stdout()).unwrap();
        io::stdin().read_line(&mut money_string).expect("Gagal membaca input");
        
        let parse_money: Result<u64, _> = money_string.trim().parse();
        let mut money: u64 = 0;
        match parse_money {
            Ok(value) => {
                money += value;
            }
            Err(_) => {
                println!("\nTolong masukkan jumlah uang!!");
                sleep(time::Duration::from_secs(1));
                continue;
            }
        }

        if money > akun.balance {
            println!("Saldo anda tidak mencukupi!!");
            sleep(time::Duration::from_secs(1));
            continue;
        }
        
        uang += money;
        break;
    }
    
    akun.withdraw(uang);
    print!("Tekan Enter untuk kembali ke menu...");
    let mut back: String = String::new();
    
    io::Write::flush(&mut io::stdout()).unwrap();
    io::stdin().read_line(&mut back).expect("wrong input");
    clear_terminal();
    return;
}

// register function

fn login() -> Option<BankAccount> {
    clear_terminal();
    println!("========================================");
    println!("           FORM LOGIN NASABAH           ");
    println!("========================================");
    print!("Masukkan Nomor Rekening : ");
    
    let mut rekening_string: String = String::new();
    io::Write::flush(&mut io::stdout()).unwrap();
    io::stdin().read_line(&mut rekening_string).expect("Gagal baca input");
    let nomor_rekening = rekening_string.trim();
    
    print!("Masukkan PIN 6 Digit : ");
    let mut string_pin: String = String::new();
    io::Write::flush(&mut io::stdout()).unwrap();
    io::stdin().read_line(&mut string_pin).expect("gagal baca pin");
    let pin = string_pin.trim();
    
    let json_string = match fs::read_to_string("data.json") {
        Ok(value) => value,
        Err(_) => {
            String::from("[]")
        }
    };
    let data_account: Vec<BankAccount> = serde_json::from_str(&json_string).unwrap();
    for akun in data_account {
        if akun.number == nomor_rekening && akun.pin == pin {
            return Some(akun);
        }
    }
    
    None
}

fn register() {
    clear_terminal();
    println!("========================================");
    println!("        PEMBUKAAN REKENING BARU         ");
    println!("========================================");
    println!("Silakan lengkapi data diri Anda untuk\nmembuat akun bank baru secara instan.");
    println!("----------------------------------------");
    print!("Masukkan Nama Lengkap pemilik : ");
    
    let mut _string_name: String = String::new();
    io::Write::flush(&mut io::stdout()).unwrap();
    io::stdin().read_line(&mut _string_name).expect("gagal baca input");
    let nama = _string_name.trim().to_string();
    
    print!("Setoran saldo Awal : ");
    let mut _string_money: String = String::new();
    io::Write::flush(&mut io::stdout()).unwrap();
    io::stdin().read_line(&mut _string_money).expect("gagal baca input");
    let convert_money: Result<u64, _> = _string_money.trim().parse();
    let mut _money = 0;
    match convert_money {
        Ok(value) => {
            _money += value;
        }
        Err(_) => {
            _money = 0;
        }
    }
    print!("Buat PIN Rahasia (Wajib 6 Angka) : ");
    let mut _string_pin: String = String::new();
    io::Write::flush(&mut io::stdout()).unwrap();
    io::stdin().read_line(&mut _string_pin).expect("gagal baca input");
    let pin = _string_pin.trim().to_string();

    let _random_key: String = String::from("qwertyuiopmnbvcxzalskdjfhg0897132456");
    let chars: Vec<char> = _random_key.chars().collect();
    let range = chars.len();
    let mut nomor_rekening: String = String::new();
    for i in 0..4 {
        let index = (rand::random::<u32>() as usize) % range;
        nomor_rekening.push(chars[index]);
    }

    let akun_baru: Result<BankAccount, String> = BankAccount::new(nama, _money, pin, nomor_rekening);
    let akun = match akun_baru {
        Ok(val) => val,
        Err(err_msg) => {
            println!("[✖ ] Gagal Membuat Akun: {}", err_msg);
            sleep(time::Duration::from_secs(1));
            println!("\nAnda akan dilempar kembali ke main menu");
            sleep(time::Duration::from_secs(2));
            return;
        }
    };

    let json_data = match fs::read_to_string("data.json") {
        Ok(value) => value,
        Err(_) => {
            String::from("[]")
        }
    };
    let mut get_data: Vec<BankAccount> = serde_json::from_str(&json_data).unwrap();
    get_data.push(akun.clone());

    let convert_string = serde_json::to_string_pretty(&get_data).unwrap();
    fs::write("data.json", convert_string).expect("Gagal simpan");

    println!("========================================");
    println!("[Memproses pembuatan rekening...]");
    sleep(time::Duration::from_secs(1));
    println!("[✔ ] Selamat! Akun Anda berhasil dibuat.");
    println!("\nNomor Rekening Anda : {} (Simpan kode ini untuk login!)", akun.number);
    println!("Nama Pemilik          : {}", akun.customer_name);
    println!("Saldo Awal            : Rp {}", akun.balance);
    sleep(time::Duration::from_secs(1));
    print!("Tekan Enter untuk ke main menu...");
    let mut _placeholder: String = String::new();
    io::Write::flush(&mut io::stdout()).unwrap();
    io::stdin().read_line(&mut _placeholder).expect("gagl keluar");
}