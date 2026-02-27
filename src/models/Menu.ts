// lib/db/models/Menu.ts
import mongoose from 'mongoose';

const MenuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url: { type: String, required: true },
  section: { type: String, enum: ['header', 'footer'], required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu', default: null },
  order: { type: Number, default: 0 },
  newTab: { type: Boolean, default: false },
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.models.Menu || mongoose.model('Menu', MenuSchema);