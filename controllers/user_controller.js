const User = require('../models/User');
const { generateToken } = require('../src/auth');

// Kullanıcı kaydı
exports.register = async (req, res) => {
    const { name, email, role, password } = req.body;
    try {
        const user = new User({ name, email, role, password });
        await user.save();
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user),
        });
    } catch (error) {
        res.status(400).json({ message: 'Kayıt işlemi başarısız', error });
    }
};

// Kullanıcı girişi
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user),
            });
        } else {
            res.status(401).json({ message: 'Geçersiz e-posta veya şifre' });
        }
    } catch (error) {
        res.status(400).json({ message: 'Giriş işlemi başarısız', error });
    }
};

// Kullanıcıyı güncelleme
exports.update = async (req, res) => {
    const { name, email, password } = req.body;
    const { userId } = req.params;  // userId parametre olarak alınacak

    try {
        // Kullanıcının rolünü kontrol et
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Bu işlemi yapma yetkiniz yok' });
        }
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        // Kullanıcı bilgilerini güncelle
        if (name) user.name = name;
        if (email) user.email = email;
        if (password) user.password = await user.hashPassword(password); // Şifreyi yeniden hashle

        await user.save(); // Güncellenmiş kullanıcıyı kaydet
        res.status(200).json({
            message: "Güncelleme başarılı",
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user),
        });
    } catch (error) {
        res.status(400).json({ message: 'Kullanıcı güncellenemedi', error });
    }
};

// Kullanıcıyı silme
exports.delete_user = async (req, res) => {
    const { userId } = req.params;  // userId parametre olarak alınacak

    try {
        // Kullanıcının rolünü kontrol et
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Bu işlemi yapma yetkiniz yok' });
        }
        // Kullanıcıyı userId ile bul ve sil
        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
        }

        // Başarılı yanıt
        res.status(200).json({ message: 'Kullanıcı başarıyla silindi' });
    } catch (error) {
        // Hata durumunda yanıt
        res.status(400).json({ message: 'Kullanıcı silinemedi', error });
    }
};

// Kullanıcıları listeleme
exports.get_list = async (req, res) => {
    try {
        // Kullanıcının rolünü kontrol et
        if (req.user.role !== 'admin') {
            return res.status(403).json({ message: 'Bu işlemi yapma yetkiniz yok' });
        }
        const users = await User.find(); // Tüm kullanıcıları getir
        res.status(200).json(users); // Kullanıcıları başarıyla döndür
    } catch (error) {
        res.status(400).json({ message: 'Kullanıcılar listelenemedi', error });
    }
}; 