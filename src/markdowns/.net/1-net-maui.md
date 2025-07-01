# Part 13: .NET MAUI - Cross-Platform com C\#

---

## 1. O que é .NET MAUI e como se diferencia do Xamarin?

**Resposta clara:**
.NET MAUI é o sucessor do Xamarin.Forms. Ele permite criar apps nativos para Android, iOS, macOS e Windows com um único codebase em C# e XAML.

**Principais diferenças:**

* Estrutura unificada (um projeto apenas).
* Baseado no .NET 6+.
* Melhor integração com Blazor e MVU (Model-View-Update).

---

## 2. Quais são os principais componentes visuais em MAUI?

**Resposta clara:**

* `ContentPage`, `StackLayout`, `Grid`, `CollectionView` para layout.
* `Label`, `Entry`, `Button`, `Image`, `Switch`, etc. para UI.
* `Shell`: navegação hierárquica e rotas.
* `Handlers`: nova forma de renderizar controles substituindo os antigos "Renderers" do Xamarin.

---

## 3. Como funciona o ciclo de vida de um app MAUI?

**Resposta clara:**

1. `MauiProgram.cs` configura DI, fonts, handlers.
2. `App.xaml` inicializa a navegação.
3. `OnStart`, `OnSleep`, `OnResume` (Android/iOS) ou `AppLifecycle` (Windows/macOS).

**Importante:** a inicialização pode variar conforme a plataforma.

---

## 4. O que é o Shell no MAUI e quando usá-lo?

**Resposta clara:**
Shell simplifica navegação, deep linking e estrutura da UI:

```xml
<Shell>
  <TabBar>
    <ShellContent Title="Home" ContentTemplate="..." />
  </TabBar>
</Shell>
```

Evita a necessidade de criar um NavigationStack manual. Ideal para apps com estrutura clara e níveis hierárquicos.

---

## 5. Como lidar com dependência de plataforma no MAUI?

**Resposta clara:**
Use **partial classes**, **interfaces + DI** ou a diretiva `#if ANDROID`, `#if IOS`.

**Exemplo:**

```csharp
#if ANDROID
// Código específico Android
#endif
```

Para injeção de dependência específica, use `MauiProgram.cs`:

```csharp
builder.Services.AddSingleton<IMyService, MyServiceAndroid>();
```

---

## 6. Como usar MVVM no .NET MAUI?

**Resposta clara:**

* **Model**: representa os dados.
* **View**: a UI em XAML.
* **ViewModel**: lógica e binding (implementa `INotifyPropertyChanged`).

Use `BindingContext` e `Command` para ligar View ao ViewModel:

```xaml
<Button Text="Salvar" Command="{Binding SalvarCommand}" />
```

---

## 7. Como usar Blazor com MAUI?

**Resposta clara:**
.NET MAUI permite usar Blazor no mobile via `BlazorWebView`, renderizando componentes Razor dentro do app:

```csharp
builder.Services.AddMauiBlazorWebView();
```

Ideal para reaproveitar código web em apps nativos.

---

## 8. Como acessar recursos nativos como GPS, Câmera, Notificações?

**Resposta clara:**
Use a biblioteca `Microsoft.Maui.Essentials`, que unifica APIs comuns:

```csharp
var location = await Geolocation.GetLastKnownLocationAsync();
```

Outras APIs: `Camera`, `Flashlight`, `Preferences`, `SecureStorage`...

---

## 9. Como fazer deploy e debugging multiplataforma?

**Resposta clara:**

* Android: emulador Android Studio ou dispositivo físico.
* iOS: requer Mac com Xcode.
* Windows: app nativo com WinUI.
* macOS: via Catalyst.

**Debug remoto**: suporte integrado no Visual Studio.

---

## 10. Como otimizar performance e evitar problemas comuns no MAUI?

**Boas práticas:**

* Use `Compiled Bindings` (`x:Bind`) quando possível.
* Evite layouts aninhados demais (substituir `Stack` por `Grid` quando possível).
* Use `OnAppearing`/`OnDisappearing` para carregar dados dinamicamente.
* Prefira imagens otimizadas por resolução de dispositivo.
