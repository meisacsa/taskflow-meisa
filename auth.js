// auth.js

function normalizarUsuario(username) {
  const limpio = username.trim().toLowerCase();
  if (limpio.includes('@')) {
    return limpio;
  }
  return limpio + '@taskflow.app';
}

async function registrarUsuario(username, password) {
  const email = normalizarUsuario(username);
  const nombreVisible = username.trim();
  
  const { data, error } = await supabaseClient.auth.signUp({
    email: email,
    password: password,
    options: {
      data: { full_name: nombreVisible, username: nombreVisible }
    }
  });
  
  if (error) {
    alert('❌ Error al registrarse: ' + error.message);
    return null;
  }
  
  alert('✅ ¡Cuenta creada correctamente! Ya puedes iniciar sesión.');
  return data;
}

async function iniciarSesion(username, password) {
  const email = normalizarUsuario(username);
  
  const { data, error } = await supabaseClient.auth.signInWithPassword({
    email: email,
    password: password
  });
  
  if (error) {
    alert('❌ Error: Usuario o contraseña incorrectos.');
    return null;
  }
  
  return data;
}

async function cerrarSesion() {
  await supabaseClient.auth.signOut();
  location.reload();
}

async function obtenerUsuarioActual() {
  const { data: { user } } = await supabaseClient.auth.getUser();
  return user;
}

async function obtenerPerfil() {
  const user = await obtenerUsuarioActual();
  if (!user) return null;
  
  const { data } = await supabaseClient
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();
  
  return data;
}

function cambiarPestana(pestana) {
  const tabLogin = document.getElementById('tab-login');
  const tabRegister = document.getElementById('tab-register');
  const formLogin = document.getElementById('form-login');
  const formRegister = document.getElementById('form-register');
  
  if (pestana === 'login') {
    tabLogin.style.borderBottom = '2px solid #667eea';
    tabLogin.style.color = '#667eea';
    tabLogin.style.fontWeight = 'bold';
    tabRegister.style.borderBottom = 'none';
    tabRegister.style.color = '#999';
    tabRegister.style.fontWeight = 'normal';
    formLogin.style.display = 'block';
    formRegister.style.display = 'none';
  } else {
    tabRegister.style.borderBottom = '2px solid #764ba2';
    tabRegister.style.color = '#764ba2';
    tabRegister.style.fontWeight = 'bold';
    tabLogin.style.borderBottom = 'none';
    tabLogin.style.color = '#999';
    tabLogin.style.fontWeight = 'normal';
    formRegister.style.display = 'block';
    formLogin.style.display = 'none';
  }
}

async function manejarLogin(event) {
  event.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
  
  const resultado = await iniciarSesion(username, password);
  if (resultado) location.reload();
}

async function manejarRegistro(event) {
  event.preventDefault();
  const username = document.getElementById('register-username').value;
  const password = document.getElementById('register-password').value;
  const confirmPassword = document.getElementById('register-confirm-password').value;
  
  if (password !== confirmPassword) {
    alert('❌ Las contraseñas no coinciden');
    return;
  }
  if (username.includes('@') || username.includes(' ')) {
    alert('❌ El usuario no puede tener espacios ni el símbolo @');
    return;
  }
  
  await registrarUsuario(username, password);
}

async function verificarAutenticacion() {
  const user = await obtenerUsuarioActual();
  const loginScreen = document.getElementById('login-screen');
  const appContainer = document.getElementById('app-container');
  
  if (!user) {
    loginScreen.style.display = 'flex';
    appContainer.style.display = 'none';
  } else {
    loginScreen.style.display = 'none';
    appContainer.style.display = 'block';
    
    const perfil = await obtenerPerfil();
    if (perfil) {
      const nombreElements = document.querySelectorAll('.user-name');
      nombreElements.forEach(el => el.textContent = perfil.full_name || 'Usuario');
      
      const emailElements = document.querySelectorAll('.user-email');
      emailElements.forEach(el => el.textContent = perfil.full_name || user.email);
    }
  }
}

document.addEventListener('DOMContentLoaded', verificarAutenticacion);